import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { getSpeciesEpithets } from 'redux/reducers/initial-state/species-state/species-epithets';
import { getSpeciesCultivars } from 'redux/reducers/initial-state/species-state/species-cultivars';
import { syndromes } from 'api/snapdragon/syndromes';
import { definitions } from 'api/snapdragon/glossary';

export const getWildcardLayouts = (wildcards, collection, moduleSize) => {

    // e.g. [0,1,2,3,4,5,6], [7,8,9,10,11,12]

    let itemGroups = [];
    let group = [];
    collection.items.forEach((item, index) => {
        group.push(index);
        if((index + 1) % moduleSize === 0) {
            itemGroups.push(group);
            group = [];
        }
    });

    const wildcardLayouts = [];
    const wildcardLayoutsForGroup = [];

    const epithets = getSpeciesEpithets(collection.items);

    if(utils.isIterable(epithets.items)) {
        epithets.items.forEach(item => {
            const screens = [ wildcards[0][0], wildcards[0][1] ];
            wildcardLayouts.push({ name: 'screen-epithet-meaning', type: 'test', score: 1, screens, itemIndex: item.index, epithet: item});
        });
    }

    const cultivars = getSpeciesCultivars(collection.items);

    if(utils.isIterable(cultivars)) {
        cultivars.forEach(item => {
            let screens = [ wildcards[1][0], wildcards[1][1] ];
            wildcardLayouts.push({ name: 'screen-cultivar-card', type: 'revision', score: 0, screens, itemIndex: item.index, cultivars: item.cultivars});
            screens = [ wildcards[1][0], wildcards[1][2] ];
            wildcardLayouts.push({ name: 'screen-cultivars-species', type: 'test', score: 1, screens, itemIndex: item.index, cultivars: item.cultivars});
        });
    }

    const names = [ 'Apis mellifera' ];

    const insects = collection.items.map( (item, i) => {
        if(R.contains(item.name, names)) {
            return {
                item: item,
                traits: R.flatten(syndromes.traits.map(trait => {
                    const t = trait.keys.filter(key => key.key === 'bee');
                    return { trait: trait.name, value: t[0].value, description: t[0].description || '' };
                })),
                index: i
            };
        }
    }).filter(c => c);

    if(utils.isIterable(insects)) {
        insects.forEach(item => {
            let screens = [ wildcards[2][0], wildcards[2][1] ];
            wildcardLayouts.push({ name: 'screen-traits-card', type: 'revision', score: 0, screens, itemIndex: item.index, insects});
            screens = [ wildcards[2][0], wildcards[2][2] ];
            wildcardLayouts.push({ name: 'screen-traits', type: 'test', score: 1, screens, itemIndex: item.index, insects});
        });
    }

    const itemGroup = itemGroups[collection.currentRound - 1];          
    const words = utils.shuffleArray(definitions);
    
    if(utils.isIterable(wildcardLayouts)) {
        itemGroup.forEach(index => {
            wildcardLayouts.forEach(layout => {
                if(layout.itemIndex === index) {
                    wildcardLayoutsForGroup.push(layout);
                }
            });
            const definitionLayout = { name: 'screen-definitions', type: 'test', score: 1, screens: [wildcards[3][0], wildcards[3][1]], itemIndex: index, definition: words.pop() };
            wildcardLayoutsForGroup.push(definitionLayout);
        });
    }

    return wildcardLayoutsForGroup;
};