import * as R from 'ramda';

import { utils } from 'utils/utils';

export const getBirdsongTests = itemsInThisRound => {

    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {
        
        if(item.taxonomy.class && item.taxonomy.class.toLowerCase() !== 'aves') return [];

        if(!question) return {};

        const { question, answers, overrides } = getBirdsongTest(item, itemsInThisRound);

        return {
            item,
            question,
            answers,
            overrides
        }
    });

    return tests;
}

const getBirdsongTest = (item, itemsInThisRound) => {

    if(!item.traits || item.traits.length === 0) return;

    const birdsong = item.traits.find(trait => trait.name === 'song');
    
    let birds = R.take(3, itemsInThisRound.filter(bird => bird.name !== item.name));
        birds.push(item);

    const birdNames = utils.shuffleArray(birds.map(bird => bird.name));

    const question = item.name;
    const answers = birdNames;
    const overrides = { question: 'Match the birdsong', vernacularName: 'Common name', binomial: 'Latin name', className: 'sub-header-tall', trait: birdsong };

    return { question, answers, overrides };
};