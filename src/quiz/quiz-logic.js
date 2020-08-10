import "babel-polyfill";

import { take } from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { api } from 'quiz/quiz-api';
import { actions } from 'redux/actions/action-creators';

import { quizDeck } from 'quiz/quiz-deck';
import { quizState, quizScore } from 'quiz/quiz-state';

const getDecks = async () => {
  return await api.getDecks();
};

const getDeck = async name => {
  
  const decks = await api.getDecks(name);
  const deck = { ...decks[0], isCurrent: true };
        deck.cards = [];
        deck.species.forEach(sp => {
          const card = {
            answers: utils.shuffleArray(deck.species),
            answer: deck.species[0]
          };
          deck.cards.push(card);
        });
        

  const { config } = store.getState();

  if(config.isPortraitMode) {
    deck.cards = deck.cards.map(card => {
      return { ...card, answers: take(4, card.answers)}
    });
  }

  subscription.add(quizDeck, 'deck', 'modal');
  subscription.add(quizState, 'deckState', 'modal');
  subscription.add(quizScore, 'deckScore', 'modal');

  return deck;
};

const getDeckNames = async () => {
  return await api.getDeckNames();
};

const getNextDeck = async () => {
  const decks = await api.getDecks();
  return decks[0];
};

const getTimeRemaining = endtime => {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
};

const initialiseClock = (clock, endtime) => {  
  const timeinterval = setInterval(() => {
    const t = getTimeRemaining(endtime);
    clock.innerHTML = `${t.minutes}:${t.seconds}`;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  },1000);
};

const markAnswer = (response, cardIndex = 0, cardCount) => {

  const score = {
    question: response.question,
    answer: response.answer,    
    success: response.question.name === response.answer.name || response.question.vernacularName === response.answer.vernacularName
  };

  const index = ++cardIndex;

  if(index === cardCount) {
    // end of deck
  } else {
    
    actions.boundNextCard(index);
  }

  actions.boundUpdateDeckScore(score);
};

export const logic = {
  getDecks,
  getDeck,
  getDeckNames,
  getNextDeck,
  initialiseClock,
  markAnswer
};