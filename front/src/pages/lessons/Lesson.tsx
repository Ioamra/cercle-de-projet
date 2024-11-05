import { useParams } from 'react-router-dom';

function Lesson() {
  const { id } = useParams<{ id: string }>();
  const title = `Titre de la Leçon ${id}`;
  const content = `
    Contenu de la leçon avec des informations fictives pour l'exemple.

    **Points Clés :**
    - Point important 1
    - Point important 2
    - Point important 3

    **Résumé :**
    Une brève description de ce que l'étudiant apprendra dans cette leçon.
  `;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <div className="prose text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Lesson;
