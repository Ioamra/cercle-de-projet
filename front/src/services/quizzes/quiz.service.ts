import { Quiz } from '../../models/quiz.model';
import { apiService, apiServiceWithoutToken } from '../request.service';

export async function getQuiz(id: number): Promise<Quiz.IQuiz> {
  try {
    const response = await apiServiceWithoutToken.get(`/quiz/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
}

export async function addQuizResult(id: number, data: Quiz.IQuestionResult[]): Promise<Quiz.IQuiz> {
  try {
    const response = await apiService.post(`/quiz/add-result/${id}`, { data });
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
}
