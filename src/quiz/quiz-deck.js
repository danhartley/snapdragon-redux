import { renderTemplate } from 'quiz/templating';
import { store } from 'redux/store';
import { logic } from 'quiz/quiz-logic';

import quizDeckTemplate from 'quiz/quiz-deck-template.html';

export const quizDeck = async deck => {

  const { deckSettings } = store.getState();

  const template = document.createElement('template');
        template.innerHTML = quizDeckTemplate;

  const parent = document.querySelector('.js-deck-container');
        parent.innerHTML = '';

  const card = deck.cards.find(card => card.isCurrent) || deck.cards[0];

  card.answers.forEach(answer => {
    answer.name1 = deckSettings.names === 'vernacular' ? answer.vernacularName : answer.name;
    answer.name2 = deckSettings.names === 'latin' ? answer.vernacularName : answer.name;
  });

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
    const score = logic.scoreResponseAndSetNextCard(answer, cardIndex === -1 ? 0 : cardIndex, deck.cards.length);

    score.success ? e.target.classList.add('snap-success') : e.target.classList.add('snap-alert');
  };

  const options = document.querySelectorAll('.js-strip');
        options.forEach(option => option.addEventListener('click', handleAnswer));
};