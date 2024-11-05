const friends = [
  {
    id: 1,
    username: 'EcoWarrior',
    points: 1250,
    status: 'online',
    lastActive: 'Now',
  },
  {
    id: 2,
    username: 'GreenThumb',
    points: 980,
    status: 'offline',
    lastActive: '2 hours ago',
  },
  {
    id: 3,
    username: 'EarthDefender',
    points: 1500,
    status: 'online',
    lastActive: 'Now',
  },
];

function Friends() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Friends</h1>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <span className="h-5 w-5">➕</span>
          <span>Add Friend</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="space-y-6">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="h-6 w-6 text-green-600">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{friend.username}</h3>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      <span className="text-sm text-gray-600">
                        {friend.status === 'online' ? 'Online' : `Last seen ${friend.lastActive}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Points</p>
                    <p className="font-semibold text-green-600">{friend.points}</p>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-green-600">
                    <span className="h-5 w-5">💬</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;