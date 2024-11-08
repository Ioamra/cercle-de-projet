import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../../models/avatar.model';
import { register } from '../../services/auth/register.service';
import { getAllAvatar } from '../../services/social/profile.service';

function Register() {
  const [pseudo, setPseudo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatars, setAvatars] = useState<Avatar.IAvatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nouveau champ pour confirmer le mot de passe
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAvatars() {
      try {
        const avatarData = await getAllAvatar();
        setAvatars(avatarData);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    }

    fetchAvatars();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      const res = await register(email, pseudo, firstName, lastName, password, selectedAvatar);
      if (res === 'ok') {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Échec de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Pseudo */}
          <div className="mb-4">
            <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700">
              Pseudo
            </label>
            <input
              type="text"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-four focus:border-main-four sm:text-sm"
              required
            />
          </div>

          {/* Prénom et Nom côte à côte */}
          <div className="mb-4 flex space-x-4">
            {/* Prénom */}
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-four focus:border-main-four sm:text-sm"
                required
              />
            </div>

            {/* Nom */}
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-four focus:border-main-four sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Card pour la sélection de l'avatar */}
          <div className="mb-4">
            <label className="text-sm font-medium text-main-five">Avatar</label>
            <div className="border border-gray-300 rounded-md p-2 max-h-48 overflow-y-auto">
              <div className="flex flex-row items-center justify-start gap-2">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`cursor-pointer w-12 border-2 rounded-full ${selectedAvatar === avatar.id ? 'border-main-four' : 'border-white'}`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <img src={'http://' + avatar.img} alt={`Avatar ${avatar.id}`} className="w-full h-auto rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hidden input to store selected avatar ID */}
          <input type="hidden" id="idAvatar" value={selectedAvatar} />

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-four focus:border-main-four sm:text-sm"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-four focus:border-main-four sm:text-sm"
              required
            />
          </div>

          {/* Confirmer le mot de passe */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-main-four focus:border-main-four sm:text-sm"
              required
            />
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main-four hover:bg-main-five focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-five"
            disabled={loading}
          >
            {loading ? 'Chargement...' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-main-four hover:text-main-five">
            Vous avez déjà un compte ? Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
