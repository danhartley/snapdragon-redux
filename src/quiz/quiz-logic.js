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

const getQuizDeck = async (name, numberOfCardsPerSpecies = 1, language = 'en') => {

  const { config } = store.getState();
  const NUMBER_OF_ALTERNATIVE_ANSWERS = config.isLandscapeMode ? 5 : 3;

  const decks = await api.getDecks(name);
  const deck = decks[0];
        deck.species.forEach(s => {
          const names = s.names.filter(name => name.language === language);
          s.vernacularName = names.length > 0 ? names[0].vernacularName : '';
        });
  const _deck = quizLogicHandler.getDeck({ ...deck, isCurrent: true }, NUMBER_OF_ALTERNATIVE_ANSWERS, numberOfCardsPerSpecies);

  subscription.add(quizDeck, 'deck', 'modal');
  subscription.add(quizState, 'deckState', 'modal');
  subscription.add(quizScore, 'deckScore', 'modal');

  return _deck;
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
      const seconds = (t.minutes * 60) + t.seconds;
      clock.innerHTML = convertSecondsToClockTime(seconds);
      if (t.total <= 0) {
        //actions.boundUpdateDeckScoreHistory(score);
        resetClock();
      }
      currentClockTime = convertSecondsToClockTime(seconds);
  },1000);
};

export const scoreResponseAndSetNextCard = (response, cardIndex = 0, cardCount, deckScore) => {

  const index = ++cardIndex;

  const isLastCard = index === cardCount;
  const isSecondLastCard = index === (cardCount - 1);

  const score = quizLogicHandler.getScore(response, isLastCard, deckScore);

  setTimeout(() => {

    // delay to allow the card to change red or green, indicating incorrect or correct

    if(!isLastCard) {
      actions.boundNextCard({ index, isLastCard, isSecondLastCard });
    }

    actions.boundUpdateDeckScore(score);

    if(isLastCard) {
      actions.boundUpdateDeckScoreHistory(score);
      document.querySelector('.js-strips').classList.add('no-pointer-events');
    }
  }, 500);

  return score;

};

const convertSecondsToClockTime = timeInSeconds => {
  var pad = function(num, size) { return ('000' + num).slice(size * -1); },
  time = parseFloat(timeInSeconds).toFixed(3),
  hours = Math.floor(time / 60 / 60),
  minutes = Math.floor(time / 60) % 60,
  seconds = Math.floor(time - minutes * 60),
  milliseconds = time.slice(-3);

  return pad(minutes, 2) + ':' + pad(seconds, 2);
};

export const logic = {
  getDecks,
  getQuizDeck,
  getDeckSummaries,
  getNextDeck,
  initialiseClock,
  resetClock,
  scoreResponseAndSetNextCard,
  convertSecondsToClockTime
};