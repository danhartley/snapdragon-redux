import { store } from 'redux/store';
import { getTypedTraitsForSpecies } from 'api/traits/species-typed-traits';

export const getTraitTests = itemsInThisRound => {

    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {

        const { enums } = store.getState();

        const { question, answers, overrides } = getTraitTest(enums, item);

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

const getTraitTest = (enums, item) => {
    return getTypedTraitsForSpecies(enums, item);
};