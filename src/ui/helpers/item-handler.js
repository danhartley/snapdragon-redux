import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { getInatSpecies } from 'api/inat/inat';
import { collections } from 'snapdragon/eol-collections';
import { getLocation } from 'geo/geo';

import { speciesStateHelper } from 'redux/reducers/initial-state/initial-species-state';

async function getItems(collection, config) {
    if(collection.id === 8) {
        if(collection.items && collection.items[0].collectionId === collection.id) {
            return new Promise(resolve => {
                resolve(collection.items);
            });
        } else {
            const coordinates = await getLocation(config);                        
            const latitude = coordinates['0'] || coordinates.lat;
            const longitude = coordinates['1'] || coordinates.long;
            return getInatSpecies(latitude, longitude).then(species => {
                const items = new Set(species.filter(item => item));
                return [ ...items ];
            });
        }
    }
    else {
        const itemNames = collections[collection.index].items.map(item => item.name);
        const items = collection.itemNames.map(name => { 
            if(R.contains(name, itemNames)) {
                return collections[collection.index].items.find(item => item.name === name);
            }
        });
        
        return new Promise(resolve => {
            resolve(items);
        });
    }
};

export const keepItems = collection => {
    return new Promise(resolve => {
        resolve(collection.items);
    });
}

export async function itemHandler(collection, config, counter, callback) {
    
    if(counter.isLessonPaused) {
        collection.items = await keepItems(collection);
    } else {    
        collection.items = await getItems(collection, config);

        collection.items.filter(item => item).forEach((item,index)=>{
            item.snapIndex = index + 1;
            item.collectionId =  collection.id;
        });

        collection = speciesStateHelper.extendCollection(collection);

        actions.boundChangeCollection({ config, collection });
    }

    if(collection.items) {
        callback();
    }    
}