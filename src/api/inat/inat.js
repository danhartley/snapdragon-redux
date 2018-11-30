import * as R from 'ramda';

import { fruit } from 'api/snapdragon/fruit';
import { vegetables } from 'api/snapdragon/vegetables';
import { insects } from 'api/snapdragon/insects';
import { herbsAndSpices } from 'api/snapdragon/herbs-and-spices';
import { deciduousAndEvergreenTrees } from 'api/rhs/deciduous-evergreen-trees';

import { birds } from 'api/snapdragon/common-city-birds';
import { mushrooms } from 'api/snapdragon/mushrooms';
import { weeds } from 'api/rhs/weeds';
import { lichen } from 'api/snapdragon/lichen';

import { plants } from 'api/snapdragon/plants';

export const getInatSpecies = (latitude, longitude) => {

    const snapdragon = [ 
        ...birds,
        ...mushrooms,
        ...fruit,
        ...vegetables,
        ...insects,
        ...herbsAndSpices,
        ...deciduousAndEvergreenTrees,
        ...weeds,
        ...lichen,
        ...plants
    ];
    
    const names = snapdragon.map(item => item.name);

    const daysAway = (when, days) => {
        let dateFromDays = new Date();
        const direction = when === 'future' ? 1 : -1;
        dateFromDays.setDate(dateFromDays.getDate() + direction * days);
        return dateFromDays;
    };

    async function getInatObservations(latitude, longitude) {
        const lat = latitude || `38.7155762`;
        const lng = longitude || `-9.163009899999999`;
        const iconicTaxa = 'Fungi,Plantae,Aves';
        const perPage = 200;
        const radius = 100;
        const start = daysAway('past', 30);
        const end = daysAway('future', 30);
        // const endpoint = 'observations';
        const endpoint = 'observations/species_counts';
        const url = `https://api.inaturalist.org/v1/${endpoint}?page=1&captive=false&hrank=species&iconic_taxa=${iconicTaxa}&lrank=species&d1=${start}&d2=${end}&photos=true&place_id=any&quality_grade=research&lat=${lat}&lng=${lng}&radius=${radius}&user_id=&per_page=${perPage}`;
        const response = await fetch(url);
        const json = await response.json();
        return await json.results;
    }

    const observations = getInatObservations(latitude, longitude).then(observations => {
        return observations.map(observation => {
            if(R.contains(observation.taxon.name, names)) {
                return { ...snapdragon.find(item => item.name === observation.taxon.name) };
            } 
            else {
                //return `** ${observation.taxon.name} **`;
                console.log(observation.taxon.name);
            }
        });
    });

    return observations;

}