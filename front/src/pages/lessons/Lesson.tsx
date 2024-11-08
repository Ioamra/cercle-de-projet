import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loadingGif from '../../assets/loading.webp';
import { Lesson as LessonModel } from '../../models/lesson.model';
import { getLesson } from '../../services/lessons/lesson.service';

function Lesson() {
  const { id } = useParams<{ id: string }>();
  if (!id) return;

  const [lesson, setLesson] = useState<LessonModel.ILesson>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const lessonsData = await getLesson(+id!);
        setLesson(lessonsData);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img className="w-1/3" src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col align-middle items-center justify-center max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">{lesson?.title}</h1>
      <div className="flex gap-6">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-2xl mr-2">⏰</span>
          <span className="text-2xl">{lesson?.time_in_min} minutes</span>
        </div>
        <div className="flex items-center text-sm text-gray-500"></div>
        <span className="text-2xl mr-2">📖</span>
        <span className="text-2xl">Niveau : {lesson?.difficulty}</span>
      </div>
      <div className="prose pb-12 text-gray-700 w-2/3 text-justify justify-center align-middle flex flex-col space-y-4">
        {lesson?.content.split('\n').map((paragraph, index) => (
          <p className="pt-3" key={index}>
            {paragraph}
          </p>
        ))}
      </div>

      {lesson && lesson.similary_lessons.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-900">Leçons similaires</h2>
          <div className="align-middle items-center justify-center">
            <div className="gap-6 flex flex-row">
              {lesson.similary_lessons.map((similaryLesson) => (
                <a
                  key={similaryLesson.id}
                  href={`/lesson/${similaryLesson.id}`}
                  className="flex flex-col gap-2 justify-between w-72 p-4 border rounded-lg shadow-sm hover:bg-gray-100"
                >
                  <h3 className="text-xl font-semibold">{similaryLesson.title}</h3>
                  <p className="text-gray-600">{similaryLesson.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{similaryLesson.time_in_min} minutes</span>
                    <span className="text-sm text-gray-500">Niveau : {similaryLesson.difficulty}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {lesson && lesson.similary_quizes.length > 0 && (
        <>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Quiz similaires</h2>
          <div className="mb-7 align-middle items-center justify-center">
            <div className="gap-6 flex flex-row">
              {lesson.similary_quizes.map((similaryQuiz) => (
                <a
                  key={similaryQuiz.id}
                  href={`/quiz/${similaryQuiz.id}`}
                  className="flex flex-col gap-2 w-72 p-4 border justify-between rounded-lg shadow-sm hover:bg-gray-100"
                >
                  <h3 className="text-xl font-semibold">{similaryQuiz.title}</h3>
                  <p className="text-gray-600">{similaryQuiz.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{similaryQuiz.time_in_min} minutes</span>
                    <span className="text-sm text-gray-500">Niveau : {similaryQuiz.difficulty}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Lesson;
