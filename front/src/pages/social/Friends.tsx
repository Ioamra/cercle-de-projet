import { useEffect, useState } from 'react';
import loadingGif from '../../assets/loading.webp';
import { UserAccount } from '../../models/userAccount.model';
import { getFriendLeaderboard } from '../../services/social/friends.service';

function Friends() {
  const [friends, setFriends] = useState<UserAccount.IUserAccount[]>();
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-1/3" src={loadingGif} alt="Loading..." />
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Amis</h1>
        <button className="flex items-center space-x-2 bg-main-four text-white px-4 py-2 rounded-lg hover:bg-main-five">
          <svg className="w-5 h-5" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Ajouter un ami</span>
        </button>
      </div>

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
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Points</p>
                    <p className="font-semibold text-main-four">{friend.total_note}</p>
                  </div>
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
