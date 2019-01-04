import * as R from 'ramda';

import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { getInatSpecies } from 'api/inat/inat';
import { collections } from 'snapdragon/eol-collections';
import { getLocation } from 'geo/geo';
import { speciesStateHelper } from 'redux/reducers/initial-state/initial-species-state';

async function getItems(collection, config) {
    if(collection.id === 1) {
        const collectionIsUnchanged = 
            collection.items && collection.items.length > 0 && collection.items[0].collectionId === collection.id && 
            collection.speciesRange === config.speciesRange &&
            collection.iconicTaxa === config.iconicTaxa;
        if(collectionIsUnchanged) {
            return new Promise(resolve => {
                resolve(collection.items);
            });
        } else {
            const coordinates = await getLocation(config);                        
            const latitude = coordinates['0'] || coordinates.lat;
            const longitude = coordinates['1'] || coordinates.long;
            return getInatSpecies(latitude, longitude, config).then(species => {
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
        collection.items = utils.shuffleArray(await getItems(collection, config));

        if(R.contains('lepidoptera', config.iconicTaxa) && !R.contains('insecta', config.iconicTaxa)) {
            const insecta = collection.items.filter(i => i.taxonomy.class.toLowerCase() === 'insecta');
            const lepidoptera = insecta.filter(i => i.taxonomy.order.toLowerCase() === 'lepidoptera');
            const noninsecta = collection.items.filter(i => i.taxonomy.class.toLowerCase() !== 'insecta');
            collection.items = [ ...lepidoptera, ...noninsecta ];
        }

        collection.items.filter(item => item).forEach((item,index)=>{
            item.snapIndex = index + 1;
            item.collectionId =  collection.id;
        });

        collection = speciesStateHelper.extendCollection(collection);
        collection.speciesRange = config.speciesRange;
        collection.iconicTaxa = config.iconicTaxa;

        actions.boundChangeCollection({ config, collection });
    }

    if(collection.items) {
        callback();
    }    
}

export const extendCollection = (config, collection) => {
    const extendedCollection = speciesStateHelper.extendCollection(collection);
    actions.boundChangeCollection({ config, collection: extendedCollection });
};