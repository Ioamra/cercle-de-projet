import { Lesson } from '../../models/lesson.model';
import { apiServiceWithoutToken } from '../request.service';

export async function getLesson(id: number): Promise<Lesson.ILesson> {
  try {
    const response = await apiServiceWithoutToken.get('/lesson/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}
