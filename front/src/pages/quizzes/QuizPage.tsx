import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizById } from '../../services/quizzService';

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const quizData = getQuizById(Number(id));
      setQuiz(quizData);
    }
  }, [id]);

  if (!quiz) {
    return <div className="text-white text-2xl text-center mt-20">Chargement... ou Quiz non trouvé.</div>;
  }

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        alert('Quiz terminé !');
        navigate('/');
      }
    } else {
      alert('Veuillez sélectionner une réponse avant de continuer.');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl text-center h-auto sm:h-[90vh] flex flex-col justify-between">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">{quiz.title}</h2>

        <div className="mb-6 sm:mb-8 flex-grow flex flex-col justify-center">
          <h3 className="text-xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">{currentQuestion.content}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={answer.id}
                onClick={() => setSelectedAnswer(answer.id)}
                className={`py-6 sm:py-12 px-4 sm:px-6 rounded-xl text-white text-lg sm:text-2xl font-semibold shadow-lg transition transform hover:scale-105 ${
                  selectedAnswer === answer.id
                    ? 'bg-main-one !text-black'
                    : index === 0
                      ? 'bg-red-500 hover:bg-red-300'
                      : index === 1
                        ? 'bg-blue-500 hover:bg-blue-300'
                        : index === 2
                          ? 'bg-green-500 hover:bg-green-300'
                          : 'bg-yellow-500 hover:bg-yellow-300'
                }`}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6 sm:mt-10 space-x-2 sm:space-x-4">
          <button
            onClick={prevQuestion}
            className="flex-grow bg-gray-500 text-white py-2 sm:py-3 px-4 sm:px-8 rounded-lg text-lg sm:text-xl font-semibold hover:bg-gray-600 transition"
          >
            Question précédente
          </button>
          <button
            onClick={nextQuestion}
            className="flex-grow bg-main-four text-white py-2 sm:py-3 px-4 sm:px-8 rounded-lg text-lg sm:text-xl font-semibold hover:bg-main-five transition"
          >
            Question suivante
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
