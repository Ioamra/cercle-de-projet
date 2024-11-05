const lessons = [
  {
    id: 1,
    title: 'Introduction to Sustainability',
    description: 'Learn the basic principles of environmental sustainability',
    category: 'Fundamentals',
    duration: '30 mins',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Waste Management',
    description: 'Understanding waste reduction and recycling practices',
    category: 'Practical Skills',
    duration: '45 mins',
    level: 'Intermediate',
  },
  {
    id: 3,
    title: 'Biodiversity Conservation',
    description: 'Exploring ecosystems and species preservation',
    category: 'Advanced Topics',
    duration: '60 mins',
    level: 'Advanced',
  },
];

export function getLessons() {
  return lessons;
}
