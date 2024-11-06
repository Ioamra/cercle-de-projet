import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/store';
import { register } from '../../services/auth/registerService';

function Register() {
  const [pseudo, setPseudo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idAvatar, setIdAvatar] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nouveau champ pour confirmer le mot de passe
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      const { token, user } = await register(email, pseudo, firstName, lastName, password, idAvatar);
      dispatch({ type: 'SET_AUTH', payload: { token, user } });
      navigate('/');
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
          <span className="h-8 w-8 text-green-600 mr-2">📝</span>
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

          {/* Sélection de l'avatar */}
          <div className="mb-4">
            <label htmlFor="idAvatar" className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <select
              id="idAvatar"
              value={idAvatar}
              onChange={(e) => setIdAvatar(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-main-four focus:border-main-four sm:text-sm"
              required
            >
              <option value={1}>Avatar 1</option>
              <option value={2}>Avatar 2</option>
              <option value={3}>Avatar 3</option>
              {/* Ajoutez plus d'options selon vos avatars disponibles */}
            </select>
          </div>

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
