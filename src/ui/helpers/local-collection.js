import { getLocation, getPlace } from 'geo/geo';
import { actions } from 'redux/actions/action-creators';
import { speciesPendingSpinner } from 'ui/screens/lists/species-pending';

export async function handleLocalCollection(localCollectionNode, collectionsHeader, learningActionBtn, config, collection) {
        
    if(!localCollectionNode) return;

    if(config.isPortraitMode) {
        learningActionBtn.innerHTML = 'Checking location...';
        learningActionBtn.disabled = true;
    } else {
        speciesPendingSpinner(config);
    }
  
    localCollectionNode.classList.add('collection-disabled');
    localCollectionNode.innerHTML += ' (unavailable)';
  
    const coordinates = await getLocation(config);        
    const latitude = coordinates['0'] || coordinates.lat;
    const longitude = coordinates['1'] || coordinates.long;
    config.coordinates = { lat: latitude, long: longitude };
    const place = await getPlace(longitude, latitude, config);

    if(place) {

        localCollectionNode.innerHTML = place.summary;
        collectionsHeader.innerHTML = place.summary;
        collection.name = place.summary;
        
        if(config.isPortraitMode) {
            learningActionBtn.innerHTML = 'View lesson species';
            learningActionBtn.disabled = false;
        }
  
        if(config.place !== place) {
            config.place = place;
            actions.boundUpdateConfig(config);
        }

        localCollectionNode.classList.remove('collection-disabled');
    }
  };