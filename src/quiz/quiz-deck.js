import { utils } from 'utils/utils';
import { renderTemplate } from 'quiz/templating';
import { logic } from 'quiz/quiz-logic';

import quizDeckTemplate from 'quiz/quiz-deck-template.html';

export const quizDeck = deck => {

  const MINUTES = 5 * 60000;

  const template = document.createElement('template');
        template.innerHTML = quizDeckTemplate;

  const parent = document.querySelector('main');
        parent.innerHTML = '';

  const card = deck.cards.find(card => card.isCurrent) || deck.cards[0];

  renderTemplate({ deck, card }, template.content, parent);

  const start = document.querySelector('.js-start');
  const scoreCard = document.querySelector('.js-score-card');
  const clock = scoreCard.querySelector('.js-clock');

  start.addEventListener('click', e => {
    utils.toggleClass(start, 'hide');
    utils.toggleClass(scoreCard, 'hide');
    const endTime = new Date(Date.now() + MINUTES);
    logic.initialiseClock(clock, endTime);
  });


  const handleResponse = e => {
    const answer = {
      question: {
       name: card.answer.name,
       vernacularName: card.answer.vernacularName 
      },
      answer: {
        name: e.target.dataset.name,
        vernacularName: e.target.dataset.vernacularName
      }
    };
    const response = logic.markResponse(answer, deck.cards.findIndex(c => c.name === card.name), deck.cards.length);
    console.log(response);
  };

  const options = document.querySelectorAll('.js-strip');
        options.forEach(option => option.addEventListener('click', handleResponse));
};