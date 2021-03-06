import { clone } from 'ramda';

import { types } from 'redux/actions/action-types';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';

export const counter = (state = null, action) => {
    switch(action.type) {
        case 'persist/REHYDRATE':
            return action.payload ? { ...action.payload.counter, isLessonRehydrated: true, isLessonPaused: true } : state;
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
            const index = (state && state.index) || 0;
            return { ...action.data, index };
        case types.UPDATE_SCORE:
        case types.END_REVISION:
            let i = (state.index + 1) <= action.data.layoutCount ? (state.index + 1) : state.index;
            return { index: i };
        case types.SAVE_USER_PROGRESS:
            return { ...state, ...action.data.lesson.counter, isLessonPaused: !!action.data.lesson.counter.isCustomLessonPausedOverride, userAction: action.data.userAction };
        default:
            return state;
    }
};

export const score = (state = progressState.score, action) => {
    switch(action.type) {
        case types.UPDATE_SCORE: {
        
            const score = { ...state, ...action.data, statement: action.data.statement || '' };

            score.totalPoints = score.totalPoints || 0;
            score.totalPassPoints = score.totalPassPoints || 0;
            score.totalFailPoints = score.totalFailPoints || 0;

            score.totalPoints += score.points ? score.points : 0;

            score.total++;
            if(score.success) {
                score.totalPassPoints += score.points ? score.points : 0;
                score.correct++;
                score.passes.push({ 
                    itemId: score.itemId, 
                    taxon: score.taxon, 
                    binomial: score.binomial, 
                    question: score.question, 
                    statement: score.statement || '',
                    answer: score.answer,
                    answers: score.answers,
                    index: score.total - 1,
                    success: score.success,
                    questionText: score.questionText
                });
            }
            else {
                score.incorrect++;
                score.totalFailPoints += score.points ? score.points : 0;
                score.fails.push({ 
                    itemId: score.itemId, 
                    taxon: score.taxon, 
                    binomial: score.binomial, 
                    question: score.question,
                    statement: score.statement || '', 
                    answer: score.answer,
                    answers: score.answers,
                    index: score.total - 1,
                    success: score.success,
                    questionText: score.questionText
                });
            }
            score.questionTotal = score.passes.length + score.fails.length;
            
            score.passesTotals = clone(state.passesTotals) || {};
            score.failsTotals = clone(state.failsTotals) || {};

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
            return clone(progressState.score);
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
        case types.SAVE_USER_PROGRESS:
            return action.data.lesson.score;
        case types.NEXT_LESSON: {
            return { ...state, mode: 'learn'};
            }
        default:
            return state;
    }       
};

export const history = (state = {
  total: 0,
  correct: 0,
  scores: [
    {
      total: 0,
      correct: 0
    }
  ]
}, action) => {
    switch(action.type) {
        case types.UPDATE_HISTORY: {
          
            const history = { ...state };

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
        // case types.SELECT_COLLECTION:
        //     return state;   
        case types.SAVE_USER_PROGRESS:
            return action.data.lesson.history || state;
        default:
            return state;
    }
};

export const videoPlayer = (state = null, action) => {
    switch(action.type) {
        case types.UPDATE_VIDEO_PLAYER:
            return action.data;
        default:
            return state;
    }
};