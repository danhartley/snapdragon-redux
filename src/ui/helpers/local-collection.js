import { getLocation, getPlace } from 'geo/geo';
import { actions } from 'redux/actions/action-creators';
import { speciesPendingSpinner } from 'ui/screens/lists/species-pending';

export async function handleLocalCollection(localCollectionNode, collectionsHeader, learningActionBtn, config, collection) {
        
    if(!localCollectionNode) return;

    if(config.isPortraitMode) {
        learningActionBtn.innerHTML = 'Checking location...';
        learningActionBtn.disabled = true;
    }
  
    localCollectionNode.classList.add('collection-disabled');
    localCollectionNode.innerHTML += ' (unavailable)';
  
    const coordinates = await getLocation(config);        
    const latitude = coordinates['0'];
    const longitude = coordinates['1'];
    config.coordinates = { lat: latitude, long: longitude };
    const place = await getPlace(longitude, latitude, config);

    if(place) {

        const region = place.features.find(f => f.place_type[0] === 'place');
        const country = place.features.find(f => f.place_type[0] === 'country');
        const collectionName = `Species from ${region.text}, ${country.text}`;
        localCollectionNode.innerHTML = collectionName;
        collectionsHeader.innerHTML = collectionName;
        collection.name = collectionName;
        
        if(config.isPortraitMode) {
            learningActionBtn.innerHTML = 'View lesson species';
            learningActionBtn.disabled = false;
        }
  
        config.place = place;
        config.place.area = region || country;

        if(config.isLandscapeMode) {
            speciesPendingSpinner(config);
        }

        actions.boundUpdateConfig(config);
  
        localCollectionNode.classList.remove('collection-disabled');
    }
  };