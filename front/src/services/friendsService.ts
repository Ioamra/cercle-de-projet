const friends = [
  {
    id: 1,
    username: 'EcoWarrior',
    points: 1250,
    status: 'En ligne',
    lastActive: 'Maintenant',
  },
  {
    id: 2,
    username: 'GreenThumb',
    points: 980,
    status: 'Hors-ligne',
    lastActive: 'Il y a 2 heures',
  },
  {
    id: 3,
    username: 'EarthDefender',
    points: 1500,
    status: 'En ligne',
    lastActive: 'Maintenant',
  },
];

export function getFriends() {
  return friends;
}
