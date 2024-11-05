import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Lesson from './pages/lessons/Lesson';
import Lessons from './pages/lessons/Lessons';
import Profile from './pages/profile/Profile';
import Quizzes from './pages/quizzes/Quizzes';
import Friends from './pages/social/Friends';
import Leaderboard from './pages/social/Leaderboard';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;