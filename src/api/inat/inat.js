import * as R from 'ramda';

import { species } from 'api/species';
import { iconicTaxa } from 'api/snapdragon/iconic-taxa';

export const getInatSpecies = (inatConfig, config) => {
  
    const names = species.map(item => item.name);

    const daysAway = (when, days) => {
        let dateFromDays = new Date();
        const direction = when === 'future' ? 1 : -1;
        dateFromDays.setDate(dateFromDays.getDate() + direction * days);
        return dateFromDays;
    };

    const iconicTaxaKeys = Object.keys(iconicTaxa).join(',');

    const getIconicTaxa = config => {        
        const iconicTaxa = config.guide.iconicTaxa.map(taxon => taxon.id) || iconicTaxaKeys;
        const taxa = iconicTaxa.map(taxon => {
            if(taxon === 'lepidoptera') taxon = 'insecta';
            return taxon;
        });
        return taxa;
    };

    async function getInatObservations(latitude, longitude, config) {
        console.log('getInatObservations with radius');
        const lat = latitude || `38.7155762`;
        const lng = longitude || `-9.163009899999999`;
        const iconicTaxa = getIconicTaxa(config);
        const perPage = 200;
        const radius = config.speciesRange || 10;
        const start = daysAway('past', 30);
        const end = daysAway('future', 30);
        const endpoint = 'observations/species_counts';
        const url = `https://api.inaturalist.org/v1/${endpoint}?page=1&captive=false&hrank=species&iconic_taxa=${iconicTaxa}&rank=species&m1=11&m2=1&photos=true&place_id=any&quality_grade=research&lat=${lat}&lng=${lng}&radius=${radius}&user_id=&per_page=${perPage}`;
        const response = await fetch(url);
        const json = await response.json();
        return await json.results;
    }

    async function getInatPlaceObservations(config) {
        console.log('getInatPlaceObservations without radius');
        const iconicTaxa = getIconicTaxa(config);
        const perPage = 200;
        const placeId = config.guide.place.id;
        const endpoint = 'observations/species_counts';
        const url = `https://api.inaturalist.org/v1/${endpoint}?page=1&captive=false&hrank=species&rank=species&place_id=${placeId}&quality_grade=research&per_page=${perPage}&iconic_taxa=${iconicTaxa}`;
        const response = await fetch(url);
        const json = await response.json();
        return await json.results;
    }

    async function getInatUserObservations(config) {
        const iconicTaxa = getIconicTaxa(config);
        const perPage = 200;
        const userId = config.userId;
        const endpoint = 'observations/species_counts';
        const url = `https://api.inaturalist.org/v1/${endpoint}?page=1&captive=false&hrank=species&rank=species&user_id=${userId}&quality_grade=research&per_page=${perPage}&iconic_taxa=${iconicTaxa}`;
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
        // console.log(taxonNames);
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
        console.log(taxonNames);
        return observations;
    } else if(inatConfig.locationType === 'longLat') {
        observations = getInatObservations(latitude, longitude, config).then(observations => {
            return observations.map(observation => {
                if(R.contains(observation.taxon.name, names)) {
                    const item = { ...species.find(item => item.name === observation.taxon.name) };
                    return { ...item, observationCount: observation.taxon.observations_count, iconicTaxon: observation.taxon.iconic_taxon_name };
                } 
                else {
                    // console.log(observation.taxon.name);
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

export async function getInatTaxonStats(item, placeId) {

    const endpoint = 'https://api.inaturalist.org/v1/observations/species_counts';
    const verifiable = true;
    const place = placeId || 'any';
    const taxonName = item.name;
    const europe = '97391';
    const portugal = '7122';
    const d1 = '2000-01-01';
    const d2 = '3000-01-01'

    const url = `${endpoint}?verifiable=${verifiable}&taxon_name=${taxonName}&place_id=${place}&rank=species`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function getHistogram(item, placeId) {

    const endpoint = 'https://api.inaturalist.org/v1/observations/histogram';
    const place = placeId || 'any';
    const taxonName = item.name;

    const url = `${endpoint}?taxon_name=${taxonName}&place_id=${place}`;
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