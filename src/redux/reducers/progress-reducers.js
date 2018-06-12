import { types } from 'redux/actions/action-types';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

let fromLocalStorage = false;

export const index = (state = null, action) => {
    const collectionSize = initialState.collection.items.length;
    switch(action.type) {
        case 'persist/REHYDRATE':
            fromLocalStorage = true;
            return action.payload ? action.payload.index : null;
        case types.CHANGE_COLLECTION:
            return null;
        case types.UPDATE_CONFIG:
            return state;
        case types.NEXT_LESSON:
        case types.NEXT_ROUND:
        case types.NEXT_LEVEL:
            if(fromLocalStorage) {
                fromLocalStorage = false;
                return state || 0;
            }            
            else {                
                return 0;
            }
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
            return { ...initialState.score, ...{ fails: [], passes: []} };
        default:
            return state;
    }       
};

export const history = (state = null, action) => {
    switch(action.type) {
        case types.UPDATE_HISTORY:
          
            const score = action.data;

            const history = { scores: [] };

            history.scores = state === null 
                ? [action.data] 
                : state.scores[state.scores.length-1].question === action.data.question
                    ? [...state.scores]
                    : [...state.scores, action.data];

            let historyCorrect = 0;
            let historyTotal = 0;
        
            history.scores.map(score => {
                historyCorrect += score.correct;
                historyTotal += score.total;
            });

            history.correct = historyCorrect;
            history.total = historyTotal;

            return history;
            
            case types.CHANGE_COLLECTION:
                return null;
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