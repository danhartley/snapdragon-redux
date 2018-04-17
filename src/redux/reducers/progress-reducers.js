import { types } from 'redux/actions/action-types';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

export const index = (state = 0, action) => {
    switch(action.type) {
        case types.UPDATE_SCORE:
            return (state + 1) <= initialState.collection.length ? (state + 1) : state;
        case types.END_REVISION:
            return (state + 1) <= initialState.collection.length ? (state + 1) : state;
        case types.CHANGE_ITEMS:
            return 0;
        case types.CHANGE_COLLECTION:
            return 0;
        default:
            return state;
    }
};

export const score = (state = initialState.score, action) => {
    switch(action.type) {
        case types.UPDATE_SCORE:

            const score = { ...state, ...action.data };
            
            score.total++;
            if(score.success) {
                score.correct++;
                score.passes.push({ taxon: score.taxon, binomial: score.binomial, question: score.question, answer: score.answer });
            }
            else {
                score.wrong++;
                score.fails.push({ taxon: score.taxon, binomial: score.binomial, question: score.question, answer: score.answer });
            }
            return { ...state, ...score};
        case types.CHANGE_ITEMS:
            return initialState.score;
        default:
            return state;
    }       
};

export const history = (state = null, action) => {
    switch(action.type) {
        case types.UPDATE_HISTORY:
          
            const score = action.data;

            const history = state === null ? [action.data] : [...state, action.data];
            
            let historyCorrect = score.correct;
            let historyTotal = score.total;
        
            if(state) {
                state.map(round => {
                    historyCorrect += round.correct;
                    historyTotal += round.total;
                });
            }

            history.correct = historyCorrect;
            history.total = historyTotal;

            return history;
            
        default:
            return state;
    }
};

export const revision = (state = null, action) => {
    switch(action.type) {
        case types.CHANGE_ITEMS:
            return null;
        default:
            return state;
    }
};