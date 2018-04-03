import { utils } from 'utils/utils';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { types } from 'redux/types/learn';
import { learnLayouts, progress } from 'api/learn';
import { store } from 'redux/store';
import { api } from 'api/species';

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

    initLayouts.push(progress);

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
    name: '',
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
            const qAndA = action.data;
            const score = { ...state, taxon: qAndA.taxon, name: qAndA.name, question: qAndA.question, answer : qAndA.answer };
            score.total++;
            score.success = score.answer === score.question;
            if(score.success) {
                score.correct++;
                score.passes.push({ taxon: score.taxon, name: score.name, question: score.question, answer: score.answer });
            }
            else {
                score.wrong++;
                score.fails.push({ taxon: score.taxon, name: score.name, question: score.question, answer: score.answer });
            }
            return { ...state, ...score};
        case types.RESET:
            return {
                total: 0,
                correct: 0,
                name: '',
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
            //return initItemsState( helpers.spliceArrays(api.species, action.data.map(item => item.name)) );
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

export const history = (state = [], action) => {
    switch(action.type) {
        case types.RECORD_SCORE:            
            return { ...state, ...action.data };
        case types.RESET:
            return [];
        default:
            return state;
    }
};