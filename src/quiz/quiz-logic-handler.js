import { take, contains } from 'ramda';

import { utils } from 'utils/utils';

const getDeck = (deck, numberOfAlternatives) => {

  deck.cards = [];
  deck.answered = [];

  deck.species.forEach(sp => {
    const answer = utils.shuffleArray(deck.species.filter(sp => !contains(sp.name, deck.answered)))[0];
    const card = {
      answers: utils.shuffleArray([ ...take(numberOfAlternatives, deck.species.filter(sp => sp.name !== answer.name)), answer ]),
      answer
    };
    deck.answered.push(answer.name);
    deck.cards.push(card);
  });

  return deck;
};

const getScore = (response, isLastCard) => {

  const score = {
    question: response.question,
    answer: response.answer,    
    success: response.question.name === response.answer.name || response.question.vernacularName === response.answer.vernacularName,
    isLastCard
  };

  return score;
};

export const quizLogicHandler = {
  getDeck,
  getScore
};