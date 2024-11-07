function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 justify-between">
          <div className="flex flex-row items-center gap-5">
            <div className="bg-green-100 p-3 rounded-full">
              <span className="h-8 w-8 text-green-600 text-2xl">👤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-main-four text-white px-4 py-2 rounded-lg hover:bg-main-five">
            <svg className="w-5 h-5" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Ajouter un ami</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600 text-xl">🏆</span>
            <h2 className="text-xl font-semibold">Points</h2>
          </div>
          <p className="text-3xl font-bold text-green-600">{user.points}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600 text-xl">🏆</span>
            <h2 className="text-xl font-semibold">Note moyenne</h2>
          </div>
          <p className="text-3xl font-bold text-main-four">12</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600 text-xl">🎖️</span>
            <h2 className="text-xl font-semibold">Quizzes</h2>
          </div>
          <p className="text-3xl font-bold text-main-four">12</p>
          <p className="text-sm text-gray-600 mt-1">Completed</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">Completed "Climate Change Basics" quiz</p>
              <p className="text-sm text-gray-600">Score: 90/100</p>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">Finished "Waste Management" lesson</p>
              <p className="text-sm text-gray-600">Earned 50 points</p>
            </div>
            <span className="text-sm text-gray-500">5 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
