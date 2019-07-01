import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { firestore } from 'api/firebase/firestore';

export const getLookalikeTests = itemsInThisRound => {

    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {

        const { question, answers, overrides } = getLookalikeTest(item);

        if(!question) return {};

        return {
            item,
            question,
            answers,
            overrides
        }
    });

    return tests;
}

const getLookalikeTest = item => {

    const { config } = store.getState();

    if(!item.traits || item.traits.length === 0) return;

    const lookaliketraits = item.traits.find(trait => trait.name === 'look-alikes');

    if(lookaliketraits.length === 0) return;

    let lookalikes = lookaliketraits.values;

    if(lookalikes.length === 0) return {};

    lookalikes = firestore.getSpeciesFromList(lookalikes);
    lookalikes.push(item);

    if(lookalikes.length < 2) return {}; 

    const question = itemProperties.getVernacularName(item, config);
    const answers = lookalikes.map(item => itemProperties.getVernacularName(item, config));

    return { question, answers, overrides : { question: 'Avoid look-alikes', help: '(Pick one correct image)', binomial: 'Latin name', vernacularName: 'Common name', trait: { name: 'look-alikes', lookalikes } } };
};
