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

            console.log('collectionIsUnchanged state: ', collectionIsUnchanged);

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

                // actions.boundUpdateConfig(config);

                return await getInatSpecies(config);
            }
            else {
                return await getInatSpecies(config);
            }            
        }
    }
    else if(collection.behaviour === 'static') {

        return firestore.getSpeciesInParallel(collection.species);
    }
};

export const keepItems = collection => {

    return new Promise(resolve => {
        resolve(collection.items);
    });
}

export const collectionHandler = async (collection, config, counter, callback, callbackWhenNoResults) => {
    
    console.log('collectionHandler; counter lesson is paused state: ', counter.isLessonPaused);

    if(counter.isLessonPaused) {
        collection.items = await keepItems(collection);
    }

    console.log('collectionHandler; collection items: ', collection.items);

    if(counter.isLessonPaused && collection.items && collection.items.length > 0) {
        collection.items = await keepItems(collection);
        callback(collection, config)();
    } else {
           
        const items = await getItems(collection, config);
        collection.items = items.filter(item => item.name);

        if(collection.nextItem) return; // after refreshing or returning to the page (using rehydrated collection)

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

            const families = [ ...new Set(collection.items.map(i => i.taxonomy.family)) ];
            const orders = [ ...new Set(collection.items.map(i => i.taxonomy.order)) ];

            const familyTaxa = [], orderTaxa = [];

            let taxa = await firestore.getTaxaNames();
                taxa = taxa[0].value;

            const getFamilyTaxa = async families => {
                return Promise.all(
                    families.map(async(family) => {
                        const familyTaxon = await firestore.getTaxonByName(config, family);
                        familyTaxa.push(familyTaxon);
                        return familyTaxon;
                    })
                );
            };

            await getFamilyTaxa(families);

            const getOrderTaxa = async orders => {
                return Promise.all(
                    orders.map(async(order) => {
                        const orderTaxon = await firestore.getTaxonByName(config, order);
                        orderTaxa.push(orderTaxon);
                        return orderTaxon;
                    })
                );
            };

            await getOrderTaxa(orders);

            const getFamilyNames = item => {
                if(item.family && item.family.names) {
                    return item.family.names[0].names ? item.family.names[0].names : item.family.names;
                } else {
                    return '';
                }
            }

            collection.items.forEach( async (item,index) => {

                const names = item.name.split(' ');

                item.taxonomy.genus = names[0];                
                item.taxonomy.species = names[1];

                item.family = familyTaxa.find(family => family.name === item.taxonomy[enums.taxon.FAMILY.name.toLowerCase()]);
                if(item.family) {
                    item.family.names = getFamilyNames(item);
                    item.family.vernacularName = item.family.names[0];
                }
                
                item.order = orderTaxa.find(order => order.name === item.taxonomy[enums.taxon.ORDER.name.toLowerCase()]);

                item.snapIndex = index + 1;
                item.id = item.eolId;

                item.vernacularNames = itemProperties.getVernacularNames(item, config);
                item.vernacularName = itemProperties.getVernacularName(item, config);                                
                
                item.name = names.slice(0,2).join(' ');

                if(R.contains(item.taxonomy.genus, taxa)) {
                    item.genus = await firestore.getTaxonByName({language: 'en'}, item.taxonomy.genus);
                    if(item.genus) {
                        item.genus.traits = await firestore.getTraitsBySpeciesName(item.taxonomy.genus);
                    }
                }

            });

            const loadTraitsInParallel = items => {
                return Promise.all(
                    items.map(async(item) => {
                        const itemTraits = await firestore.getTraitsBySpeciesName(item.name);
                        item.traits = itemTraits || {};
                        return item;                 
                    })
                );
            };

            await loadTraitsInParallel(collection.items);

            collection.itemIndex = 0;

            collection.glossary = [ ...collection.glossary, 'common'];
            collection.default = false;

            actions.boundNewCollection({ config, collection });
            
            try {
                callback(collection, config)();
            } catch (e) {
                console.log(e.message);
            }

        } else {
            console.log('Calling callbackWhenNoResults().');
            collection.items = [];
            callbackWhenNoResults();
        }
    }
};