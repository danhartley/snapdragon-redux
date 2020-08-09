import { clone } from 'ramda';
import { types } from 'redux/actions/action-types';

export const decks = (state = {}, action) => {
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