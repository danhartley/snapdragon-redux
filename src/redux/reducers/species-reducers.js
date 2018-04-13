
import { types } from 'redux/actions/action-types';
import { config as lessonConfig } from 'syllabus/lesson-config';
import { modules } from 'syllabus/lesson-modules';
import { InitialState } from 'redux/reducers/initial-state-for-reducers';

export const config = (state = lessonConfig, action) => {
    switch(action.type) {
        case types.RESET:
            return action.data.config;
        default: 
            return state;
    }
};

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

export const pool = (state = InitialState.pool, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export const items = (state = InitialState.items, action) => {
    switch(action.type) {
        case types.RESET:
            return action.data.items;
        case types.NEXT_SET:
            
        default:
            return state;
    }
};

export const item = (state = InitialState.item, action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return {...state, ...action.data};
        case types.RESET:
            return action.data.items[0];
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

export const history = (state = null, action) => {
    switch(action.type) {
        case types.UPDATE_HISTORY:            
            return state === null ? [action.data] : [...state, action.data];
        default:
            return state;
    }
};