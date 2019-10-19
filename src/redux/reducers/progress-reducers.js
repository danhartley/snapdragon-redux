import * as R from 'ramda';

import { types } from 'redux/actions/action-types';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';
import { enums } from 'ui/helpers/enum-helper';

export const counter = (state = null, action) => {
    switch(action.type) {
        case 'persist/REHYDRATE':
            return action.payload ? { ...action.payload.counter, isLessonRehydrated: true } : state;
        case types.RESET_COLLECTION:
            return { ...state, isLessonSelected: false, isLessonPaused: false };
        case types.UPDATE_COLLECTION:    
            return { ...state, isLessonRehydrated: false };
        case types.NEXT_ROUND:
            return { index: 0 };
        case types.NEXT_LESSON:
            return { index: 0 };
        case types.NEXT_LEVEL:
            return { ...state, index: action.data.index };
        case types.STOP_START_LESSON:
            // const _counter = action.data;
            // const isLessonPaused = (!!_counter && !!_counter.log);
            return { ...action.data };
        case types.UPDATE_SCORE:
        case types.END_REVISION:
            let i = (state.index + 1) <= action.data.layoutCount ? (state.index + 1) : state.index;
            return { index: i };
        case types.PAUSE_LESSON: {
            return { };
        }
        case types.RESTART_LESSON: {
            return action.data.counter;   
        }
        default:
            return state;
    }
};

export const score = (state = R.clone(progressState.score), action) => {
    switch(action.type) {
        case types.UPDATE_SCORE: {
        
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
            }
            else {
                score.incorrect++;
                score.totalFailPoints += score.points ? score.points : 0;
                score.fails.push({ itemId: score.itemId, taxon: score.taxon, binomial: score.binomial, question: score.question, answer: score.answer });
            }
            score.questionTotal = score.passes.length + score.fails.length;
            
            score.passesTotals = R.clone(state.passesTotals) || {};
            score.failsTotals = R.clone(state.failsTotals) || {};

            if(score.success) {
                score.passesTotals[score.itemId] = score.passesTotals[score.itemId] ? score.passesTotals[score.itemId] + 1 : 1;
                if(!score.failsTotals[score.itemId]) {
                    score.failsTotals[score.itemId] = 0;
                }
            } else {
                score.failsTotals[score.itemId] = score.failsTotals[score.itemId] ? score.failsTotals[score.itemId] + 1 : 1;
                if(!score.passesTotals[score.itemId]) {
                    score.passesTotals[score.itemId] = 0;
                }
            }
            
            return { ...state, ...score};
        }
        case types.SELECT_COLLECTION:
            return R.clone(progressState.score);
        case types.NEXT_ROUND:
        case types.NEXT_LEVEL:
        case types.UPDATE_COLLECTION:
            return { ...progressState.score, ...{ fails: [], passes: []} };
        case types.UPDATE_TRAIT_SCORE: {
            const bonusScores = state.bonusScores || [];
            bonusScores.push(
                {
                    id: action.data.itemId,
                    name: action.data.binomial,
                    success: action.data.success,
                    guid: action.data.guid
                }
            );
            return { ...state, bonusScores: bonusScores };
        }
        case types.PAUSE_LESSON: {
            return R.clone(progressState.score);
        }
        case types.RESTART_LESSON: {
            return action.data.score;   
        }
        default:
            return state;
    }       
};

export const history = (state = null, action) => {
    switch(action.type) {
        case types.UPDATE_HISTORY: {
          
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
            history.incorrect = history.total - history.correct;

            return history;
        }
        case types.SELECT_COLLECTION:
            return null;   
        case types.PAUSE_LESSON: {
            return null;
        }
        case types.RESTART_LESSON: {
            return action.data.history;   
        }
        default:
            return state;
    }
};

export const videoPlayer = (state = [], action) => {
    switch(action.type) {
        case types.UPDATE_VIDEO_PLAYER:
            return [ ...state, ...action.data ];
        default:
            return state;
    }
};