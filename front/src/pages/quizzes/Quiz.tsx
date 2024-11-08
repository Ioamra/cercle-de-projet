import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import loadingGif from '../../assets/loading.webp';
import { Quiz as QuizModel } from '../../models/quiz.model';
import { addQuizResult, getQuiz } from '../../services/quizzes/quiz.service';

function Quiz() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizModel.IQuiz | null>(null);
  const [questions, setQuestions] = useState<QuizModel.IQuizQuestion[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionResult, setQuestionResult] = useState<QuizModel.IQuestionResult[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const quizData = await getQuiz(+id!);
        if (quizData.questions && quizData.questions.length > 0) {
          setQuiz(quizData);
          setQuestions(quizData.questions);
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Vous devez être connecté pour accéder à ce quiz.');
      navigate('/login');
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-1/3" src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  if (!quiz) {
    return <div className="text-white text-2xl text-center mt-20">Quiz non trouvé.</div>;
  }

  if (!questions) {
    return <div className="text-white text-2xl text-center mt-20">Aucune question trouvée.</div>;
  }

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setQuestionResult((prevResults) => {
          const updatedResults = [
            ...prevResults,
            {
              id_question: currentQuestion.id,
              id_response: selectedAnswer,
              is_correct: currentQuestion.responses.find((r) => r.id === selectedAnswer)?.is_correct!,
            },
          ];
          return updatedResults;
        });
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
      } else {
        console.log('Quiz terminé !');
        setQuestionResult((prevResults) => {
          const updatedResults = [
            ...prevResults,
            {
              id_question: currentQuestion.id,
              id_response: selectedAnswer,
              is_correct: currentQuestion.responses.find((r) => r.id === selectedAnswer)?.is_correct!,
            },
          ];
          addQuizResult(+id, updatedResults);
          return updatedResults;
        });
        setShowModal(true);
      }
    } else {
      alert('Veuillez sélectionner une réponse avant de continuer.');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionResult(questionResult.slice(0, -1));
      setSelectedAnswer(null);
    }
  };

  const currentQuestion = questions[currentQuestionIndex] as QuizModel.IQuizQuestion;

  const correctAnswersCount = questionResult.filter((result) => result.is_correct).length;

  return (
    <div className="min-h-fit flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-3xl shadow-2xl gap-5 text-center flex flex-col justify-around">
        <div className="flex flex-col justify-around gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">{quiz.title}</h2>
          <h3 className="text-xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">{currentQuestion.content}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {currentQuestion.responses.map((answer, index) => (
            <button
              key={answer.id}
              onClick={() => setSelectedAnswer(answer.id)}
              className={`py-6 sm:py-12 px-4 sm:px-6 rounded-md text-white text-lg sm:text-2xl font-semibold shadow-lg transition transform hover:scale-105 ${
                selectedAnswer === answer.id
                  ? 'bg-main-one !text-black border-4 border-blue-600'
                  : index === 0
                    ? 'bg-red-500 hover:bg-red-300'
                    : index === 1
                      ? 'bg-blue-500 hover:bg-blue-300'
                      : index === 2
                        ? 'bg-green-500 hover:bg-green-300'
                        : 'bg-yellow-500 hover:bg-yellow-300'
              }`}
            >
              {answer.content}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-6 sm:mt-10 space-x-2 sm:space-x-4">
          <button
            onClick={prevQuestion}
            className="flex-grow w-64 bg-gray-500 text-white py-2 sm:py-3 px-4 sm:px-8 rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-600 transition"
          >
            Question précédente
          </button>
          <button
            onClick={nextQuestion}
            className="flex-grow w-64 bg-main-four text-white py-2 sm:py-3 px-4 sm:px-8 rounded-lg text-lg sm:text-xl font-semibold hover:bg-main-five transition"
          >
            Question suivante
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz terminé !</h2>
            <p className="text-lg mb-4">
              Vous avez {correctAnswersCount} bonnes réponses sur {questionResult.length}.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-main-four text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-main-five transition"
            >
              Retourner à la page quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
