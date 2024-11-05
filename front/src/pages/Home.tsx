import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-main-two mb-6">Apprenez & Jouez pour une Planète Meilleure</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Rejoignez notre communauté d'éco-guerriers. Participez à des quiz, apprenez grâce à des cours, et défiez vos amis tout en faisant une réelle
          différence pour notre environnement.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-main-two border-2 border-main-two text-white px-8 py-3 rounded-lg hover:bg-main-one hover:border-white transition"
          >
            Commencer
          </Link>
          <Link
            to="/quizzes"
            className="text-main-two border-2 border-main-two px-8 py-3 rounded-lg hover:border-white hover:bg-main-two hover:text-white transition"
          >
            Essayer un Quiz
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-4">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <span className="h-12 w-12 text-main-two mb-4" role="img" aria-label="Award">
            🏆
          </span>
          <h3 className="text-xl font-semibold mb-2">Quiz Interactifs</h3>
          <p className="text-gray-600">Testez vos connaissances avec des quiz amusants et engageants sur divers sujets environnementaux.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <span className="h-12 w-12 text-main-two mb-4" role="img" aria-label="Book Open">
            📖
          </span>
          <h3 className="text-xl font-semibold mb-2">Leçons Approfondies</h3>
          <p className="text-gray-600">Apprenez grâce à des cours complets conçus par des experts en environnement.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <span className="h-12 w-12 text-main-two mb-4" role="img" aria-label="Users">
            👥
          </span>
          <h3 className="text-xl font-semibold mb-2">Apprentissage Social</h3>
          <p className="text-gray-600">Connectez-vous avec des amis, rivalisez sur les classements et apprenez ensemble.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 px-4 rounded-xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-main-six mb-8">Notre Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-main-one mb-2">10K+</div>
              <div className="text-main-six">Apprenants Actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-main-one mb-2">500+</div>
              <div className="text-main-six">Quiz Environnementaux</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-main-one mb-2">50+</div>
              <div className="text-main-six">Cours Dirigés par des Experts</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
