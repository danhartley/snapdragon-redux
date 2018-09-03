import { utils } from 'utils/utils';
import { types } from 'redux/actions/action-types';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';

const flag = (msg, data) => {
    // console.log(`Counter update triggered by: ${msg}`);
    // console.log(`Action was: ${data}`)
};

export const counter = (state = null, action) => {
    switch(action.type) {
        case 'persist/REHYDRATE':
            return action.payload ? action.payload.counter : null;
        case types.CHANGE_COLLECTION:
            flag(types.CHANGE_COLLECTION, action.data.id);
            return { index: 0 };
        case types.UPDATE_CONFIG:
            flag(types.UPDATE_CONFIG, action.data.collection.id);
            return state;
        case types.NEXT_LEVEL:
            flag(types.NEXT_LEVEL, action.data);
        case types.NEXT_ROUND:
            flag(types.NEXT_ROUND, action.data);
        case types.STOP_START_LESSON:
            flag(types.STOP_START_LESSON, action.data);
            return action.data;
        case types.UPDATE_SCORE:
            flag(types.UPDATE_SCORE, action.data);
        case types.END_REVISION:
            flag(types.END_REVISION, action.data);
            let i = (state.index + 1) <= action.data.layoutCount ? (state.index + 1) : state.index;
            return { index: i };
        default:
            return state;
    }
};

export const score = (state = null, action) => {
    switch(action.type) {
        case types.UPDATE_SCORE:

            const score = { ...state, ...action.data };
            
            score.totalPoints = score.totalPoints || 0;
            score.totalPassPoints = score.totalPassPoints || 0;
            score.totalFailPoints = score.totalFailPoints || 0;

            score.totalPoints += score.points ? score.points : 0;

            score.total++;
            if(score.success) {
                score.totalPassPoints += score.points ? score.points : 0;
                score.correct++;
                score.passes.push({ itemId: score.itemId, taxon: score.taxon, binomial: score.binomial, question: score.question, answer: score.answer });
                if(score.passes.map(pass => pass.itemId).length > 0) {
                    score.passesTotals = score.passes.map(pass => pass.itemId).reduce(utils.itemCountReducer, {});
                }
            }
            else {
                score.wrong++;
                score.totalFailPoints += score.points ? score.points : 0;
                score.fails.push({ itemId: score.itemId, taxon: score.taxon, binomial: score.binomial, question: score.question, answer: score.answer });
                if(score.fails.map(fail => fail.itemId).length > 0) {
                    score.failsTotals = score.fails.map(fail => fail.itemId).reduce(utils.itemCountReducer, {});
                }
            }
            return { ...state, ...score};
        case types.CHANGE_COLLECTION:
        case types.NEXT_ROUND:
        case types.NEXT_LEVEL:
            return { ...progressState.score, ...{ fails: [], passes: []} };
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
            
            default:
            return state;
    }
};

const revision = (state = null, action) => {
    switch(action.type) {
        case types.CHANGE_COLLECTION:
            return null;
        default:
            return state;
    }
};

export const page = (state = { name: 'home'}, action) => {
    switch(action.type) {
        case types.CHANGE_PAGE:
            return action.data;
        default:
            return state;
    }
};