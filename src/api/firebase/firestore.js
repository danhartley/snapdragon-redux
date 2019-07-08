import * as R from 'ramda';

import { store } from 'redux/store';
import { taxa } from 'api/snapdragon/taxa';
import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';
import { species } from 'api/species';
import { getTraits } from 'api/traits/traits';

const firebaseConfig = {
    apiKey: "AIzaSyBVLz0wVrYZ9JhJMobCFgSB-Edh6EnP0Yk",
    authDomain: "snapdragon-222014.firebaseapp.com",
    databaseURL: "https://snapdragon-222014.firebaseio.com",
    projectId: "snapdragon-222014",
    storageBucket: "snapdragon-222014.appspot.com",
    messagingSenderId: "947213844747",
    appId: "1:947213844747:web:97c1a5e664a670de"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const getCollection = () => {
    return store.getState().collection;
};

const getSpeciesFromCollection = itemName => {
    const collection = getCollection(); //call made before collection loaded into store (have to correct otherwise more calls to cloud)
    if(!collection || !collection.items) return null;
    return collection.items.find(i => i.name === itemName);
};

const getSpeciesWhere = async props => {

    const { key, operator, value } = props;
  
    const speciesRef = db.collection(`species`).where(key, operator, value);
  
    const querySnapshot = await speciesRef.get();
    
    const docs = [];
  
    querySnapshot.forEach(doc => {
      docs.push(doc.data());
    });
  
    return await docs;
};
  
const getSpecies = async props => {
    const item = await getSpeciesWhere(props);
    console.log(item);
    if(!item || item.length === 0) {
        return new Promise(resolve => resolve(species.find(s => s.name === props.value)));
    }
};

const getAllSpecies = () => {
    return species;
};

const getSpeciesNames = async () => {

    const speciesPropertiesRef = db.collection(`species`).where("collection_property", "==", 'names');

    const querySnapshot = await speciesPropertiesRef.get();
    
    const docs = [];
  
    querySnapshot.forEach(doc => {
      docs.push(doc.data());
    });
  
    return await docs;
};

const getSpeciesByIconicTaxon = (taxon, isLichen) => {

    let matches = species.filter(s => s.taxonomy).filter(s => s.taxonomy[taxon.rank].toLowerCase() === taxon.value);
    if(taxon.value === 'fungi') {
        matches = isLichen ? matches.filter(match => match.lichen) : matches.filter(match => !match.lichen);
    } 
    return matches;
};

const getSpeciesByName = async itemName => {
    const item = getSpeciesFromCollection(itemName);
    if(item) return new Promise(resolve => resolve(item));
    console.log(`item ${itemName} not found in collection, fetched from cloud`);
    return await getSpecies({ key:'name', operator:'==', value:itemName });
};

const getSpeciesByRank = (taxonName, taxonValue) => {
    return species.filter(item => item.taxonomy).filter(item => item.taxonomy[taxonName].toLowerCase() === taxonValue.toLowerCase());    
};

const getSpeciesByTaxonKey = itemTaxonomy => {

    const rank = matchTaxon(itemTaxonomy, iconicTaxa).value;

    return species.filter(item => matchTaxonKey(itemTaxonomy,[rank]).value);
};

const getSpeciesFromList = arr => {
    return species.filter(item => R.contains(item.name, arr));
};

const getUniqueFamiliesByIconicTaxon = (iconicTaxonRank, iconicTaxonValue, isLichen) => {

    const matchingItems = species.map(item => {
        if(item.taxonomy && item.taxonomy[iconicTaxonRank] && item.taxonomy[iconicTaxonRank].toLowerCase() === iconicTaxonValue.toLowerCase()) {            
            if(iconicTaxonValue === 'fungi') {
                return item.lichen === isLichen ? item : null;
            } else {
                return item;
            }
        }
    }).filter(item => item);

    const families = matchingItems.map(item => item.taxonomy.family);
    
    return [ ...new Set(families) ];
};

const getFamiliesByIconicTaxon = (iconicTaxonRank, iconicTaxonValue, isLichen) => {
    const iconicTaxonFamilies = getUniqueFamiliesByIconicTaxon(iconicTaxonRank, iconicTaxonValue, isLichen);
    const families = taxa.filter(taxon => taxon.taxon === 'family').filter(family => R.contains(family.name, iconicTaxonFamilies));
    return families;
};

const getItemTaxonByName = (item, taxonName) => {
    return taxa.find(taxon => taxon.name === item.taxonomy[taxonName.name.toLowerCase()]); 
};

const getTaxonByName = (taxonName) => {
    return taxa.find(taxon => taxon.name.toLowerCase() === taxonName.toLowerCase()); 
};

const getAsyncTraitsBySpeciesName = async (name, language) => {
    
    const languageTraits = db.collection(`traits_${language}`).where("name", "==", name);
  
    const traits = await languageTraits.get();
  
    return await traits;
};

const getTraitsBySpeciesName = async (name, language = 'en') => {

    // On page refresh, this is called again. Not good! (We already have them in local storage)

    let traits;

    const querySnapshot = await getAsyncTraitsBySpeciesName(name, language);
    // const querySnapshot = { docs: [] };
    
    if(querySnapshot.docs.length > 0) {
      querySnapshot.forEach(doc => {
        traits = doc.data();
        console.log(`Number of documents returned: ${querySnapshot.docs.length}`)
        console.log(`I got traits for ${name}!`);
      });
    } else {
        console.log('Species traits not yet available in the cloud.')
        const speciesTraits = getTraits().find(trait => trait.name === name);
        traits = speciesTraits ? speciesTraits.traits : [];
    }

    return await traits;
};

export const firestore = {
    getSpecies,
    getAllSpecies,
    getSpeciesNames,
    getSpeciesFromList,
    getSpeciesByName,
    getSpeciesByIconicTaxon,
    getSpeciesByRank,
    getSpeciesByTaxonKey,
    getFamiliesByIconicTaxon,
    getItemTaxonByName,
    getTaxonByName,
    getTraitsBySpeciesName
};