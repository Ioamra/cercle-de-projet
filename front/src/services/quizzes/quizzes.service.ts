import { Quiz } from '../../models/quiz.model';
import { apiServiceWithoutToken } from '../request.service';

export async function getQuizzes(): Promise<Quiz.IQuizWithoutDetail[]> {
  try {
    const response = await apiServiceWithoutToken.get('/quiz');
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
}
