import * as R from 'ramda';

import { fruit } from 'api/snapdragon/fruit';
import { vegetables } from 'api/snapdragon/vegetables';
import { insects } from 'api/snapdragon/insects';
// import { herbsAndSpices } from 'api/snapdragon/herbs-and-spices';
import { deciduousAndEvergreenTrees } from 'api/rhs/deciduous-evergreen-trees';

import { birds } from 'api/snapdragon/common-city-birds';
import { mushrooms } from 'api/snapdragon/mushrooms';
import { weeds } from 'api/rhs/weeds';
import { lichen } from 'api/snapdragon/lichen';

import { plants } from 'api/snapdragon/plants';
import { local } from 'api/snapdragon/local';
import { mammals } from 'api/snapdragon/mammals';

import { iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { listenToRangeUpdate } from 'ui/helpers/iconic-taxa-handler';

export const getInatSpecies = (latitude, longitude, config) => {

    const snapdragon = [ 
        ...birds,
        ...mushrooms,
        ...fruit,
        ...vegetables,
        ...insects,
        // ...herbsAndSpices,
        ...deciduousAndEvergreenTrees,
        ...weeds,
        ...lichen,
        ...plants,
        ...local,
        ...mammals
    ];
    
    const names = snapdragon.map(item => item.name);

    const daysAway = (when, days) => {
        let dateFromDays = new Date();
        const direction = when === 'future' ? 1 : -1;
        dateFromDays.setDate(dateFromDays.getDate() + direction * days);
        return dateFromDays;
    };

    const iconicTaxaKeys = Object.keys(iconicTaxa).join(',');

    const getIconicTaxa = config => {        
        const iconicTaxa = config.iconicTaxa || iconicTaxaKeys;
        const taxa = iconicTaxa.map(taxon => {
            if(taxon === 'lepidoptera') taxon = 'insecta';
            return taxon;
        });
        return taxa;
    };

    async function getInatObservations(latitude, longitude, config) {
        const lat = latitude || `38.7155762`;
        const lng = longitude || `-9.163009899999999`;
        const iconicTaxa = getIconicTaxa(config);
        const perPage = 200;
        const radius = config.speciesRange || 10;
        const start = daysAway('past', 30);
        const end = daysAway('future', 30);
        // const endpoint = 'observations';
        const endpoint = 'observations/species_counts';
        const url = `https://api.inaturalist.org/v1/${endpoint}?page=1&captive=false&hrank=species&iconic_taxa=${iconicTaxa}&lrank=species&m1=11&m2=1&photos=true&place_id=any&quality_grade=research&lat=${lat}&lng=${lng}&radius=${radius}&user_id=&per_page=${perPage}`;
        // const url = `https://api.inaturalist.org/v1/${endpoint}?page=1&captive=false&hrank=species&iconic_taxa=${iconicTaxa}&lrank=species&d1=${start}&d2=${end}&photos=true&place_id=any&quality_grade=research&lat=${lat}&lng=${lng}&radius=${radius}&user_id=&per_page=${perPage}`;
        const response = await fetch(url);
        const json = await response.json();
        return await json.results;
    }

    const observations = getInatObservations(latitude, longitude, config).then(observations => {
        return observations.map(observation => {
            if(R.contains(observation.taxon.name, names)) {
                return { ...snapdragon.find(item => item.name === observation.taxon.name) };
            } 
            else {
                console.log(observation.taxon.name);
            }
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

export async function getInatTaxonStats(item, placeId) {

    const endpoint = 'https://api.inaturalist.org/v1/observations/species_counts';
    const verifiable = true;
    const place = placeId || 'any';
    const taxonName = item.name;
    const europe = '97391';
    const portugal = '7122';
    const d1 = '2000-01-01';
    const d2 = '3000-01-01'

    const url = `${endpoint}?verifiable=${verifiable}&taxon_name=${taxonName}&place_id=${place}`;
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