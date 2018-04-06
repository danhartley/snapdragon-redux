import { utils } from 'utils/utils';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { types } from 'redux/types/learn';
import { learnLayouts, progressLayout } from 'api/learn';
import { store } from 'redux/store';
import { api } from 'api/species';
import { renderCorrect } from 'ui/helpers/helpers-for-screens';

export const index = (state = 0, action) => {
    switch(action.type) {
        case types.MARK_ANSWER:
            return (state + 1) <= api.species.length ? (state + 1) : state;
        case types.RESET:
            return 0;
        default:
            return state;
    }
};

const initLayoutState = (layouts, number) => {
    const initLayouts = 
        utils.randomiseSelection(layouts, number)
            .map(layout => {
                layout.active = true;
                return layout;
            });

    initLayouts.push(progressLayout);

    return initLayouts;
};

export const layouts = (state = initLayoutState(learnLayouts, api.species.length), action) => {
    switch(action.type) {
        case types.RESET:
            return initLayoutState(learnLayouts, action.data.length);
        default:
            return state;
    }
};

export const layout = (state = layouts(undefined, { type: ''})[0], action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            return { ...state, ...action.data };
        case types.RESET:
            return layouts(null, action)[0];
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
        case types.MARK_ANSWER:
            const score = { ...state, ...action.data };
            score.total++;
            score.success = renderCorrect(score);
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

const initItemsState = (items) => {
    const itemsWithNames = helpers.addMultipleNames(items, 6);
    const itemsWithNamesAndImages = helpers.addMultipleImages(itemsWithNames, 9)
    const modifiedItems = itemsWithNamesAndImages.map(item => {
        item.imageIndices = utils.randomiseSelection([1,2,3,4,5,6,7,8,9,10,11,12], 12, true);
        return item;
    });
    return modifiedItems;
};

export const items = (state = initItemsState(api.species), action) => {    
    switch(action.type) {
        case types.RESET:
            return initItemsState(action.data);
        default:
            return state;
    }
};

export const item = (state = items(undefined, { type: ''})[0], action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return {...state, ...action.data};
        case types.RESET:
            return items(null, action)[0];
        default:
            return state;
    }
};

export const card = (state = null, action) => {
    switch(action.type) {
        case types.END_LESSON:
            return { ...state, ...action.data };
        case types.RESET:
            return null;
        default:
            return state;
    }
};

export const progress = (state = [], action) => {
    switch(action.type) {
        case types.RECORD_SCORE:            
            return [...state, action.data];
        default:
            return state;
    }
};