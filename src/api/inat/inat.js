import * as R from 'ramda';

import { species } from 'api/species';
import { iconicTaxa } from 'api/snapdragon/iconic-taxa';

const getBasePath = config => {
    
    const month = config.observableMonths.map(month => month.index).join(',');

    // quality_grade=research&

    const basePath = `https://api.inaturalist.org/v1/observations/species_counts?page=1&captive=false&rank=species&per_page=200&month=${month}`;

    return basePath;
};

export const getInatSpecies = (inatConfig, config) => {

    const names = species.map(item => item.name); 

    const iconicTaxaKeys = Object.keys(iconicTaxa).join(',');

    const getIconicTaxa = config => {        
        const iconicTaxa = config.guide.iconicTaxa.map(taxon => taxon.id) || iconicTaxaKeys;
        const taxa = iconicTaxa.map(taxon => {
            if(taxon === 'lepidoptera') taxon = 'insecta';
            return taxon;
        });
        return taxa;
    };

    async function getInatLongLatObservations(latitude, longitude, config) {
        const lat = latitude || `38.7155762`;
        const lng = longitude || `-9.163009899999999`;
        const iconicTaxa = getIconicTaxa(config);
        const radius = config.speciesRange || 10;
        const userId = config.guide.inatId ? config.guide.inatId.key : '';
        const url = getBasePath(config) + `&iconic_taxa=${iconicTaxa}&user_id=${userId}&lat=${lat}&lng=${lng}&radius=${radius}`;
        const response = await fetch(url);
        const json = await response.json();
        return await json.results;
    }

    async function getInatPlaceObservations(config) {

        const iconicTaxa = getIconicTaxa(config);
        const placeId = config.guide.place.id;   
        const userId = config.guide.inatId ? config.guide.inatId.key : '';
        const url = getBasePath(config) + `&iconic_taxa=${iconicTaxa}&user_id=${userId}&place_id=${placeId}`;
        const response = await fetch(url);
        const json = await response.json();
        return await json.results;
    }

    async function getInatUserObservations(config) {

        const iconicTaxa = getIconicTaxa(config);
        const userId = config.userId;
        const url = getBasePath(config) + `&user_id=${userId}&iconic_taxa=${iconicTaxa}&place_id=any`;
        const response = await fetch(url);
        const json = await response.json();
        return await json.results;
    }

    const latitude = inatConfig.latitude;
    const longitude = inatConfig.longitude;

    let observations;

    const taxonNames = [];

    if(inatConfig.locationType === 'user') {
        observations = getInatUserObservations(config).then(observations => {
            return observations.map(observation => {
                if(R.contains(observation.taxon.name, names)) {
                    const item = { ...species.find(item => item.name === observation.taxon.name) };
                    return { ...item, observationCount: observation.taxon.observations_count, iconicTaxon: observation.taxon.iconic_taxon_name };
                } 
                taxonNames.push(observation.taxon.name);
            });
        });
        return observations;
    }
    else if(inatConfig.locationType === 'place') {
        observations = getInatPlaceObservations(config).then(observations => {
            return observations.map(observation => {
                if(R.contains(observation.taxon.name, names)) {
                    const item = { ...species.find(item => item.name === observation.taxon.name) };
                    return { ...item, observationCount: observation.taxon.observations_count, iconicTaxon: observation.taxon.iconic_taxon_name };
                } 
                taxonNames.push(observation.taxon.name);
            });
        });
        return observations;
    } else if(inatConfig.locationType === 'longLat') {
        observations = getInatLongLatObservations(latitude, longitude, config).then(observations => {
            return observations.map(observation => {
                if(R.contains(observation.taxon.name, names)) {
                    const item = { ...species.find(item => item.name === observation.taxon.name) };
                    return { ...item, observationCount: observation.taxon.observations_count, iconicTaxon: observation.taxon.iconic_taxon_name };
                }
            });
        });
        return observations;
    }
}

export async function getInatPlaceId(place) {
    
    const url = `https://api.inaturalist.org/v1/places/autocomplete?q=${place}`;
    const response = await fetch(url);
    const json  = await response.json();
    return json;
}

export async function getInatTaxonStats(item, config, placeId) {

    const verifiable = true;
    const place = placeId || 'any';
    const taxonName = item.name;
    const url = getBasePath(config) + `&verifiable=${verifiable}&taxon_name=${taxonName}&place_id=${place}&rank=species`;
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