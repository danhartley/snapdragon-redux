import * as R from 'ramda';

import { store } from 'redux/store';

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
    const collection = getCollection();
    if(!collection || !collection.items) return null;
    return collection.items.find(i => i.name === itemName);
};

const getSpeciesWhere = async props => {

    try {
        const { key, operator, value, limit } = props;

        let speciesRef = limit
                        ? db.collection(`species`).where(key, operator, value).limit(limit)
                        : db.collection(`species`).where(key, operator, value);

        const querySnapshot = await speciesRef.get();

        const docs = [];

        querySnapshot.forEach(doc => {
            docs.push(doc.data());
        });

        return await docs;

    } catch(error) {
        console.error('error for ', props.value, ', error: ', error);
    }
};
  
const getSpecies = async props => {
    const item = await getSpeciesWhere(props);
    return item;
};

const getSpeciesNames = async () => {

    try {
        const speciesPropertiesRef = db.collection(`species`).where("collection_property", "==", 'names');

        const querySnapshot = await speciesPropertiesRef.get();
        
        const docs = [];
    
        querySnapshot.forEach(doc => {
        docs.push(doc.data());
        });
    
        return await docs;
    } catch(error) {
        console.error('error for species names', ', error: ', error);
    }
};

const getSpeciesByIconicTaxon = async (taxon, isLichen, limit = 6) => {

    let matches = await getSpeciesWhere({ key:'iconicTaxon', operator:'==', value: taxon.value.toLowerCase(), limit });

    if(taxon.value.toLowerCase() === 'fungi') {
        matches = isLichen ? matches.filter(match => match.lichen) : matches.filter(match => !match.lichen);
    } 
    return matches;
};

const getSpeciesByName = async itemName => {

    if(!itemName) return '';

    const item = getSpeciesFromCollection(itemName);
    
    if(item) return new Promise(resolve => resolve(item));
    
    console.log(`item ${itemName} not found in collection, fetched from cloud`);
    
    const items = await getSpecies({ key:'name', operator:'==', value:itemName });
    
    return items[0];
};

const getSpeciesFromList = arr => {
    return species.filter(item => R.contains(item.name, arr));
};

const getTaxaWhere = async props => {

    const { language, key, operator, value, limit } = props;
  
    const taxaRef = limit
                        ? db.collection(`taxa_en`).where(key, operator, value).limit(limit)
                        : db.collection(`taxa_en`).where(key, operator, value);
  
    const querySnapshot = await taxaRef.get();
  
    const docs = [];
  
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      docs.push(doc.data());
    });
  
    return await docs;
};
  
const getFamiliesByIconicTaxon = async (iconicTaxonRank, iconicTaxonValue, isLichen, config) => {
    return await getTaxaWhere({ language: config.language, key: 'iconicTaxon', operator: '==', value: iconicTaxonValue, limit: 7 });
};

const getItemTaxonByName = async (config, name) => {

    try {
                
        let taxon = {};

        const taxaRef = db.collection(`taxa_en`).where('name', '==', name);

        const querySnapshot = await taxaRef.get();
        
        if(querySnapshot.docs.length > 0) {
            querySnapshot.forEach(doc => {
                taxon = doc.data();
                console.log(`Number of documents returned: ${querySnapshot.docs.length}`)
                console.log(`I got taxon details for ${name}!`);
          });
        }

        return taxon;

    } catch (error) {
        console.error('error for: ', name, error);
    }
};

const getAsyncTraitsBySpeciesName = async (name, language) => {

    try {
    
    const languageTraits = db.collection(`traits_en`).where("name", "==", name);
  
    const traits = await languageTraits.get();
  
    return await traits;
    
    } catch(error) {
        console.error('error for ', name, ', error: ', error);
    }
};

const getTraitsBySpeciesName = async (name, language = 'en') => {

    let traits;

    const querySnapshot = await getAsyncTraitsBySpeciesName(name, language);

    if(!querySnapshot || !querySnapshot.docs) return new Promise(resolve => resolve({}));

    if(querySnapshot.docs.length > 0) {
        querySnapshot.forEach(doc => {
        traits = doc.data();
        console.log(`Number of documents returned: ${querySnapshot.docs.length}`)
        console.log(`I got traits for ${name}!`);
      });
    }

    return await traits;
};

export const firestore = {
    getSpecies,
    getSpeciesNames,
    getSpeciesFromList,
    getSpeciesByName,
    getSpeciesByIconicTaxon,
    getFamiliesByIconicTaxon,
    getItemTaxonByName,
    getTraitsBySpeciesName
};