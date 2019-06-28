import * as R from 'ramda';

import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';
import { species } from 'api/species';

var db = firebase.firestore();

const getUniqueFamiliesByIconicTaxon = (iconicTaxonRank, iconicTaxonValue, isLichen) => {

    const matchingItems = species.map(item => {
        if(item.taxonomy && item.taxonomy[iconicTaxonRank] && item.taxonomy[iconicTaxonRank].toLowerCase() === iconicTaxonValue.toLowerCase()) {            
            if(iconicTaxonValue === 'fungi') {
                return item.lichen === isLichen ? item : null;
            }
        }
    }).filter(item => item);
    const families = getTaxa(matchingItems, 'family').map(item => item.family);
    return [ ...new Set(families) ];
};

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
    switch(taxonName) {
        case 'kingdom':
            return species.filter(item => item.taxonomy).filter(item => item.taxonomy.kingdom.toLowerCase() === taxonValue.toLowerCase());
    }
};

const getSpeciesByTaxonKey = itemTaxonomy => {

    const rank = matchTaxon(itemTaxonomy, iconicTaxa).value;

    return species.filter(item => matchTaxonKey(itemTaxonomy,[rank]).value);
};

const getSpeciesFromList = arr => {
    return species.filter(item => R.contains(item.name, arr));
};

export const firestore = {
    getSpecies,
    getSpeciesFromList,
    getSpeciesByName,
    getSpeciesByIconicTaxon,
    getSpeciesByRank,
    getSpeciesByTaxonKey,
    getUniqueFamiliesByIconicTaxon,
};