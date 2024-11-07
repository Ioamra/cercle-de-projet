export declare module Lesson {
  interface ILessonWithoutDetail {
    id: number;
    title: string;
    description: string;
    time_in_min: string;
    difficulty: string;
  }

  interface IQuizWithoutDetail {
    id: number;
    title: string;
    description: string;
    time_in_min: string;
    difficulty: string;
  }

  interface ILesson {
    id: number;
    title: string;
    content: string;
    img: string;
    video: string;
    time_in_min: string;
    difficulty: string;
    similary_lessons: ILessonWithoutDetail[];
    similary_quizes: IQuizWithoutDetail[];
  }
}
