import { renderTemplate } from 'quiz/templating';
import { store } from 'redux/store';
import { logic } from 'quiz/quiz-logic';

import quizDeckTemplate from 'quiz/quiz-deck-image-template.html';
import quizDeckAnswersTemplate from 'quiz/quiz-deck-answers-template.html';

export const quizDeck = async deck => {

  document.querySelector('.quiz .js-quiz-header').innerText = deck.name;

  const { deckSettings } = store.getState();

  const template = document.createElement('template');
        template.innerHTML = quizDeckTemplate;

  let parent = document.querySelector('.js-quiz-top');
      parent.innerHTML = '';

  const card = deck.cards.find(card => card.isCurrent) || deck.cards[0];

  card.answers.forEach(answer => {
    answer.name1 = deckSettings.name === 'vernacular' ? answer.vernacularName : answer.name;
    answer.name2 = deckSettings.name === 'latin' ? answer.vernacularName : answer.name;
  });

  renderTemplate({ card }, template.content, parent);

  template.innerHTML = quizDeckAnswersTemplate;

  parent = document.querySelector('.js-quiz-middle');
  parent.innerHTML = '';

  renderTemplate({ card }, template.content, parent);

  const handleAnswer = e => {

    const { deckScore } = store.getState();
    
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
    const score = logic.scoreResponseAndSetNextCard(answer, cardIndex === -1 ? 0 : cardIndex, deck.cards.length, deckScore);

    console.log(score.success)

    score.success ? e.target.classList.add('snap-success') : e.target.classList.add('snap-alert');
  };

  const options = document.querySelectorAll('.js-strip');
        options.forEach(option => option.addEventListener('click', handleAnswer));
};