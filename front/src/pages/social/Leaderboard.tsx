import { getLeaderboard } from '../../services/leaderboardService';

function Leaderboard() {
  const leaderboard = getLeaderboard();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Classement mondial</h1>
        <p className="mt-2 text-gray-600">Les éco-guerriers qui font la différence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboard.slice(0, 3).map((user) => (
          <div key={user.id} className={`bg-white rounded-lg shadow-md p-6 text-center ${user.rank === 1 ? 'ring-2 ring-yellow-400' : ''}`}>
            <div className="flex justify-center mb-4">
              {user.rank === 1 && <span className="h-12 w-12 text-yellow-400 text-6xl">🏆</span>}
              {user.rank === 2 && <span className="h-12 w-12 text-gray-400 text-6xl">🥈</span>}
              {user.rank === 3 && <span className="h-12 w-12 text-orange-400 text-6xl">🥉</span>}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{user.username}</h3>
<<<<<<< HEAD
            <p className="text-main-four font-bold text-2xl mt-2">{user.points}</p>
=======
            <p className="text-main-five font-bold text-2xl mt-2">{user.points}</p>
>>>>>>> main
            <p className="text-sm text-gray-600 mt-1">points</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tous les classements</h2>
          <div className="space-y-4">
            {leaderboard.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold ${
                      user.rank === 1
                        ? 'bg-yellow-100 text-yellow-600'
                        : user.rank === 2
                          ? 'bg-gray-100 text-gray-600'
                          : user.rank === 3
                            ? 'bg-orange-100 text-orange-600'
<<<<<<< HEAD
                            : 'bg-green-100 text-main-four'
=======
                            : 'bg-green-100 text-main-five'
>>>>>>> main
                    }`}
                  >
                    {user.rank}
                  </span>
                  <span className="font-medium text-gray-900">{user.username}</span>
                </div>
                <div className="text-right">
<<<<<<< HEAD
                  <p className="font-semibold text-main-four">{user.points}</p>
=======
                  <p className="font-semibold text-main-five">{user.points}</p>
>>>>>>> main
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
