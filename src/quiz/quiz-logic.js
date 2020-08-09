import "babel-polyfill";

import { subscription } from 'redux/subscriptions'; 
import { api } from 'quiz/quiz-api';
import { actions } from 'redux/actions/action-creators';

const getDecks = async () => {
  return await api.getDecks();
};

const getDeck = async name => {
  const decks = await api.getDecks(name);
  const deck = { ...decks[0], isCurrent: true };
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

const markResponse = (response, cardIndex = 0, cardCount) => {
  const score = {
    success: response.question.name === response.answer.name || response.question.vernacularName === response.answer.vernacularName
  };

  const index = ++cardIndex;

  if(index === cardCount) {
    // end of deck
  } else {
    subscription.printAllSubs();
    actions.boundNextCard(index);
  }

  return score;
};

export const logic = {
  getDecks,
  getDeck,
  getDeckNames,
  getNextDeck,
  initialiseClock,
  markResponse
};