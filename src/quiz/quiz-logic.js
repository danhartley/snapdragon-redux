import "babel-polyfill";

import { api } from 'quiz/quiz-api';

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

const initializeClock = (clock, endtime) => {  
  const timeinterval = setInterval(() => {
    const t = getTimeRemaining(endtime);
    clock.innerHTML = `${t.minutes}:${t.seconds}`;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  },1000);
};

export const logic = {
  getNextDeck,
  initializeClock
};