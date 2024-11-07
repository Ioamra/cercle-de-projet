import { useEffect, useRef, useState } from 'react';
import loadingGif from '../../assets/loading.webp';
import { UserAccount } from '../../models/userAccount.model';
import { getLeaderboard } from '../../services/social/leaderboard.service';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserAccount.IUserAccount[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-1/3" src={loadingGif} alt="Loading..." />
      </div>
    );
  }
  const itemsPerLoad = 10;

  const [visibleUsers, setVisibleUsers] = useState(leaderboard!.slice(0, 3).map((user) => ({ ...user, isVisible: true })));
  const [lastIndex, setLastIndex] = useState(3);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && lastIndex < leaderboard!.length) {
        loadMoreUsers();
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [lastIndex, leaderboard!.length]);

  const loadMoreUsers = () => {
    const newUsers = leaderboard!.slice(lastIndex, lastIndex + itemsPerLoad).map((user) => ({
      ...user,
      isVisible: false,
    }));
    setVisibleUsers((prevUsers) => [...prevUsers, ...newUsers]);
    setLastIndex((prevIndex) => prevIndex + itemsPerLoad);

    // Rendre les nouveaux utilisateurs visibles après un court délai
    setTimeout(() => {
      setVisibleUsers((prevUsers) => prevUsers.map((user) => (user.isVisible ? user : { ...user, isVisible: true })));
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Classement mondial</h1>
        <p className="mt-2 text-gray-600">Les éco-guerriers qui font la différence</p>
      </div>

      {/* Top 3 utilisateurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {visibleUsers.slice(0, 3).map((user, index) => (
          <div key={user.id} className={`bg-white rounded-lg shadow-md p-6 text-center ${index === 0 ? 'ring-2 ring-yellow-400' : ''}`}>
            <div className="flex justify-center mb-4">
              {index === 0 && <span className="h-12 w-12 text-yellow-400 text-6xl flex justify-center items-center">🏆</span>}
              {index === 1 && <span className="h-12 w-12 text-gray-400 text-6xl flex justify-center items-center">🥈</span>}
              {index === 2 && <span className="h-12 w-12 text-orange-400 text-6xl flex justify-center items-center">🥉</span>}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{user.pseudo}</h3>
            <p className="text-main-four font-bold text-2xl mt-2">{user.total_note}</p>
            <p className="text-sm text-gray-600 mt-1">points</p>
          </div>
        ))}
      </div>

      {/* Classement avec défilement infini */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Classement</h2>
          <div className="space-y-4">
            {visibleUsers.slice(3).map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center justify-between py-3 border-b last:border-0 transition-opacity duration-500 ease-in-out ${
                  user.isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full font-semibold">{index}</span>
                  <span className="font-medium text-gray-900">{user.pseudo}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-main-four">{user.total_note}</p>
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </div>
            ))}

            {/* Élément sentinelle pour l'observateur */}
            <div ref={sentinelRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
