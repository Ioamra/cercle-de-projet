import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFriends } from '../../services/friendsService';

function Friends() {
  const friends = getFriends();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<{ id: number; username: string; points: number; status: string; lastActive: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const results = friends.filter((friend) => friend.username.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm, friends]);

  const handleProfileClick = (id: number) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Amis</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="space-y-6">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="h-6 w-6 text-main-four">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{friend.username}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`h-2 w-2 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-600">{friend.status === 'online' ? 'Online' : `Dernièrement vu ${friend.lastActive}`}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Points</p>
                    <p className="font-semibold text-main-four">{friend.points}</p>
                  </div>
                  <button className="bg-main-four text-white px-4 py-2 rounded-lg" onClick={() => handleProfileClick(friend.id)}>
                    Voir le profil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Rechercher des amis..."
        className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-main-four"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-4">
        {searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <div className="space-y-6">
                {searchResults.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <span className="h-6 w-6 text-main-four">👥</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{friend.username}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`h-2 w-2 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <span className="text-sm text-gray-600">
                            {friend.status === 'online' ? 'Online' : `Dernièrement vu ${friend.lastActive}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Points</p>
                        <p className="font-semibold text-main-four">{friend.points}</p>
                      </div>
                      <button className="bg-main-four text-white px-4 py-2 rounded-lg" onClick={() => handleProfileClick(friend.id)}>
                        Voir le profil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;
