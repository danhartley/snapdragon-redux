import { store } from 'redux/store';
import { getTraitsForTests } from 'api/traits/traits-for-tests';

export const getTraitTests = itemsInThisRound => {

    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {

        const { units } = store.getState();

        const { question, answers, overrides } = getTraitsForTests(units, item);

        if(!question) return {};

        return {
            item,
            question,
            answers,
            overrides
        }
    });

    return tests;
};