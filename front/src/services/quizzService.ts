import { apiServiceWithoutToken } from './requestService';

type QuizWithoutDetail = {
  id: number;
  title: string;
  description: string;
  time_in_min: number;
  difficulty: string;
  avg_note: number;
  play_count: number;
};

type Quiz = {
  id: number;
  title: string;
  description: string;
  time_in_min: number;
  difficulty: string;
  avg_note: number;
  play_count: number;
  questions: QuizQuestion[];
};

type QuizQuestion = {
  id: number;
  content: string;
  responses: QuizResponse[];
};

type QuizResponse = {
  id: number;
  content: string;
  is_correct: boolean;
};

export async function getQuizzes(): Promise<QuizWithoutDetail[]> {
  try {
    const response = await apiServiceWithoutToken.get('/quiz');
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
}

export async function getQuiz(id: number): Promise<Quiz> {
  try {
    const response = await apiServiceWithoutToken.get(`/quiz/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
}
