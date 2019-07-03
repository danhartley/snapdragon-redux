import * as R from 'ramda';

import { utils } from 'utils/utils';
import { getIPLocation } from 'geo/geo';

export async function initialiseConfig(originalConfig) {

    const config = R.clone(originalConfig);

    const observableMonths = utils.getObservableMonths(new Date(), 3);

    config.season = { observableMonths };
    config.guide.season.observableMonths = observableMonths;
    config.guide.season.type = config.guide.season.type || 'months';

    config.collection.id = 1000; 
    config.guide.locationPlace = '';
    config.guide.place.type = '';
    config.guide.ready = false;
    
    try {
        
        const ipLocation = await getIPLocation(config);
        
        if(ipLocation) {
            const location = ipLocation.city ? `${ipLocation.city}, ${ipLocation.country_name}` : ipLocation;
            config.ipLocation = location;
            config.guide.locationType = 'longLat';
            config.guide.locationLongLat = location;
            config.guide.place.name = location;            
        }
        else {
            config.guide.locationPlace = 'Earth';
            config.guide.locationType = 'place';
            config.guide.place = { id: 'any', name: 'Earth' };
        }

    } catch(e) {            
        config.guide.locationPlace = 'Earth';
        config.guide.locationType = 'place';
        config.guide.place = { id: 'any', name: 'Earth' };
    }    

    return config;
}