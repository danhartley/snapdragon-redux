import * as R from 'ramda';

import { taxa } from 'api/snapdragon/taxa';
import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';
import { species } from 'api/species';
import { enums } from 'ui/helpers/enum-helper';

// var db = firebase.firestore();

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

export const firestore = {
    getSpecies,
    getSpeciesFromList,
    getSpeciesByName,
    getSpeciesByIconicTaxon,
    getSpeciesByRank,
    getSpeciesByTaxonKey,
    getFamiliesByIconicTaxon,
    getItemTaxonByName,
    getTaxonByName
};