import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loadingGif from '../../assets/loading.webp';
import { getQuiz } from '../../services/quizzService';

type QuizQuestion = {
  id: number;
  content: string;
  responses: QuizResponse[];
};

type QuizResponse = {
  id: number;
  content: string;
  is_correct: boolean;
};

function Quiz() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const quizData = await getQuiz(+id!);
        console.log(quizData);
        if (quizData.questions && quizData.questions.length > 0) {
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

  const handleAnswerClick = (answerId: number) => {
    setSelectedAnswer(answerId);
    // Add logic to check the answer and move to the next question
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-1/3" src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  if (!questions) {
    return <div>Aucune question trouvée.</div>;
  }

  return (
    <div className="min-h-screen bg-purple-600 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        {questions.map((question) => (
          <div key={question.id} className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{question.content}</h2>
            <div className="grid grid-cols-2 gap-6">
              {question.responses.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerClick(answer.id)}
                  className={`py-6 px-4 rounded-lg text-white text-xl font-semibold transition duration-200 ${
                    selectedAnswer === answer.id ? 'bg-main-four' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {answer.content}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
