import { enums } from 'ui/helpers/enum-helper';
import { clone } from 'ramda';
import { types } from 'redux/actions/action-types';

export const decks = (state = [], action) => {
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
      deck.cards[action.data].isCurrent = true;
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
    default:
      return state;
  }
};

export const deckScore = (state = {}, action) => {
  switch(action.type) {
    case types.UPDATE_DECK_SCORE:
      let success = action.data.success;
      let total = state.total ? ++state.total : 1;
      let correct = state.correct ? state.correct : 0;
      let incorrect = state.incorrect ? state.incorrect : 0;
      return { 
          ...action.data
        , total
        , correct: success ? ++correct : correct
        , incorrect: !success ? ++incorrect : incorrect
      };
    default:
      return state;
  }
};