import { take, contains } from 'ramda';

import { utils } from 'utils/utils';

const getDeck = (deck, numberOfAlternativeAnswers, numberOfCardsPerSpecies) => {

  let _numberOfCardsPerSpecies = numberOfCardsPerSpecies > deck.species[0].srcs.length ? deck.species[0].srcs.length : numberOfCardsPerSpecies;
  let _index = 0;
  let _deck = _getDeck(deck, numberOfAlternativeAnswers, _index);

  ++_index;

  while(_index < _numberOfCardsPerSpecies) {    
    _deck.cards = [ ..._deck.cards, ..._getDeck(deck, numberOfAlternativeAnswers, _index).cards ];
    ++_index;
  }

  return _deck;    
}

const _getDeck = (deck, numberOfAlternativeAnswers, index) => {

  deck.cards = [];
  deck.exclude = [];

  deck.species.forEach(sp => {
    let answer = utils.shuffleArray(deck.species.filter(sp => !contains(sp.name, deck.exclude)));
    if(!answer) return;
        answer = answer[0];
    const answers = utils.shuffleArray([ ...take(numberOfAlternativeAnswers, deck.species.filter(sp => sp.name !== answer.name)), answer ]);
    const card = {
      answers: answers.map(answer => { return { ...answer, src: answer.srcs[index] } }),
      answer: { ...answer, src: answer.srcs[index] }
    };
    deck.exclude.push(answer.name);
    deck.cards.push(card);
  });

  return deck;
};

const getScore = (response, isLastCard, deckScore) => {

  console.log(deckScore.total);

  const score = {
    question: response.question,
    answer: response.answer,    
    success: response.question.name === response.answer.name || response.question.vernacularName === response.answer.vernacularName,
    isLastCard
  };

  let total = ++deckScore.total;
  let correct = deckScore.correct;
  let incorrect = deckScore.incorrect;
  return { 
    ...score
    , total
    , correct: score.success ? ++correct : correct
    , incorrect: !score.success ? ++incorrect : incorrect
  };
};

export const quizLogicHandler = {
  getDeck,
  getScore
};