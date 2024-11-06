import { useState } from 'react';

function QuizQuestion() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const question = {
    content: 'Quelle est la capitale de la France ?',
    answers: [
      { id: 1, text: 'Berlin' },
      { id: 2, text: 'Madrid' },
      { id: 3, text: 'Paris' },
      { id: 4, text: 'Rome' },
    ],
  };

  const handleAnswerClick = (answerId: number) => {
    setSelectedAnswer(answerId);
    // Vous pouvez ajouter une logique pour vérifier la réponse et passer à la question suivante
  };

  return (
    <div className="min-h-screen bg-purple-600 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">{question.content}</h2>
        <div className="grid grid-cols-2 gap-6">
          {question.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerClick(answer.id)}
              className={`py-6 px-4 rounded-lg text-white text-xl font-semibold transition duration-200 ${
                selectedAnswer === answer.id ? 'bg-main-five' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizQuestion;
