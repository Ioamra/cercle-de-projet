const friends = [
  {
    id: 1,
    username: 'EcoWarrior',
    points: 1250,
    status: 'online',
    lastActive: 'Now',
  },
  {
    id: 2,
    username: 'GreenThumb',
    points: 980,
    status: 'offline',
    lastActive: '2 hours ago',
  },
  {
    id: 3,
    username: 'EarthDefender',
    points: 1500,
    status: 'online',
    lastActive: 'Now',
  },
];

export function getFriends() {
  return friends;
}
