import { useParams } from 'react-router-dom';
import { getLesson } from '../../services/lessonService';

function Lesson() {
  const lesson = getLesson();

  const { id } = useParams<{ id: string }>();
  const title = id ? lesson.find((lesson) => lesson.id === parseInt(id))?.title : '';
  const content = id ? lesson.find((lesson) => lesson.id === parseInt(id))?.content || '' : '';
  const time_in_min = id ? lesson.find((lesson) => lesson.id === parseInt(id))?.time_in_min : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">{title}</h1>
      <div className="flex items-center text-sm text-gray-500">
        <span className="text-2xl mr-2">⏰</span>
        <span className="text-2xl">{time_in_min} minutes</span>
      </div>
      <div className="prose text-gray-700 w-1/2 text-justify justify-center" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Lesson;
