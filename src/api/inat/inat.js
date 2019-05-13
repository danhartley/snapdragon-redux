import * as R from 'ramda';

import { species } from 'api/species';
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

export const getInatSpecies = config => {

    let names = species.map(item => item.name); 

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

    const getUserOrProjectIdParameter = config => {
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

    async function getInatObservations(config, page) {

        let lat = '', lng = '', placeId = '';

        const radius = config.guide.speciesRange ? parseInt(config.guide.speciesRange) : 10;
        
        switch(config.guide.locationType) {
            case 'place':
                placeId = config.guide.place.id;
                break;
            case 'longLat':
                lat = config.guide.coordinates.lat;
                lng = config.guide.coordinates.long;
                break;
        }

        const iconicTaxa = getIconicTaxa(config);
        const id = getUserOrProjectIdParameter(config);
        const url = getBasePath(config) + `&page=${page}&iconic_taxa=${iconicTaxa}${id}&place_id=${placeId}&lat=${lat}&lng=${lng}&radius=${radius}`;

        const response = await fetch(url);
        const json = await response.json();
        inatListeners.forEach(listener => listener(
            { page: json.page, numberOfRequests: Math.ceil(json.total_results/json.per_page) }
        ));
        return await json.results;
    }

    const taxonNames = [];

    const observations = getAllInatObservations(config).then(observations => {
        return observations.map(observation => {
            console.log(observation.taxon.name);
            if(R.contains(observation.taxon.name, names)) {
                const item = { ...species.find(item => item.name === observation.taxon.name) };
                return { 
                    ...item, 
                    observationCount: observation.taxon.observations_count, 
                    iconicTaxon: observation.taxon.iconic_taxon_name
                };
            } 
            taxonNames.push(observation.taxon.name);
        });
    });
    return observations;
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

    const url = `https://api.inaturalist.org/v1/${by}/autocomplete?q=${q}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}