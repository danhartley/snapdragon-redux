import { utils } from 'utils/utils';
import { types } from 'redux/actions/action-types';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';

export const counter = (state = null, action) => {
    switch(action.type) {
        case 'persist/REHYDRATE':
            return action.payload ? action.payload.counter : null;
        case types.CHANGE_COLLECTION:
            return { index: 0 };
        case types.UPDATE_CONFIG:
            return state;
        case types.NEXT_ROUND:
            return { index: 0 };
        case types.NEXT_LEVEL:
        case types.STOP_START_LESSON:
            return action.data;
        case types.UPDATE_SCORE:
        case types.END_REVISION:
            let i = (state.index + 1) <= action.data.layoutCount ? (state.index + 1) : state.index;
            return { index: i };
        default:
            return state;
    }
};

export const score = (state = progressState.score, action) => {
    switch(action.type) {
        case types.UPDATE_SCORE:

            const score = { ...state, ...action.data };
            
            score.passesTotals = 0;
            score.failsTotals = 0;

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
            score.questionTotal = score.passes.length + score.fails.length;
            // score.endOfRound = score.questionTotal === score.questionCount;
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

export const page = (state = { name: 'home'}, action) => {
    switch(action.type) {
        case types.CHANGE_PAGE:
            return action.data;
        default:
            return state;
    }
};