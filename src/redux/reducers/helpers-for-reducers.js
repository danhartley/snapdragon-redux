import { utils } from 'utils/utils'; 

const generateMultipleChoices = (collection, number) => {
    const answersCollection = [];    
    collection.forEach(correctAnswer => {
        const answers = {};
        const others = collection.filter(answer => answer.id !== correctAnswer.id);
        answers.items = utils.randomiseSelection([ ...others, correctAnswer ], number);
        answers.question = correctAnswer;
        answersCollection.push(answers);
    });
    return answersCollection;
};

const notItem = (item, collection) => {    
    return collection.filter(other => other.id !== item.id);
};

const addMultipleNames = (collection, number) => {    
    return collection.map(item => {
        const others = 
            notItem(item, collection)
                .filter((other, index) => index + 1 < number)
                .map(other => {
                    const {id, name, names} = other;
                    return {id, name, names};
                });
        const { id, name, names } = item;
        item.multipleNames = utils.randomiseSelection([ ...others, { id, name, names } ], number );
        return item;
    });
};

const addMultipleImages = (collection, number) => {    
    return collection.map(item => {
        const others = 
            notItem(item, collection)
                .filter((other, index) => index + 1 < number)
                .map(other => {
                    const {name, images} = other;
                    return {name, images};
                });
        const { name, images } = item;
        item.multipleImages = utils.randomiseSelection([ ...others, { name, images } ], number );
        return item;
    });
};

const spliceArrays = (items, itemNames) => {
    const collection = [];
    items.map(item => {
        itemNames.map(itemName => {
            if(itemName === item.name) {
                collection.push(item);
            }
        });
    });
    return collection;
};

export const helpers = {
    generateMultipleChoices,
    notItem,
    addMultipleNames,
    addMultipleImages,
    spliceArrays
};