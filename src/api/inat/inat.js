import * as R from 'ramda';

import { firestore } from 'api/firebase/firestore';
import { iconicTaxa } from 'api/snapdragon/iconic-taxa';

let inatListeners = [];

const unsubscribe = listener => {
    inatListeners = inatListeners.filter(l => l !== listener);
};

export const listenToInatRequests = listener => {
    inatListeners.push(listener);
    return unsubscribe;
};

const getBasePath = config => {
    
    const month = config.guide.season.type === 'all_year' 
            ? ''
            : config.guide.season.observableMonths.map(month => month.index).join(',');

    const basePath = `https://api.inaturalist.org/v1/observations/species_counts?captive=false&rank=species&per_page=200&month=${month}`;

    return basePath;
};

export const getInatSpecies = async config => {

    const speciesNames = await firestore.getSpeciesNames();

    const names = speciesNames[0].value;

    const iconicTaxaKeys = Object.keys(iconicTaxa).join(',');

    const getIconicTaxa = config => {        
        const iconicTaxa = config.guide.iconicTaxa.map(taxon => taxon.id) || iconicTaxaKeys;

        // Create new taxonic group for reptilia, etc?

        if(iconicTaxa.find(taxon => taxon === 'mammalia')) {
            iconicTaxa.push('reptilia');
        }

        const taxa = iconicTaxa.map(taxon => {
            if(taxon === 'lepidoptera') taxon = 'insecta';            
            return taxon;
        });
        return taxa;
    };

    const getUserOrProjectKeyValuePair = config => {
        if(!config.guide.inatId) return '';
        const param = config.guide.inatId.param;    
        const id = config.guide.inatId.id;
        const parameter = `&${param}=${id}`;
        return id ? parameter : '';
    };

    async function getAllInatObservations(config) {
        let records = [];
        let keepGoing = true;
        let page = 1;
        while (keepGoing) {
            let response = await getInatObservations(config, page);
            await records.push.apply(records, response);
            page = page + 1;
            if (response.length < 200) {
                keepGoing = false;
                return records;
            }
        }
    }

    const loadSpeciesInParallel = async observations => {
        try {
            return Promise.all(observations.map(observation => {
                return firestore.getSpeciesByName(observation.taxon.name).then(async item => {
                    return await {                         
                        ...item, 
                        observationCount: observation.taxon.observations_count, 
                        iconicTaxon: observation.taxon.iconic_taxon_name
                    };
                })                    
            }));

        } catch (error) {
            console.error(error);
        }
    };

    async function getInatObservations(config, page) {

        let lat = '', lng = '', placeId = '';

        let radius = config.guide.speciesRange ? parseInt(config.guide.speciesRange) : 10;
        let inat = '';
        
        switch(config.guide.locationType) {
            case 'place':
                placeId = config.guide.place.id;
                break;
            case 'longLat':
                lat = config.guide.coordinates.lat;
                lng = config.guide.coordinates.long;
                break;
            case 'inat':
                lat = '';
                lng = '';
                placeId = '';
                radius = '';
                inat = `&${config.guide.inatId.param}=${config.guide.inatId.key}`;
                break;
        }

        const iconicTaxa = getIconicTaxa(config);
        const params = config.guide.guideTpe === 'INAT' ? getUserOrProjectKeyValuePair(config) : '';
        const url = getBasePath(config) + `&page=${page}&iconic_taxa=${iconicTaxa}&place_id=${placeId}&lat=${lat}&lng=${lng}&radius=${radius}${inat}${params}`;

        const response = await fetch(url);
        const json = await response.json();
        inatListeners.forEach(listener => listener(
            { page: json.page, numberOfRequests: Math.ceil(json.total_results/json.per_page) }
        ));
        return await json.results;
    }

    let observations = await getAllInatObservations(config);
        observations = observations.filter(observation => R.contains(observation.taxon.name, names));
        console.log('inat: observations:', observations);

    return await loadSpeciesInParallel(observations);
}

export async function getInatPlaceId(place) {
    
    const url = `https://api.inaturalist.org/v1/places/autocomplete?q=${place}`;
    const response = await fetch(url);
    const json  = await response.json();
    return json;
}

export async function getInatTaxonStats(item, config, placeId) {

    const place = placeId || 'any';
    const taxonName = item.name;
    const url = `https://api.inaturalist.org/v1/observations/species_counts?&verifiable=true&taxon_name=${taxonName}&place_id=${place}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function getHistogram(item, placeId) {

    const place = placeId || 'any';
    const taxonName = item.name;
    const url = `https://api.inaturalist.org/v1/observations/histogram?taxon_name=${taxonName}&place_id=${place}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function getAutocompleteBy(q, by) {

    // currently set up for USERS and PROJECTS but PLACES? Not sure
    // https://api.inaturalist.org/v1/places/autocomplete?q=O%20Parque%20Natural%20da%20Arr%C3%A1bida

    const url = `https://api.inaturalist.org/v1/${by}/autocomplete?q=${q}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

// https://www.inaturalist.org/observations/danielhartley.json?m1=1&m2=11&iconic_taxa[]=Fungi