import { renderTemplate } from 'quiz/templating';
import { logic } from 'quiz/quiz-logic';

import quizModalTemplate from 'quiz/quiz-modal-template.html';

export const quizModal = async () => {

  const MINUTES = 5 * 60000;

  const template = document.createElement('template');
        template.innerHTML = quizModalTemplate;

  const parent = document.querySelector('.modal');

  const deck = await logic.getNextDeck();
  const card = deck.cards[0]

  renderTemplate({ deck, card }, template.content, parent);

  const start = document.querySelector('.js-start');
  const scoreCard = document.querySelector('.js-score-card');
  const clock = scoreCard.querySelector('.js-clock');

  start.addEventListener('click', e => {
    toggleClass(start, 'hide');
    toggleClass(scoreCard, 'hide');

    const endTime = new Date(Date.now() + MINUTES);

    logic.initializeClock(clock, endTime);
  });

  const hasClass = (elem, className) => {
    if(!elem) return false;
    const classArray = [ ...elem.classList ];
    const isTrue = classArray.find(c => c === className);
    return !!isTrue;
  };

  const toggleClass = (elem, className) => {
    if(!elem) return;
    hasClass(elem, className) 
      ? elem.classList.remove(className)
      : elem.classList.add(className);
  };

};