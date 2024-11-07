import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLesson } from '../../services/lessonsService';

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

type LessonType = {
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

function Lesson() {
  const { id } = useParams<{ id: string }>();
  if (!id) return;

  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const lessonsData = await getLesson(+id!);
        setLessons(lessonsData);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  const lesson = lessons[0];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col align-middle items-center justify-center max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">{lesson?.title}</h1>

      <div className="flex gap-6">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-2xl mr-2">⏰</span>
          <span className="text-2xl">{lesson?.time_in_min} minutes</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-2xl mr-2">📖</span>
          <span className="text-2xl">Niveau : {lesson?.difficulty}</span>
        </div>
      </div>

      <div className="prose pb-12 text-gray-700 w-2/3 text-justify justify-center align-middle flex flex-col space-y-4">
        {lesson?.content.split('\n').map((paragraph, index) => (
          <p className="pt-3" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Lesson;
