import "babel-polyfill";

import { logic } from 'quiz/quiz-logic.js';

test('check for valid deck', async () => {  
  const deck = await logic.getNextDeck();
  expect(deck).toBeTruthy();
  expect(deck.hasOwnProperty('name')).toBeTruthy();
  expect(deck.hasOwnProperty('cards')).toBeTruthy();
  expect(deck.cards.length).toBeGreaterThan(0);
  expect(deck.cards[0].hasOwnProperty('answer')).toBeTruthy();
  expect(deck.cards[0].hasOwnProperty('answers')).toBeTruthy();
});

test('check response is marked correctly', () => {
  let response = {
    question: {
      vernacularName: 'Rock rosemary',
      name: 'Phagnalon saxatile',
    },    
    answer: {
      vernacularName: 'Rock rosemary',
      name: 'Phagnalon saxatile',
    },
  };
  let score = logic.markAnswer(response, 0, 1);
  expect(score.success).toBe(true);
  
  response = {
    question: {
      vernacularName: 'Rock rosemary',
      name: 'Phagnalon saxatile',
    },    
    answer: {
      vernacularName: 'Scarlet Pimpernel',
      name: 'Lysimachia arvensis',
    },
  };
  score = logic.markAnswer(response, 0, 1);
  expect(score.success).toBe(false);
});