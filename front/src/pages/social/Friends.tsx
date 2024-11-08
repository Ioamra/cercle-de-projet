import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../../assets/loading.webp';
import { UserAccount } from '../../models/userAccount.model';
import { getFriendLeaderboard } from '../../services/social/friends.service';
import { acceptFriend, getListAskingToBeFriend, getListWantToAddMe, searchUserAccount } from '../../services/social/profile.service';

function Friends() {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<UserAccount.IUserAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [friends, setFriends] = useState<UserAccount.IUserAccount[]>();
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'friends' | 'pending' | 'requests'>('friends');

  useEffect(() => {
    async function fetchFriends() {
      try {
        const friendsData = await getFriendLeaderboard();
        setFriends(friendsData);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFriends();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    async function fetchSearchResults() {
      try {
        const results = await searchUserAccount(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching user accounts:', error);
      }
    }

    fetchSearchResults();
  }, [searchTerm]);

  const handleFriendsTab = async () => {
    setActiveTab('friends');
    try {
      const friendsData = await getFriendLeaderboard();
      setFriends(friendsData);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handlePendingTab = async () => {
    setActiveTab('pending');
    try {
      const friendsData = await getListAskingToBeFriend();
      setFriends(friendsData);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleRequestsTab = async () => {
    setActiveTab('requests');
    try {
      const friendsData = await getListWantToAddMe();
      setFriends(friendsData);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleAcceptRequest = async (id: number) => {
    try {
      await acceptFriend(id);
      const friendsData = await getListWantToAddMe();
      setFriends(friendsData);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-1/3" src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  const handleProfileClick = (id: number) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handleFriendsTab}
          className={`px-4 py-2 rounded ${activeTab === 'friends' ? 'bg-main-four text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Amis
        </button>
        <button
          onClick={handlePendingTab}
          className={`px-4 py-2 rounded ${activeTab === 'pending' ? 'bg-main-four text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Demande envoyée
        </button>
        <button
          onClick={handleRequestsTab}
          className={`px-4 py-2 rounded ${activeTab === 'requests' ? 'bg-main-four text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Demande reçue
        </button>
      </div>

      <div className="flex justify-between items-center"></div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="space-y-6">
            {friends!.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="h-6 w-6 text-main-four">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{friend.pseudo}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right flex flex-row gap-2 items-center">
                    <p className="font-semibold text-main-four">{friend.total_note || 0}</p>
                    <p className="text-sm text-gray-600">points</p>
                  </div>
                  <button className="bg-main-four text-white px-4 py-2 rounded-lg" onClick={() => handleProfileClick(friend.id)}>
                    Voir le profil
                  </button>
                  {activeTab === 'requests' && (
                    <button className="bg-main-four text-white px-4 py-2 rounded-lg" onClick={() => handleAcceptRequest(friend.id)}>
                      Accepter
                    </button>
                  )}
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
                        <h3 className="font-semibold text-gray-900">{friend.pseudo}</h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right gap-2 items-center flex flex-row ">
                        <p className="font-semibold text-main-four">{friend.total_note || 0}</p>
                        <p className="text-sm text-gray-600">points</p>
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
