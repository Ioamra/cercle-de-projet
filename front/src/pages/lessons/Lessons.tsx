import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLessons } from '../../services/lessonsService';

type LessonWithoutDetail = {
  id: number;
  title: string;
  description: string;
  time_in_min: string;
  difficulty: string;
};

function Lessons() {
  const [lessons, setLessons] = useState<LessonWithoutDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const lessonsData = await getLessons();
        setLessons(lessonsData);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Leçons sur l'environnement</h1>
        <p className="mt-2 text-gray-600">Développez vos connaissances sur notre environnement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">⏰</span>
                  <span>{lesson.time_in_min} mins</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">📖</span>
                  <span>Niveau : {lesson.difficulty}</span>
                </div>
              </div>
            </div>

            <Link to={`/lesson/${lesson.id}`} className="mt-auto p-6 pt-0">
              <button className="w-full bg-main-four text-white py-2 px-4 rounded-md hover:bg-main-five transition">Commencer la leçon</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
