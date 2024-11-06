import { getQuizzes } from '../../services/quizzService';

function Quizzes() {
  const quizzes = getQuizzes();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Quiz sur l'environnement</h1>
        <p className="mt-2 text-gray-600">Relevez des défis et gagnez des points !</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-4">{quiz.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">🏆</span>
                  <span>Difficulté: {quiz.difficulty}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">⏰</span>
                  <span>{quiz.timeEstimate}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">📊</span>
                  <span>{quiz.points} points</span>
                </div>
              </div>

<<<<<<< HEAD
              <button className="mt-4 w-full bg-main-four text-white py-2 px-4 rounded-md hover:bg-main-five transition">Commencer le Quizz</button>
=======
              <button className="mt-4 w-full bg-main-four text-white py-2 px-4 rounded-md hover:bg-main-five transition">Start Quiz</button>
>>>>>>> main
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizzes;
