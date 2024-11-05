const quizzes = [
  {
    id: 1,
    title: 'Climate Change Basics',
    description: 'Test your knowledge about climate change fundamentals',
    difficulty: 'Beginner',
    timeEstimate: '10 mins',
    points: 100,
  },
  {
    id: 2,
    title: 'Renewable Energy',
    description: 'Learn about different types of renewable energy sources',
    difficulty: 'Intermediate',
    timeEstimate: '15 mins',
    points: 150,
  },
  {
    id: 3,
    title: 'Ocean Conservation',
    description: 'Explore marine life and ocean preservation',
    difficulty: 'Advanced',
    timeEstimate: '20 mins',
    points: 200,
  },
];

function Quizzes() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Environmental Quizzes</h1>
        <p className="mt-2 text-gray-600">Challenge yourself and earn points!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-4">{quiz.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">🏆</span>
                  <span>Difficulty: {quiz.difficulty}</span>
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

              <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizzes;