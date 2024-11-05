import { useParams } from 'react-router-dom';
import { getLesson } from '../../services/lessonService';

function Lesson() {
  const lesson = getLesson();

  const { id } = useParams<{ id: string }>();
  const title = id ? lesson.find((lesson) => lesson.id === parseInt(id))?.title : '';
  const content = id ? lesson.find((lesson) => lesson.id === parseInt(id))?.content || '' : '';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <div className="prose text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Lesson;
