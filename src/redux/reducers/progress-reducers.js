import { types } from 'redux/actions/action-types';
import { InitialState } from 'redux/reducers/initial-state-for-reducers';
import { modules } from 'syllabus/lesson-modules';

export const index = (state = 0, action) => {
    switch(action.type) {
        case types.UPDATE_SCORE:
            return (state + 1) <= modules.pool.length ? (state + 1) : state;
        case types.END_REVISION:
            return (state + 1) <= modules.pool.length ? (state + 1) : state;
        case types.RESET:
            return 0;
        default:
            return state;
    }
};

export const score = (state = InitialState.score, action) => {
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
        case types.RESET:
            return {
                total: 0,
                correct: 0,
                binomial: '',
                wrong: 0,
                answer: '',
                question: '',
                fails: [],
                passes: [],
                success: false
            };
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
        case types.RESET:
            return null;
        default:
            return state;
    }
};