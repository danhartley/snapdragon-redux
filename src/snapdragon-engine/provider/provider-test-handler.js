import * as R from 'ramda';

import { firestore } from 'api/firebase/firestore';

const getItemLayouts = async itemQuestions => {
    if(!itemQuestions.questionIds) return new Promise(resolve => resolve(null));
    return Promise.all(itemQuestions.questionIds.map(async id => await firestore.getQuestionById(id, itemQuestions.name)));
};

const getLayouts = async (collection, roundItemNames) => {
    
    const itemsQuestions = collection.items.filter(i => R.contains(i.name, roundItemNames)).map(i => { return { name: i.name, questionIds: i.questionIds }});
    
    if (itemsQuestions) {
        const promises = itemsQuestions.map(async (itemQuestions) => {
            console.log(itemsQuestions);
            if(itemQuestions.questionIds) return await getItemLayouts(itemQuestions);
        });
        return await Promise.all(promises);
    } else {
        return new Promise(resolve => resolve(null));
    }
}

export const providerHandler = {
    getLayouts
};