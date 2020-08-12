import "babel-polyfill";

import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { api } from 'quiz/quiz-api';
import { actions } from 'redux/actions/action-creators';

import { quizLogicHandler } from 'quiz/quiz-logic-handler';
import { quizDeck } from 'quiz/quiz-deck';
import { quizState, quizScore } from 'quiz/quiz-state';

const getDecks = async () => {
  return await api.getDecks();
};

const getDeck = async name => {

  const { config } = store.getState();
  const numberOfAlternatives = config.isLandscapeMode ? 5 : 3;

  const decks = await api.getDecks(name);
  const deck = quizLogicHandler.getDeck({ ...decks[0], isCurrent: true }, numberOfAlternatives);

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
  return currentClockTime;
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

export const scoreResponseAndSetNextCard = (response, cardIndex = 0, cardCount) => {

  const index = ++cardIndex;

  const isLastCard = index === cardCount;

  actions.boundNextCard({ index, isLastCard });

  const score = quizLogicHandler.getScore(response, isLastCard);

  actions.boundUpdateDeckScore(score);
};

export const logic = {
  getDecks,
  getDeck,
  getDeckSummaries,
  getNextDeck,
  initialiseClock,
  resetClock,
  scoreResponseAndSetNextCard
};