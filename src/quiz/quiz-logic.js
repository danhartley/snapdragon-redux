import "babel-polyfill";

import { take, contains } from 'ramda';

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

  const { config } = store.getState();

  const alternatives = config.isLandscapeMode ? 5 : 3;
  
  const decks = await api.getDecks(name);
  const deck = { ...decks[0], isCurrent: true };
        deck.cards = [];
        deck.answered = [];

        deck.species.forEach(sp => {
          const answer = deck.species.filter(sp => !contains(sp.name, deck.answered))[0];
          const card = {
            answers: utils.shuffleArray([ ...take(alternatives, deck.species.filter(sp => sp.name !== answer.name)), answer ]),
            answer
          };
          deck.answered.push(answer.name);
          deck.cards.push(card);
        });
  
  subscription.add(quizDeck, 'deck', 'modal');
  subscription.add(quizState, 'deckState', 'modal');
  subscription.add(quizScore, 'deckScore', 'modal');

  return deck;
};

const getDeckSummaries = async () => {
  return await api.getDeckSummaries();
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

let timeinterval, currentClockTime;

const resetClock = () => {
  clearInterval(timeinterval);
};

const initialiseClock = (clock, endtime) => {  
  timeinterval = setInterval(() => {
      const t = getTimeRemaining(endtime);
      clock.innerHTML = `${t.minutes}:${t.seconds}`;
      if (t.total <= 0) {
        resetClock();
      }
      currentClockTime = `${t.minutes}:${t.seconds}`;
  },1000);
};

const checkClock = () => {
  return currentClockTime;
};

const markAnswer = (response, cardIndex = 0, cardCount) => {

  const index = ++cardIndex;

  const lastCard = index === cardCount;

  actions.boundNextCard({ index, lastCard });

  const score = {
    question: response.question,
    answer: response.answer,    
    success: response.question.name === response.answer.name || response.question.vernacularName === response.answer.vernacularName,
    lastCard
  };

  actions.boundUpdateDeckScore(score);
};

export const logic = {
  getDecks,
  getDeck,
  getDeckSummaries,
  getNextDeck,
  initialiseClock,
  resetClock,
  checkClock,
  markAnswer
};