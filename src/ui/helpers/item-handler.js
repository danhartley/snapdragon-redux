import * as R from 'ramda';

import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { actions } from 'redux/actions/action-creators';
import { getInatSpecies } from 'api/inat/inat';
import { snapdragonCollections as collections } from 'snapdragon/snapdragon-collections';
import { getLocation } from 'geo/geo';

async function getItems(collection, config) {
    if(collection.providerId === 1) {
        const collectionIsUnchanged = 
            collection.items && collection.items.length > 0 && collection.items[0].collectionId === collection.id && 
            collection.speciesRange === config.speciesRange &&
            collection.iconicTaxa === config.guide.iconicTaxa.map(taxon => taxon.id);
        if(collectionIsUnchanged) {
            return new Promise(resolve => {
                resolve(collection.items);
            });
        } else {
            const coordinates = await getLocation(config);                        
            const latitude = coordinates['0'] || coordinates.lat;
            const longitude = coordinates['1'] || coordinates.long;
            const inatConfig = {latitude, longitude};
            inatConfig.locationType = config.guide.locationType;
            return getInatSpecies(inatConfig, config).then(species => { // take the first only (ignore close matches)
                const items = new Set(species.filter(item => item));
                return [ ...items ];
            });
        }
    }
    else {
        const itemNames = collections.find(c => c.id === collection.id).items.map(item => item.name);
        const items = collection.itemNames.map(name => { 
            if(R.contains(name, itemNames)) {
                return collections.find(c => c.id === collection.id).items.find(item => item.name === name);
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

export async function itemHandler(collection, config, counter, callback, noRecords) {
    
    if(counter.isLessonPaused) {
        collection.items = await keepItems(collection);
        callback(collection, config)();
    } else {         
        collection.items = utils.shuffleArray(await getItems(collection, config));

        if(R.contains('lepidoptera', config.guide.iconicTaxa.map(taxon => taxon.id)) && !R.contains('insecta', config.guide.iconicTaxa.map(taxon => taxon.id))) {
            const insecta = collection.items.filter(i => i.taxonomy.class.toLowerCase() === 'insecta');
            const lepidoptera = insecta.filter(i => i.taxonomy.order.toLowerCase() === 'lepidoptera');
            const noninsecta = collection.items.filter(i => i.taxonomy.class.toLowerCase() !== 'insecta');
            collection.items = [ ...lepidoptera, ...noninsecta ];
        }

        if(collection.items) {

            collection.name = config.guide.place.name;
            collection.items = collection.items.filter(i => i);

            collection.items.filter(item => item).forEach((item,index)=>{
                item.snapIndex = index + 1;
                item.collectionId =  collection.id;
            });

            collection.items.forEach(item => {
                
                item.vernacularNames = itemProperties.getVernacularNames(item, config);
                item.vernacularName = itemProperties.getVernacularName(item, config);   

                const names = item.name.split(' ');
                item.genus = names[0];
                item.species = names[1];
                item.name = names.slice(0,2).join(' ');
            })

            collection.speciesRange = config.speciesRange;
            collection.iconicTaxa = config.guide.iconicTaxa;

            collection.speciesNames = collection.items.map(item => item.name);
            collection.speciesVernacularNames = itemProperties.vernacularNamesForItems(collection.items, config);

            collection.itemIndex = 0;
            collection.currentRound = 1;

            actions.boundNewCollection({ config, collection });
            callback(collection, config)();
        } else {
            console.log('** Hitting noRecords() **');
            collection.items = [];
            noRecords();
        }
    }
};