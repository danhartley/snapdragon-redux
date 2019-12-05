import * as R from 'ramda';

import { utils } from 'utils/utils';

export const getBirdsongTests = (itemsInThisRound, collection) => {

    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {
        
        if(item.taxonomy.class && item.taxonomy.class.toLowerCase() !== 'aves') return [];
        
        const { question, answers, overrides } = getBirdsongTest(item, itemsInThisRound, collection);

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

const getBirdsongTest = (item, itemsInThisRound, collection) => {

    if(!item.traits || Object.keys(item.traits).length === 0) return;

    const name = 'song';
    const birdsong = { name, ...item.traits[name] };
    
    // require other birds, which may not be in this collection…

    let birds = R.take(3, collection.items.filter(bird => bird.name.toLowerCase() !== item.name.toLowerCase()));
        birds.push(item);

    const birdNames = utils.shuffleArray(birds.map(bird => bird.name));

    const question = item.name;
    const answers = birdNames;
    const overrides = { question: 'Match the birdsong', vernacularName: 'Common name', binomial: 'Latin name', trait: birdsong };

    return { question, answers, overrides };
};