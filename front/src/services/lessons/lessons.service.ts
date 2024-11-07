import { Lesson } from '../../models/lesson.model';
import { apiServiceWithoutToken } from '../request.service';

export async function getLessons(): Promise<Lesson.ILessonWithoutDetail[]> {
  try {
    const response = await apiServiceWithoutToken.get('/lesson');
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}
