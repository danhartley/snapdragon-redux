import { take, flatten } from 'ramda';

import { syndromes } from 'api/snapdragon/syndromes';

export const getPollinatorTest = (collection, config) => {

    // See trait-tests for how to use this

    const getTraits = (traits) => {
        const _traits = [];
        traits.forEach(trait => {
            const _trait = collection.items.map( (item, i) => {                
                return {
                    traits: flatten(syndromes.traits.map(trait => {
                        const t = trait.keys.find(key => key.key === trait);
                        return { trait: trait.name, value: t.value, description: t.description || '' };
                    })),
                    index: i
                };                
            }).filter(c => c);
            _traits.push(_trait[0].traits);
        });
    
        const options = _traits.map(trait => trait.map(t => {
            return `${t.trait}: ${t.value}`;
        }));
    
        return options.map(option => option.join('; '));
    }
    
    const number = config.isPortraitMode ? 2 : 2;
    
    const pollinators = take(number, utils.shuffleArray(['beetle', 'bird', 'butterfly', 'fly', 'moth', 'wind']));
    
    const traits = getTraits(pollinators);
    const question = getTraits(['bee'])[0];
    
    const answers = utils.shuffleArray([question, ...traits]);

    return answers;
};