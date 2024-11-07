import { useEffect, useState } from 'react';
import { getQuizzes } from '../../services/quizzService';

type QuizWithoutDetail = {
  id: number;
  title: string;
  description: string;
  time_in_min: number;
  difficulty: string;
  avg_note: number;
  play_count: number;
};

function Quizzes() {
  const [quizzes, setQuizzes] = useState<QuizWithoutDetail[]>([]);

  useEffect(() => {
    async function fetchQuizzes() {
      const data = await getQuizzes();
      setQuizzes(data);
    }

    fetchQuizzes();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Quiz sur l'environnement</h1>
        <p className="mt-2 text-gray-600">Relevez des défis et gagnez des points !</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full p-6">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-4">{quiz.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">🏆</span>
                  <span>Difficulté: {quiz.difficulty}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">⏰</span>
                  <span>{quiz.time_in_min} minutes</span>
                </div>
              </div>
            </div>

            {/* Espace en bas pour le bouton */}
            <div className="mt-4">
              <a
                href={`/quiz/${quiz.id}`}
                className="w-full bg-main-four text-white py-2 px-4 rounded-md hover:bg-main-five transition text-center block"
              >
                Commencer le Quizz
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizzes;
