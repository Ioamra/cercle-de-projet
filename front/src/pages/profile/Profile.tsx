import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserAccount } from '../../models/userAccount.model';
import { friendRequest, getOneUserAccount } from '../../services/social/profile.service';

function Profile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserAccount.IUserAccountWithRecentActivity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getOneUserAccount(+id!);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
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
              <h1 className="text-2xl font-bold text-gray-900">{user.pseudo}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          {user.id !== currentUser.id && (
            <button
              className="flex items-center space-x-2 bg-main-four text-white px-4 py-2 rounded-lg hover:bg-main-five"
              onClick={async () => await friendRequest(+id!)}
            >
              <svg className="w-5 h-5" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Ajouter un ami</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600 text-xl">🏆</span>
            <h2 className="text-xl font-semibold">Points</h2>
          </div>
          <p className="text-3xl font-bold text-main-four">{user.total_note || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600 text-xl">🏆</span>
            <h2 className="text-xl font-semibold">Note moyenne</h2>
          </div>
          <p className="text-3xl font-bold text-main-four">{user.avg_note || '-'}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-6 w-6 text-green-600 text-xl">🎖️</span>
            <h2 className="text-xl font-semibold">Quiz</h2>
          </div>
          <p className="text-3xl font-bold text-main-four">{user.nb_quiz_make || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Complété</p>
        </div>
      </div>

      {user.recent_activity.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <div className="space-y-4">
            {user.recent_activity.map((activity) => (
              <div key={activity.id_quiz_result} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">A completé le quiz : "{activity.title}"</p>
                  <p className="text-sm text-gray-600">Score: {activity.note}/10</p>
                </div>
                <span className="text-sm text-gray-500">{activity.creation_date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
