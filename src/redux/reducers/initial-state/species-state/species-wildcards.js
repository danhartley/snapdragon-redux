import { utils } from 'utils/utils'; 
import { getSpeciesEpithets } from 'redux/reducers/initial-state/species-state/species-epithets';

export const getWildcardLayouts = (wildcards, collection, moduleSize) => {

    const epithets = getSpeciesEpithets(collection.items);

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

    if(utils.isIterable(epithets)) {
        epithets.items.forEach(item => {
            const screens = [ wildcards[0][0], wildcards[0][1] ];
            wildcardLayouts.push({ name: 'test', score: 1, screens, itemIndex: item.index, epithet: item});
        });
        
        const itemGroup = itemGroups[collection.currentRound - 1];        
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