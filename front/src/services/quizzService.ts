const quizzes = [
  {
    id: 1,
    title: 'Les bases du changement climatique',
    description: 'Testez vos connaissances sur les fondamentaux du changement climatique',
    difficulty: 'Débutant',
    timeEstimate: '10 mins',
    points: 100,
    questions: [
      {
        content: 'Quelle est la capitale de la France ?',
        answers: [
          { id: 1, text: 'Berlin' },
          { id: 2, text: 'Madrid' },
          { id: 3, text: 'Paris' },
          { id: 4, text: 'Rome' },
        ],
      },
      {
        content: 'Quelle est la capitale de zozo ?',
        answers: [
          { id: 1, text: 'zaza' },
          { id: 2, text: 'zuzu' },
          { id: 3, text: 'zyzy' },
          { id: 4, text: 'zozo' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Énergie renouvelable',
    description: "En savoir plus sur les différents types de sources d'énergie renouvelables",
    difficulty: 'Intermédiaire',
    timeEstimate: '15 mins',
    points: 150,
  },
  {
    id: 3,
    title: 'Conservation des océans',
    description: 'Explorer la vie marine et la préservation des océans',
    difficulty: 'Avancée',
    timeEstimate: '20 mins',
    points: 200,
  },
];

export function getQuizzes() {
  return quizzes;
}

export function getQuizById(id: number) {
  return quizzes.find((quiz) => quiz.id === id);
}
