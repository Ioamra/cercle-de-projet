import { Link } from 'react-router-dom';
import { getLessons } from '../../services/lessonService';

function Lessons() {
  const lessons = getLessons();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Environmental Lessons</h1>
        <p className="mt-2 text-gray-600">Expand your knowledge about our environment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">🏷️</span>
                  <span>{lesson.category}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">⏰</span>
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-4 w-4 mr-2">📖</span>
                  <span>Level: {lesson.level}</span>
                </div>
              </div>

              <Link to={`/lesson/${lesson.id}`} className="mt-4 block">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">Start Lesson</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
