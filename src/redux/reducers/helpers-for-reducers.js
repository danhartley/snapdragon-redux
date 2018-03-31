import * as R from 'ramda';

import { utils } from 'utils/utils'; 

const generateMultipleChoices = (collection, number) => {
    const answersCollection = [];    
    collection.forEach(correctAnswer => {
        const answers = {};
        const wrongAnswers = collection.filter(answer => answer.id !== correctAnswer.id);
        answers.items = utils.randomiseSelection([ ...wrongAnswers, correctAnswer ], number);
        answers.question = correctAnswer;
        answersCollection.push(answers);
    });
    return answersCollection;
};

const generateAndAddMultipleChoices = (collection, number) => {
    return collection.map(item => {
        const wrongAnswers = R.take(number - 1, collection
            .filter(answer => answer.id !== item.id)
            .map(answer => {
                const {name,names} = answer;
                return {name,names};
            }));
        const { name, names } = item;
        item.multipleChoices = utils.randomiseSelection([ ...wrongAnswers, { name, names } ], number );
        return item;
    });
};

const generateAndAddMultipleTiles = (collection, number) => {
    return collection.map(item => {
        const wrongAnswers = R.take(number - 1, collection
            .filter(answer => answer.id !== item.id)
            .map(answer => {
                const {name,images} = answer;
                return {name,images};
            }));
        const { name, images } = item;
        item.multipleTiles = utils.randomiseSelection([ ...wrongAnswers, { name, images } ], number );
        return item;
    });
};

export const helpers = {
    generateMultipleChoices,
    generateAndAddMultipleChoices,
    generateAndAddMultipleTiles
};