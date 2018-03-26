import { utils } from 'utils/utils';
import { types } from 'redux/types/learn';
import { learnLayouts, progress } from 'api/learn';
import { store } from 'redux/store';
import { api } from 'api/species';

export const index = (state = 0, action) => {
    switch(action.type) {
        case types.MARK_ANSWER:
            return (state + 1) <= api.species.length ? (state + 1) : state;
        default:
            return state;
    }
};

const initialScoreState = {
    total: 0,
    correct: 0,
    wrong: 0,
    name: '',
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
            const score = { ...state, question: qAndA.question, answer : qAndA.answer };
            score.total++;
            score.success = score.answer === score.question;
            if(score.success) {
                score.correct++;
                score.passes.push(score.question);  
            }
            else {
                score.wrong++;
                score.fails.push(score.question);
            }
            return { ...state, ...score};
        default:
            return state;
    }       
};

export const item = (state = { ...api.species[0]}, action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export const items = (state = api.species, action) => {    
    switch(action.type) {
        default:
            return state;
    }
};

export const multipleChoices = (collection, number) => {
    const answersCollection = [];    
    collection.forEach(correctAnswer => {
        const answers = {};
        const wrongAnswers = collection.filter(answer => answer.id !== correctAnswer.id);
        answers.items = utils.randomiseSelection([ ...wrongAnswers, correctAnswer], number);
        answers.correctAnswer = correctAnswer;
        answersCollection.push(answers)
    });
    return answersCollection;
};

const answersCollection = multipleChoices(api.species, 6);

const initLayouts = utils.randomiseSelection(learnLayouts, api.species.length)
    .map(layout => {
        layout.active = true;
        return layout;
    });

    initLayouts.push(progress);

const initialRandomState = {
    imageIndices : utils.randomiseSelection([1,2,3,4,5,6,7,8,9,10], 10, true),
    layoutsCollection : {
        layouts: initLayouts,
        index: 0
    },
    answersCollection: answersCollection
};

export const layout = (state = initialRandomState.layoutsCollection.layouts[0], action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            return { ...state, ...action.data }
        default: 
            return state;
    }
};

export const layouts = (state = null, action) => {
    switch(action.type) {
        default:
        return learnLayouts;
    }
};

export const randomiser = (state = initialRandomState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
};
