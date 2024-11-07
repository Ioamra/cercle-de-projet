import { apiServiceWithoutToken } from './requestService';

type LessonWithoutDetail = {
  id: number;
  title: string;
  description: string;
  time_in_min: string;
  difficulty: string;
};

type QuizWithoutDetail = {
  id: number;
  title: string;
  description: string;
  time_in_min: string;
  difficulty: string;
};

type Lesson = {
  id: number;
  title: string;
  content: string;
  img: string;
  video: string;
  time_in_min: string;
  difficulty: string;
  similary_lessons: LessonWithoutDetail[];
  similary_quizes: QuizWithoutDetail[];
};

export async function getLessons(): Promise<LessonWithoutDetail[]> {
  try {
    const response = await apiServiceWithoutToken.get('/lesson');
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

export async function getLesson(id: number): Promise<Lesson[]> {
  try {
    const response = await apiServiceWithoutToken.get('/lesson/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}
