import { ChangeEvent, useEffect, useRef, useState } from 'react';
import loadingGif from '../../assets/loading.webp';
import { UserAccount } from '../../models/userAccount.model';
import { getLeaderboard } from '../../services/social/leaderboard.service';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserAccount.IUserAccount[]>([]);
  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState<'total_note' | 'avg_note' | 'nb_quiz_make'>('total_note');

  async function fetchLeaderboard() {
    try {
      const leaderboardData = await getLeaderboard(order);
      setLeaderboard(leaderboardData);
      console.log(order);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaderboard();
    console.log(visibleUsers);
  }, [order]);

  const itemsPerLoad = 10;

  const [visibleUsers, setVisibleUsers] = useState<(UserAccount.IUserAccount & { isVisible: boolean })[]>([]);
  const [lastIndex, setLastIndex] = useState(3);

  useEffect(() => {
    setVisibleUsers(leaderboard.slice(0, 3).map((user) => ({ ...user, isVisible: true })));
    setLastIndex(3);
  }, [leaderboard]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

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

  const handleOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value as 'total_note' | 'avg_note' | 'nb_quiz_make');
    setLastIndex(0);
  };

  function getDisplayValue(user: UserAccount.IUserAccount) {
    switch (order) {
      case 'total_note':
        return `${Math.round(user.total_note) || 0} points`;
      case 'avg_note':
        return `${Number(user.avg_note).toFixed(2) || 0} / 10`;
      case 'nb_quiz_make':
        return `${user.nb_quiz_make || 0} quiz terminés`;
      default:
        return `${Math.round(user.total_note) || 0} points`;
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-1/3" src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Classement mondial</h1>
        <select value={order} onChange={handleOrderChange} className="border rounded px-2 py-1">
          <option value="total_note">Total Note</option>
          <option value="avg_note">Note Moyenne</option>
          <option value="nb_quiz_make">Nombre de Quizz Réalisés</option>
        </select>
      </div>

      {/* Top 3 utilisateurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {visibleUsers.slice(0, 3).map((user, index) => (
          <div
            key={user.id}
            className={`bg-white flex flex-col gap-4 rounded-lg shadow-md p-6 text-center ${index === 0 ? 'ring-2 ring-yellow-400' : ''}`}
          >
            <div className=" rounded-full flex justify-center items-center">
              <img src={'http://' + user.avatar} className="w-20 rounded-full" />
            </div>
            <div className="flex flex-row items-center justify-around">
              <h3 className="text-xl font-semibold text-gray-900">{user.pseudo}</h3>
            </div>
            <p className="text-main-four font-bold text-2xl">{getDisplayValue(user)}</p>
            <div className="flex justify-center mb-2">
              {index === 0 && <span className="h-12 w-12 text-yellow-400 text-6xl flex justify-center items-center">🏆</span>}
              {index === 1 && <span className="h-12 w-12 text-gray-400 text-6xl flex justify-center items-center">🥈</span>}
              {index === 2 && <span className="h-12 w-12 text-orange-400 text-6xl flex justify-center items-center">🥉</span>}
            </div>
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
                  <span className="w-8 h-8 flex items-center justify-center rounded-full font-semibold">{index + 4}</span>
                  <div className="bg-green-100 rounded-full">
                    <img src={'http://' + user.avatar} className="w-12 rounded-full" />
                  </div>
                  <span className="font-medium text-gray-900">{user.pseudo}</span>
                </div>
                <div className="text-right flex flex-row gap-2 items-center">
                  <p className="font-semibold text-main-four">{getDisplayValue(user)}</p>
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
