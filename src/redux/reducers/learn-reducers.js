import * as R from 'ramda';

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
            return initialScoreState;
        default:
            return state;
    }       
};

export const card = (state = null, action) => {
    switch(action.type) {
        case types.END_LESSON:
            return { ...state, ...action.data };
            default:
                return state;
    }
};

const multiChoicedSpecies = helpers.generateAndAddMultipleChoices(api.species, 6);
const collection = helpers.generateAndAddMultipleTiles(multiChoicedSpecies, 9);

export const item = (state = { ...collection[0]}, action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return { ...state, ...action.data };
        case types.RESET:
            return helpers.generateAndAddMultipleTiles(helpers.generateAndAddMultipleChoices(action.data, 6), 9)[0];
        default:
            return state;
    }
};

export const items = (state = api.species, action) => {    
    switch(action.type) {
        case types.RESET:
            return helpers.generateAndAddMultipleTiles(helpers.generateAndAddMultipleChoices(action.data, 6), 9);
        default:
            return state;
    }
};

// const answersCollection = helpers.generateMultipleChoices(api.species, 6);
// const imageAnswersCollection = api.species.map(element => {
//     const images = utils.randomiseSelection(api.species, 6).map(sp => sp.images[0]);    
//     images.push(element.images[0]);
//     images.push(element.images[1]);
//     images.push(element.images[2]);
//     return images;
// });

const initLayouts = utils.randomiseSelection(learnLayouts, api.species.length)
    .map(layout => {
        layout.active = true;
        return layout;
});

initLayouts.push(progress);

const initialRandomState = {
    imageIndices : utils.randomiseSelection([1,2,3,4,5,6,7,8,9,10,11,12], 12, true)
};

export const layout = (state = initLayouts[0], action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            return { ...state, ...action.data }
        default: 
            return state;
    }
};

export const layouts = (state = initLayouts, action) => {
    switch(action.type) {
        default:
        return initLayouts;
    }
};

export const randomiser = (state = initialRandomState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
};

export const history = (state = [], action) => {
    switch(action.type) {
        case types.RECORD_SCORE:            
            return { ...state, ...action.data };
        default:
            return state;
    }
};