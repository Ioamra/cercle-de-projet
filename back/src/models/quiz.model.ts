export declare module Quiz {
  interface IQuizWithoutDetail {
    id: number;
    title: string;
    description: string;
    time_in_min: number;
    difficulty: string;
    avg_note: number;
    play_count: number;
  }

  interface IQuiz {
    id: number;
    title: string;
    description: string;
    time_in_min: number;
    difficulty: string;
    avg_note: number;
    play_count: number;
    questions: IQuizQuestion[];
  }

  interface IQuizQuestion {
    id: number;
    content: string;
    responses: IQuizResponse[];
  }

  interface IQuizResponse {
    id: number;
    content: string;
    is_correct: boolean;
  }

  interface IQuestionResult {
    id_question: number;
    id_response: number;
    is_correct: boolean;
  }

  interface IQuizWithoutQuizResult {
    id: number;
    title: string;
    description: string;
    time_in_min: number;
    difficulty: string;
    questions: IQuizQuestion[];
  }
}
