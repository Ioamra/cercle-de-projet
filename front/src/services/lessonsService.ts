const lessons = [
  {
    id: 1,
    title: 'Introduction au développement durable',
    description: 'Apprendre les principes de base de la durabilité environnementale',
    category: 'Principes de base',
    duration: '30 mins',
    level: 'Débutant',
  },
  {
    id: 2,
    title: 'Gestion des déchets',
    description: 'Comprendre les pratiques de réduction des déchets et de recyclage',
    category: 'Compétences pratiques',
    duration: '45 mins',
    level: 'Intermédiaire',
  },
  {
    id: 3,
    title: 'Conservation de la biodiversité',
    description: 'Explorer les écosystèmes et la préservation des espèces',
    category: 'Sujets avancés',
    duration: '60 mins',
    level: 'Avancée',
  },
];

export function getLessons() {
  return lessons;
}
