import { types } from 'redux/actions/action-types';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

export const counter = (state = null, action) => {
    const collectionSize = initialState.collection.items.length;
    switch(action.type) {
        case 'persist/REHYDRATE':
            return action.payload ? action.payload.counter : null;
        case types.CHANGE_COLLECTION:
            return { index: 0, state: 'active' };
        case types.UPDATE_CONFIG:
            return state;
        case types.NEXT_LEVEL:
        case types.NEXT_ROUND:
            return action.data;
        case types.UPDATE_SCORE:
            let i = (state.index + 1) <= collectionSize ? (state.index + 1) : state.index;
            return { index: i, state: 'active' };
        case types.END_REVISION:
            i = (state.index + 1) <= collectionSize ? (state.index + 1) : state.index;
            return { index: i, state: 'active' };
        case types.TOGGLE_LESSON:
            return { ...state, ...action.data };
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
          
            const history = { scores: [] };

            history.scores = state === null 
                ? [action.data] 
                : state.scores[state.scores.length-1].question === action.data.question
                    ? [...state.scores]
                    : [...state.scores, action.data];

            let historyCorrect = 0;
            let historyTotal = 0;
        
            history.scores.forEach(score => {
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