import { enums } from 'ui/helpers/enum-helper';
import { clone } from 'ramda';
import { types } from 'redux/actions/action-types';

export const decks = (state = [{name:'random change', count: 0}], action) => {
  switch(action.type) {
    case types.UPDATE_DECKS:
      return action.data;
    case types.NEXT_DECK:
      return state;
    default:
      return state;
  }
};

export const deck = (state = {}, action) => {
  switch(action.type) {
    case types.UPDATE_DECK:
      return action.data;
    case types.NEXT_CARD:
      const deck = clone(state);
      const currentCard = deck.cards.find(c => c.isCurrent);
      if(currentCard) delete currentCard.isCurrent;
        deck.cards[action.data.index].isCurrent = true;
      return deck;
    default: 
      return state;
  }
};

export const deckState = (state = enums.deckState.BEGIN, action) => {
  switch(action.type) {
    case 'persist/REHYDRATE': {
        return {};
    }
    case types.UPDATE_DECK_STATE:
      return action.data;
    case types.NEXT_CARD:
      return enums.deckState.SCORE;
    case types.UPDATE_DECK_SCORE_HISTORY:
      return enums.deckState.END;
    default:
      return state;
  }
};

export const deckScore = (state = { total: 0, correct: 0, incorrect: 0 }, action) => {
  switch(action.type) {
    case types.UPDATE_DECK_SCORE:
      return action.data;
    case types.UPDATE_DECK_STATE:
      console.log(action.data);
      //enums.deckState.BEGIN
      return { total: 0, correct: 0, incorrect: 0 };
    default:
      return state;
  }
};

export const deckScoreHistory = (state = { total: 0, correct: 0, incorrect: 0 }, action) => {
  switch(action.type) {
    case types.UPDATE_DECK_SCORE_HISTORY:
      const score = action.data;
      return {
        total: state.total + score.total,
        correct: state.correct + score.correct,
        incorrect: state.incorrect + score.incorrect
      };
    case types.CLEAR_DECK_SCORE_HISTORY:
      return { total: 0, correct: 0, incorrect: 0 };
  default:
    return state;
  }
};

export const deckSettings = (state = { name: 'vernacular', language: 'en' }, action) => {
  switch(action.type) {
    case types.UPDATE_DECK_SETTINGS:
      const name = action.data.name || state.name;
      const language = action.data.language || state.language;
      return { ...state, name, language };
    default:
      return state;
  }
};