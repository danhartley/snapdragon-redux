import * as R from 'ramda';

import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { actions } from 'redux/actions/action-creators';
import { getInatSpecies } from 'api/inat/inat';
import { getPlace } from 'geo/geo';
import { firestore } from 'api/firebase/firestore';
import { enums } from 'ui/helpers/enum-helper';

async function getItems(collection, config) {

    if(collection.behaviour === 'dynamic') {

        const collectionIsUnchanged = 
            collection.items && collection.items.length > 0 && collection.items[0].collectionId === collection.id && 
            collection.speciesRange === config.guide.speciesRange &&
            collection.iconicTaxa === config.guide.iconicTaxa;

        if(collectionIsUnchanged) {
            return new Promise(resolve => {
                resolve(collection.items);
            });

        } else {

            if(config.guide.locationType === 'longLat' && !config.guide.coordinates) {
                
                const place = await getPlace(config, true);

                config.guide.coordinates = {
                    long: place.query[0],
                    lat: place.query[1]
                };

                actions.boundUpdateConfig(config);

                return await getInatSpecies(config);
            }
            else {
                return await getInatSpecies(config);
            }            
        }
    }
    else if(collection.behaviour === 'static') {

        // const items = firestore.getSpeciesFromList(collection.itemNames);

        const loadSpeciesInParallel = async itemNames => {
            try {
                return Promise.all(itemNames.map(name => {                    
                    return firestore.getSpeciesByName(name).then(async item => {
                        return await {                         
                            ...item
                        }
                    })                    
                }));
    
            } catch (error) {
                console.log(`${item} problem!!! For ${name}`)
                console.error(error);
            }
        };

        return loadSpeciesInParallel(collection.itemNames);

        // return new Promise(resolve => {
        //     resolve(items);
        // });
    }
};

export const keepItems = collection => {

    return new Promise(resolve => {
        resolve(collection.items);
    });
}

export const collectionHandler = async (collections, collection, config, counter, callback, callbackWhenNoResults) => {
    
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

            if(collection.behaviour === 'dynamic') {
                collection.name = config.guide.place.name;
                collection.speciesRange = config.guide.speciesRange;
                collection.iconicTaxa = config.guide.iconicTaxa;
            }

            collection.items = collection.items.filter(i => i);
            collection.items = utils.sortBy(collection.items.filter(item => item), 'observationCount', 'desc');

            collection.items.forEach(async(item,index) => {

                item.snapIndex = index + 1;
                item.id = item.eolId;// remove later
                
                item.vernacularNames = itemProperties.getVernacularNames(item, config);
                item.vernacularName = itemProperties.getVernacularName(item, config);   
                                
                const names = item.name.split(' ');

                item.taxonomy.genus = names[0];                
                item.taxonomy.species = names[1];
                
                item.name = names.slice(0,2).join(' ');

                item.family = firestore.getItemTaxonByName(item, enums.taxon.FAMILY) || { names: [ item.taxonomy.family ]};
                item.order = firestore.getItemTaxonByName(item, enums.taxon.ORDER);

                // add iconic taxon
            });

            const loadTraitsInParallel = items => {
                return Promise.all(
                    items.map(async(item) => {
                        const itemTraits = await firestore.getTraitsBySpeciesName(item.name);
                        item.traits = itemTraits || [];
                        return item;                 
                    })
                );
            };

            const items = await loadTraitsInParallel(collection.items); // force wait till ready

            collection.itemIndex = 0;

            collection.glossary = [ ...collection.iconicTaxa, 'common'];
            collection.default = false;

            actions.boundNewCollection({ config, collection });
            
            callback(collection, config)();

        } else {
            console.log('** Hitting callbackWhenNoResults() **');
            collection.items = [];
            callbackWhenNoResults();
        }
    }
};