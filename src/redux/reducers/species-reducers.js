import { utils } from 'utils/utils';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { types } from 'redux/actions/action-types';
import { store } from 'redux/store';
import { config } from 'syllabus/lesson-config';
import { modules } from 'syllabus/lesson-modules';
import { renderCorrect } from 'ui/helpers/helpers-for-screens';

export const lesson = (state = config, action) => {
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data;
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

const initialScoreState = {
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

export const score = (state = initialScoreState, action) => {
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

const initialLessonState = modules.prepareLesson(config.moduleSize);

const initialiseItemsState = (state = initialLessonState) => {
    const itemsWithNames = helpers.addMultipleNames(state.pool, state.items, 6);
    const itemsWithNamesAndImages = helpers.addMultipleImages(state.pool, itemsWithNames, 9)
    const modifiedItems = itemsWithNamesAndImages.map(item => {
        item.imageIndices = utils.randomiseSelection([1,2,3,4,5,6,7,8,9,10,11,12], 12, true);
        return item;
    });
    modifiedItems.poolCount = state.pool.length;
    return modifiedItems;
};

const initialItemsState = initialiseItemsState();
const initialItemState = initialItemsState[0];

export const items = (state = initialItemsState, action) => {
    switch(action.type) {
        case types.RESET:
            return action.data;
        case types.NEXT_SET:
            
        default:
            return state;
    }
};

export const item = (state = initialItemState, action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return {...state, ...action.data};
        case types.RESET:
            return action.data[0];
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