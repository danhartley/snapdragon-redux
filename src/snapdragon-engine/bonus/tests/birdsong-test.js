import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { getTraits } from 'api/traits/traits';

export const getBirdsongTests = itemsInThisRound => {

    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {
        
        if(item.taxonomy.class && item.taxonomy.class.toLowerCase() !== 'aves') return [];

        const { question, answers, overrides } = getBirdsongTest(item); // or (all) species?

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

const getBirdsongTest = item => {

    const { enums } = store.getState();

    const traits = getTraits(enums);
    const bird = traits.find(trait => trait.name === item.name);

    if(!bird) return {};

    const birdsong = bird.traits.find(trait => trait.name === 'song');
    
    let birds = R.take(3, traits.filter(trait => trait.name !== item.name));
        birds.push(bird);

    const birdNames = utils.shuffleArray(birds.map(bird => bird.name));

    const question = bird.name;
    const answers = birdNames;
    const overrides = { question: 'Match the birdsong', vernacularName: 'Common name', binomial: 'Latin name', className: 'sub-header-tall', trait: birdsong };

    return { question, answers, overrides };
};