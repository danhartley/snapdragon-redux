import * as R from 'ramda';

import { firestore } from 'api/firebase/firestore';

const getItemLayouts = async itemQuestions => {
    if(!itemQuestions.questionIds) return new Promise(resolve => resolve(null));
    return Promise.all(itemQuestions.questionIds.map(async id => await firestore.getQuestionById(id, itemQuestions.name)));
};

const getLayouts = async (collection, roundItemNames) => {
    
    const species = collection.species.filter(sp => R.contains(sp.name, roundItemNames));
    const speciesQuestions = species.filter(sp => sp.questions);

    if(speciesQuestions.length > 0) {
        return Promise.all(speciesQuestions.map(sq => sq.questions));
    }

    const itemsQuestions = collection.items.filter(i => R.contains(i.name, roundItemNames)).map(i => { return { name: i.name, questionIds: i.questionIds }});
    
    if(itemsQuestions) {
        const promises = itemsQuestions.map(async (itemQuestions) => {
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