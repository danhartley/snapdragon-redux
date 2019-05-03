import { getTraitTests } from 'snapdragon-engine/bonus/tests/trait-test';

export const getBonusTests = (collection, config) => {

    const traitTests = getTraitTests(collection);

    // Get the rest and use spread operator to add

    const bonusTests = [ ...traitTests ];

    return bonusTests;
};