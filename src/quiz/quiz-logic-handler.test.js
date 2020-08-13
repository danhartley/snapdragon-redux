import { quizLogicHandler } from 'quiz/quiz-logic-handler';
import { decks } from 'quiz/quiz-api';

test('getDeck returns a deck with one card per species', () => {
  const myDeck = decks[0];
  const numberOfAlternativeAnswers = 1;
  const numberOfAnswers = numberOfAlternativeAnswers + 1;
  const numberOfCardsPerSpecies = 1;
  const deck = quizLogicHandler.getDeck(myDeck, numberOfAlternativeAnswers, numberOfCardsPerSpecies);
  expect(deck.cards.filter(card => card.answer.name === myDeck.species[0].name).length).toBe(1);
  expect(deck.cards.filter(card => card.answer.name === myDeck.species[0].name)[0].answer.name).toBe(myDeck.species[0].name);
  expect(deck.cards.filter(card => card.answer.name === myDeck.species[0].name)[0].answers.length).toBe(numberOfAnswers);
  expect(deck.cards[0].answer.src).toEqual(myDeck.species.find(sp => sp.name === deck.cards[0].answer.name).srcs[0]);
});

test('getDeck returns a deck with two cards per species', () => {
  const myDeck = decks[0];
  const numberOfAlternativeAnswers = 1;
  const numberOfAnswers = numberOfAlternativeAnswers + 1;
  const numberOfCardsPerSpecies = 2;
  const deck = quizLogicHandler.getDeck(myDeck, numberOfAlternativeAnswers, numberOfCardsPerSpecies);
  expect(deck.cards.filter(card => card.answer.name === myDeck.species[0].name).length).toBe(2);
});

test('getScore returns the correct score', () => {
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
  let score = quizLogicHandler.getScore(response, false);
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
  score = quizLogicHandler.getScore(response, false);
  expect(score.success).toBe(false);
});