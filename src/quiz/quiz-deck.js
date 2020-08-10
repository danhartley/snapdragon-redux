import { renderTemplate } from 'quiz/templating';
import { logic } from 'quiz/quiz-logic';

import quizDeckTemplate from 'quiz/quiz-deck-template.html';

export const quizDeck = async deck => {

  const template = document.createElement('template');
        template.innerHTML = quizDeckTemplate;

  const parent = document.querySelector('.js-deck-container') || document.querySelector('main');
        parent.innerHTML = '';

  const card = deck.cards.find(card => card.isCurrent) || deck.cards[0];

  renderTemplate({ deck, card }, template.content, parent);

  const handleAnswer = e => {
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
    const cardIndex = deck.cards.findIndex(c => c.isCurrent);
    logic.markAnswer(answer, cardIndex === -1 ? 0 : cardIndex, deck.cards.length);    
  };

  const options = document.querySelectorAll('.js-strip');
        options.forEach(option => option.addEventListener('click', handleAnswer));
};