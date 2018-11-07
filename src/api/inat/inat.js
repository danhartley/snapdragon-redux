import * as R from 'ramda';

import { birds } from 'api/snapdragon/common-city-birds';
import { mushrooms } from 'api/snapdragon/mushrooms';
import { fruit } from 'api/snapdragon/fruit';
import { vegetables } from 'api/snapdragon/vegetables';
import { insects } from 'api/snapdragon/insects';
import { herbsAndSpices } from 'api/snapdragon/herbs-and-spices';

export const getInatSpecies = () => {

    const snapdragon = [ 
        ...birds,
        ...mushrooms,
        ...fruit,
        ...vegetables,
        ...insects,
        ...herbsAndSpices
    ];
    
    const names = snapdragon.map(item => item.name);

    async function getInatObservations() {
        const url = `http://api.inaturalist.org/v1/observations?verifiable=true&page=1&captive=false&hrank=species&iconic_taxa%5B%5D=Fungi&lrank=species&month%5B%5D=10&month%5B%5D=11&month%5B%5D=12&photos=true&place_id=any&quality_grade=research&lat=38.7155762&lng=-9.163009899999999&radius=100&user_id=&per_page=200`;
        const response = await fetch(url);
        const json = await response.json();
        return await json.results;
    }

    const observations = getInatObservations().then(observations => {
        return observations.map(observation => {
            if(R.contains(observation.taxon.name, names)) {
                return snapdragon.find(item => item.name === observation.taxon.name);
            } 
            // else {
            //     return `** ${observation.taxon.name} **`;
            // }
        });
    });

    return observations;

}