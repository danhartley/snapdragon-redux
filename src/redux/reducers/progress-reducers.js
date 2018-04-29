import { types } from 'redux/actions/action-types';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

export const index = (state = null, action) => {
    const collectionSize = initialState.collection.items.length;
    switch(action.type) {
        case types.CHANGE_COLLECTION:
        case types.UPDATE_CONFIG:
            return null;
        case types.NEXT_LESSON:
        case types.NEXT_ROUND:
        case types.NEXT_LEVEL:
            return 0;
        case types.UPDATE_SCORE:
            return (state + 1) <= collectionSize ? (state + 1) : state;
        case types.END_REVISION:
            return (state + 1) <= collectionSize ? (state + 1) : state;
        default:
            return state;
    }
};

export const score = (state = null, action) => {
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
        case types.CHANGE_COLLECTION:
        case types.NEXT_ROUND:
        case types.NEXT_LEVEL:
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
        case types.CHANGE_COLLECTION:
            return null;
        default:
            return state;
    }
};