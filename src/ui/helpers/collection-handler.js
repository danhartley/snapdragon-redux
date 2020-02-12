import * as R from 'ramda';

import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { getInatSpecies } from 'api/inat/inat';
import { getPlace } from 'geo/geo';
import { firestore } from 'api/firebase/firestore';
import { enums } from 'ui/helpers/enum-helper';

async function getItems(collection, config) {

    if(collection.behaviour === 'dynamic') {

        const collectionIsUnchanged = 
            collection.items && collection.items.length > 0 && collection.items[0].collectionId === collection.id && 
            collection.speciesRange === config.guide.speciesRange;

        if(collectionIsUnchanged) {
            return new Promise(resolve => {
                resolve(collection.items);
            });

        } else {

            if(config.guide.guideType === 'LOCATION') {
                
                const place = await getPlace(config, true);

                config.guide.coordinates = {
                    long: place.query[0],
                    lat: place.query[1]
                };

                return await getInatSpecies(config);
            }
            else { // INAT
                const inatSpecies = await getInatSpecies(config);
                console.log('inatSpecies: ', inatSpecies);
                return inatSpecies;
            }            
        }
    }
    else if(collection.behaviour === 'static') { // names only available at this point e.g. 'PICKER';
        return getSnapdragonSpeciesData(collection.species);
    }
};

const loadCollection = async (collection, config) => {
    
    try {

        if(collection.items && collection.items.length > 0 && !config.guide.hasChanged) return collection;

        config.collection = { id: collection.id };

            const items = await getItems(collection, config);
            collection.items = items.filter(item => item.name);

            if(collection.nextItem) return; // after refreshing or returning to the page (using rehydrated collection)

            if(R.contains('lepidoptera', collection.iconicTaxa.map(taxon => taxon.id)) && !R.contains('insecta', collection.iconicTaxa.map(taxon => taxon.id))) {
                const insecta = collection.items.filter(i => i.taxonomy.class.toLowerCase() === 'insecta');
                const lepidoptera = insecta.filter(i => i.taxonomy.order.toLowerCase() === 'lepidoptera');
                const noninsecta = collection.items.filter(i => i.taxonomy.class.toLowerCase() !== 'insecta');
                collection.items = [ ...lepidoptera, ...noninsecta ];
            }

            if(collection.behaviour === 'dynamic') {                    
                collection.speciesRange = config.guide.speciesRange;
            }

            let itemReadyCollection;

            if(collection.items) {

                itemReadyCollection = await loadCollectionItemProperties(collection, config);
                
                try {
                    console.log('itemReadyCollection: ', itemReadyCollection);
                    return itemReadyCollection;
                } catch (e) {
                    console.log(e.message);
                }

            } else {
                console.log('Calling callbackWhenNoResults().');
                return collection;
            }
    } catch (e) {
        console.log('Error for collectionHandler: ', e.message);
    }
};

const loadCollectionItemProperties = async (collection, config) => {

    collection.items = collection.items.filter(i => i);
    collection.items = utils.sortBy(collection.items.filter(item => item), 'observationCount', 'desc');
    const families = [...new Set(collection.items.map(i => i.taxonomy.family))];
    const orders = [...new Set(collection.items.map(i => i.taxonomy.order))];
    const genera = [...new Set(collection.items.map(i => i.taxonomy.genus).filter(g => g))];
    let familyTaxa = [], orderTaxa = [], genusTaxa = [];
    let taxa = await firestore.getTaxaNames();
    taxa = taxa[0].value;
    const getGenusTaxa = async (genera) => {
        return Promise.all(genera.map(async (genus) => {
            const genusTaxon = await firestore.getTaxonByName(config, genus);
            if(Object.entries(genusTaxon).length > 0 && genusTaxon.constructor === Object)
                genusTaxa.push(genusTaxon);
            return genusTaxa;
        }));
    };
    await getGenusTaxa(genera);
    const getFamilyTaxa = async (families) => {
        return Promise.all(families.map(async (family) => {
            const familyTaxon = await firestore.getTaxonByName(config, family);
            if(Object.entries(familyTaxon).length > 0 && familyTaxon.constructor === Object)
                familyTaxa.push(familyTaxon);
            return familyTaxa;
        }));
    };
    await getFamilyTaxa(families);
    const getOrderTaxa = async (orders) => {
        return Promise.all(orders.map(async (order) => {
            const orderTaxon = await firestore.getTaxonByName(config, order);
            if(Object.entries(orderTaxon).length > 0 && orderTaxon.constructor === Object)
                orderTaxa.push(orderTaxon);
            return orderTaxa;
        }));
    };
    await getOrderTaxa(orders);
    const getFamilyNames = item => {
        if (item.family && item.family.names) {
            return item.family.names[0].names ? item.family.names[0].names : item.family.names;
        }
        else {
            return '';
        }
    };

    const findRank = (taxa, item, rank) => {
        const taxonRank = item.taxonomy[rank.name.toLowerCase()];
        const taxon = taxa.length > 0 ? taxa.find(taxon => taxon.name === taxonRank) : null;
        return taxon || '';
    };

    collection.items.forEach(async (item, index) => {
        const names = item.name.split(' ');
        item.taxonomy.genus = names[0];
        item.taxonomy.species = names[1];
        item.genus = findRank(genusTaxa, item, enums.taxon.GENUS);
        item.family = findRank(familyTaxa, item, enums.taxon.FAMILY);
        if (item.family) {
            item.family.names = getFamilyNames(item);
            item.family.vernacularName = item.family.names[0];
        }
        item.order = findRank(orderTaxa, item, enums.taxon.ORDER);
        item.snapIndex = index + 1;
        item.id = item.eolId;
        item.vernacularNames = itemProperties.getVernacularNames(item, config);
        item.vernacularName = itemProperties.getVernacularName(item, config);
        item.name = names.slice(0, 2).join(' ');
        item.questionIds = item.questionIds || [];
    });
    const loadTraitsInParallel = items => {
        return Promise.all(items.map(async (item) => {
            const itemTraits = await firestore.getTraitsBySpeciesName(item.name);
            item.traits = itemTraits || {};
            return item;
        }));
    };
    await loadTraitsInParallel(collection.items);
    collection.itemIndex = 0;
    collection.glossary = [...Array.from(new Set(collection.items.map(item => item.iconicTaxon))), 'common'];
    return collection;
};

export const getSnapdragonSpeciesData = species => {
    return firestore.getSpeciesInParallel(species);
}

export const collectionHandler = {
    loadCollection,
    loadCollectionItemProperties
}

