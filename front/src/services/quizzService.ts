const quizzes = [
  {
    id: 1,
    title: 'Climate Change Basics',
    description: 'Test your knowledge about climate change fundamentals',
    difficulty: 'Beginner',
    timeEstimate: '10 mins',
    points: 100,
  },
  {
    id: 2,
    title: 'Renewable Energy',
    description: 'Learn about different types of renewable energy sources',
    difficulty: 'Intermediate',
    timeEstimate: '15 mins',
    points: 150,
  },
  {
    id: 3,
    title: 'Ocean Conservation',
    description: 'Explore marine life and ocean preservation',
    difficulty: 'Advanced',
    timeEstimate: '20 mins',
    points: 200,
  },
];

export function getQuizzes() {
  return quizzes;
}
