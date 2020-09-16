import { types } from 'redux/actions/action-types';


const cleanAndReturnIncomingState = state => {
    const quickFire = state;
    if(quickFire.onClickFiltersLinkListeners) delete quickFire.onClickFiltersLinkListeners;
    if(quickFire.onClickGlossaryLinkListeners) delete quickFire.onClickGlossaryLinkListeners;
    return quickFire;
};

export const quickFire = (state = {
  termScore: {
    total: 0,
    correct: 0
  }
}
, action) => {
    switch(action.type) {
        case types.CREATE_QUICKFIRE:
            return cleanAndReturnIncomingState(action.data);
        case types.UPDATE_QUICKFIRE:
            return cleanAndReturnIncomingState(action.data);
        default:
            return state;
    }
};

export const quickFireHistory = (state = {
  total: 0,
  correct: 0,
}, action) => {
  switch(action.type) {
    // case types.CREATE_QUICKFIRE:
    case types.UPDATE_QUICKFIRE:
      return {
       total: state.total + 1,
       correct: action.data.termScore.isCorrect ? state.correct + 1 : state.correct 
      };
      default:
        return state;
  }
};

export const glossary = (state = null, action) => {
    switch(action.type) {
        case types.CREATE_GLOSSARY:
            return action.data;
        default:
            return state;
    }
}