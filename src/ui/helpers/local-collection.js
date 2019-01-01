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
  
    const place = await getPlace(config);

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
    } else {
        localCollectionNode.classList.add('collection-disabled');
        localCollectionNode.innerHTML += ' (unavailable)';
    }
  };