import { logic } from 'quiz/quiz-logic.js';

test('check for valid deck', async () => {  
  const deck = await logic.getNextDeck();
  console.log('****', deck)
  expect(deck).toBeTruthy();
  expect(deck.hasOwnProperty('name')).toBeTruthy();
  expect(deck.hasOwnProperty('cards')).toBeTruthy();
  expect(deck.cards.length).toBeGreaterThan(0);
  expect(deck.cards[0].hasOwnProperty('answer')).toBeTruthy();
  expect(deck.cards[0].hasOwnProperty('answers')).toBeTruthy();
});