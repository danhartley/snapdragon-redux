import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { firestore } from 'api/firebase/firestore';

export const getLookalikeTests = async itemsInThisRound => {

    const init = async () => {

        if(itemsInThisRound === undefined) return new Promise(resolve => resolve([]));

        return Promise.all(itemsInThisRound.map(async item => {
            
            const { question, answers, overrides } = await getLookalikeTest(item);

            if(!question) return new Promise(resolve => resolve({}));

            return {
                item,
                question,
                answers,
                overrides
            }
        }));
    }

    const tests = await init();

    return tests;
}

const getLookalikeTest = item => {

    const init = async () => {

        const { config } = store.getState();

        if(!item.traits || Object.keys(item.traits).length === 0) return {};

        const lookaliketraits = item.traits['lookalikes'];

        if(!lookaliketraits) return {};

        let lookalikes = lookaliketraits.map(trait => trait.lookalike.name);

        if(lookalikes.length === 0) return {};

        const getLookalikes = async () => {
            return Promise.all(lookalikes.map(async name => {
                return await firestore.getSpeciesByName(name);
            })
        )};
        
        lookalikes = await getLookalikes();
        lookalikes = lookalikes.filter(lookalike => lookalike);

        if(lookalikes.length < 2) return {}; 

        const question = item.name;
        const answers = [ question, ...lookalikes.map(item => item.name) ];
        // const question = item.vernacularName;
        // const answers = [ question, ...lookalikes.map(item => itemProperties.getVernacularName(item, config)) ];

        return { question, answers, overrides : { question: 'Avoid look-alikes', help: '(Pick one correct image)', binomial: 'Latin name', vernacularName: 'Common name', trait: { name: 'lookalikes', lookalikes } } };
    };

    return init();
};
