const questions = {
  content: 'Quelle est la capitale de la France ?',
  answers: [
    { id: 1, text: 'Berlin' },
    { id: 2, text: 'Madrid' },
    { id: 3, text: 'Paris' },
    { id: 4, text: 'Rome' },
  ],
};

export function getQuestions() {
  return questions;
}
