import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import adminAvatarRoutes from './routes/admin/admin_avatar.routes';
import adminLessonRoutes from './routes/admin/admin_lesson.routes';
import adminQuizRoutes from './routes/admin/admin_quiz.routes';
import adminQuizResultRoutes from './routes/admin/admin_quiz_result.routes';
import adminUserAccountRoutes from './routes/admin/admin_user_account.routes';
import avatarRoutes from './routes/avatar.routes';
import lessonRoutes from './routes/lesson.routes';
import quizRoutes from './routes/quiz.routes';
import userAccountRoutes from './routes/user_account.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/api/img', express.static(path.join(__dirname, 'upload')));

// Routes
app.use('/api/avatar', avatarRoutes);
app.use('/api/lesson', lessonRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/user-account', userAccountRoutes);
// Admin Routes
app.use('/api/admin/avatar', adminAvatarRoutes);
app.use('/api/admin/lesson', adminLessonRoutes);
app.use('/api/admin/quiz-result', adminQuizResultRoutes);
app.use('/api/admin/quiz', adminQuizRoutes);
app.use('/api/admin/user-account', adminUserAccountRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
