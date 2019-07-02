import * as R from 'ramda';

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

const getSpecies = () => {
    return species;
};

const getSpeciesByIconicTaxon = (taxon, isLichen) => {

    let matches = species.filter(s => s.taxonomy).filter(s => s.taxonomy[taxon.rank].toLowerCase() === taxon.value);
    if(taxon.value === 'fungi') {
        matches = isLichen ? matches.filter(match => match.lichen) : matches.filter(match => !match.lichen);
    } 
    return matches;
};

const getSpeciesByName = name => {
    return species.find(sp => sp.name === name);
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

// const getTraitsBySpeciesName = name => {
//     return getTraits().find(trait => trait.name === name);
// };

const getTraitsBySpeciesName = async (name, language = 'en') => {

    let traits;

    const querySnapshot = await getAsyncTraitsBySpeciesName(name, language);
    
    if(querySnapshot.docs.length > 0) {
      querySnapshot.forEach(doc => {
        traits = doc.data();
      });
    } else {
        // traits = Promise(resolve => {
        //     resolve(getTraits().find(trait => trait.name === name));
        // });
        traits = getTraits().find(trait => trait.name === name);
    }

    return await traits;
};

export const firestore = {
    getSpecies,
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