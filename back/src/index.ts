import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/api/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
