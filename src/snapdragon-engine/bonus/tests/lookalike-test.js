import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { firestore } from 'api/firebase/firestore';

export const getLookalikeTests = async itemsInThisRound => {

    const init = async () => {

        // const loadSpeciesInParallel = async itemNames => {
        //     try {
        //         return Promise.all(itemNames.map(name => {                    
        //             return firestore.getSpeciesByName(name).then(async item => {
        //                 return await {                         
        //                     ...item
        //                 }
        //             })                    
        //         }));
    
        //     } catch (error) {
        //         console.log(`${item} problem!!! For ${name}`)
        //         console.error(error);
        //     }
        // };
 
        if(itemsInThisRound === undefined) return new Promise(resolve => resolve([]));

        return Promise.all(itemsInThisRound.map(async item => {
            
            const { question, answers, overrides } = await getLookalikeTest(item);

            console.log('overrides: ', overrides);

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

    console.log('tests: ', tests);

    return tests;
}

const getLookalikeTest = item => {

    const init = async () => {

        const { config } = store.getState();

        if(!item.traits || Object.keys(item.traits).length === 0) return {};

        const lookaliketraits = item.traits['look-alikes'];

        if(!lookaliketraits) return {};

        let lookalikes = lookaliketraits.value;

        if(lookalikes.length === 0) return {};

        // should return place holder for these lookalikes
        // which can be looked up at runtime.
        // if not, the promise is passed as far as lesson-builder

        const getLookalikes = async () => {
            return Promise.all(lookalikes.map(async name => {
                return await firestore.getSpeciesByName(name);
            })
        )};
        
        lookalikes = await getLookalikes();

        if(lookalikes.length < 2) return {}; 

        const question = item.name;
        const answers = [ question, ...lookalikes.map(item => item.name) ];
        // const question = item.vernacularName;
        // const answers = [ question, ...lookalikes.map(item => itemProperties.getVernacularName(item, config)) ];

        console.log('answers: ', answers);

        return { question, answers, overrides : { question: 'Avoid look-alikes', help: '(Pick one correct image)', binomial: 'Latin name', vernacularName: 'Common name', trait: { name: 'look-alikes', lookalikes } } };
    };

    return init();
};
