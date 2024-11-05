import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Quizzes from './pages/quizzes/Quizzes';
import Lessons from './pages/lessons/Lessons';
import Lesson from './pages/lessons/Lesson';
import Profile from './pages/profile/Profile';
import Friends from './pages/social/Friends';
import Leaderboard from './pages/social/Leaderboard';
import AdminDashboard from './pages/admin/Dashboard';

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