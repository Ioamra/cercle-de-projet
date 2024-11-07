import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkExpiration } from '../../services/expirationService';

function Navbar() {
  // Check expiration
  checkExpiration();

  const user = localStorage.getItem('user') != undefined ? JSON.parse(localStorage.getItem('user')!) : null;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-main-four text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <span className="font-bold text-xl">Kestrel</span>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7m-9 9v-6h4v6m5 0h-14"></path>
              </svg>
              <span>Accueil</span>
            </Link>
            <Link to="/quizzes" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span>Quizz</span>
            </Link>
            <Link to="/lessons" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19h16M4 5h16M4 12h16"></path>
              </svg>
              <span>Leçon</span>
            </Link>
            <Link to="/friends" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Amis</span>
            </Link>
            <Link to="/leaderboard" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 21h8M12 17v4M7 3h10l1 7H6l1-7z"></path>
              </svg>
              <span>Classement</span>
            </Link>
          </div>

          {/* Menu utilisateur */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-1 hover:text-main-two">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
                    <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"></path>
                  </svg>
                  <span>{user.username}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-main-two">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-white text-main-five px-4 py-2 rounded-lg hover:bg-main-two hover:text-main-one">
                Connexion
              </Link>
            )}
          </div>

          {/* Bouton menu mobile */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden space-y-2 mt-4">
            <Link to="/" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7m-9 9v-6h4v6m5 0h-14"></path>
              </svg>
              <span>Accueil</span>
            </Link>
            <Link to="/quizzes" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span>Quizz</span>
            </Link>
            <Link to="/lessons" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19h16M4 5h16M4 12h16"></path>
              </svg>
              <span>Leçon</span>
            </Link>
            <Link to="/friends" className="flex items-center space-x-1 hover:text-main-two">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Amis</span>
            </Link>
            <Link to="/leaderboard" className="flex items-center space-x-1 hover:text-main-two pb-4">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 21h8M12 17v4M7 3h10l1 7H6l1-7z"></path>
              </svg>
              <span>Classement</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
