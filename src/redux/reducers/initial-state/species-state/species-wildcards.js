import { utils } from 'utils/utils'; 
import { getSpeciesEpithets } from 'redux/reducers/initial-state/species-state/species-epithets';
import { getSpeciesCultivars } from 'redux/reducers/initial-state/species-state/species-cultivars';

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

    const itemGroup = itemGroups[collection.currentRound - 1];        
    
    if(utils.isIterable(wildcardLayouts)) {
        itemGroup.forEach(index => {
            wildcardLayouts.forEach(layout => {
                if(layout.itemIndex === index) {
                    wildcardLayoutsForGroup.push(layout);
                }
            });
        });
    }

    return wildcardLayoutsForGroup;
};