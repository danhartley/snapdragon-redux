import { utils } from 'utils/utils';
import { types } from 'redux/types/learn';
import { learnStrategies } from 'api/learn';
import { store } from 'redux/store';
import { api } from 'api/species';

const initialScoreState = {
    total: 0,
    correct: 0,
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

export const item = (state = null, action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return { ...state, ...action.data };
        case types.NEW_SCREEN:
            return { ...state, ...action.data.item }
        default:
            return state;
    }
};

export const items = (state = api.species, action) => {    
    switch(action.type) {
        case 'LOAD_INAT_DATA':
        case 'LOAD_EOL_DATA':
        if(action.data)
            return [...action.data];
        default:
            return state;
    }
};

const answersCollection = [];
const numberOfAlternateAnswers = (api.species.length > 5 ? 5 : api.species.length);
api.species.forEach(correctAnswer => {
    const answers = {};
    const alternateAnswers = api.species.filter(s => {
        return s.id !== correctAnswer.id
    });
    answers.species = utils.randomiseSelection(alternateAnswers, numberOfAlternateAnswers);
    answers.species.push(correctAnswer);
    answers.id = correctAnswer.id;
    answersCollection.push(answers);
});

const initStrategies = utils.randomiseSelection(learnStrategies, api.species.length)
    .map(strategy => {
        strategy.active = true;
        return strategy;
    });

const initialRandomState = {
    imageIndices : utils.randomiseSelection([1,2,3,4,5,6,7,8,9,10], 10, true),
    strategiesCollection : {
        strategies: initStrategies,
        index: 0
    },
    answersCollection: answersCollection
};

export const strategy = (state = initialRandomState.strategiesCollection.strategies[0], action) => { 
    switch(action.type) {
        case types.NEW_SCREEN:
            return { ...state, ...action.data.strategy }
        default: 
            return state;
    }
};

export const strategies = (state = null, action) => {
    switch(action.type) {
        default:
        return learnStrategies;
    }
};

export const randomiser = (state = initialRandomState, action) => {
    switch(action.type) {
        case types.NEW_SCREEN:
        case 'RANDOMISER':
        const strategiesCollection = { strategiesCollection: { ...state.strategiesCollection, ...action.data.randomiser} };
            return { ...state, ...strategiesCollection };
        default: 
            return state;
    }
};
