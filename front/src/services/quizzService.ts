const quizzes = [
  {
    id: 1,
    title: 'Les bases du changement climatique',
    description: 'Testez vos connaissances sur les fondamentaux du changement climatique',
    difficulty: 'Débutant',
    timeEstimate: '10 mins',
    points: 100,
  },
  {
    id: 2,
    title: 'Énergie renouvelable',
    description: 'En savoir plus sur les différents types de sources d\'énergie renouvelables',
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
