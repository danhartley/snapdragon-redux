import { getLocation, getPlace } from 'geo/geo';
import { actions } from 'redux/actions/action-creators';
import { speciesPendingSpinner } from 'ui/screens/lists/species-pending';

export async function handleCustomCollections(localCollectionNode, learningActionBtn, config, collection) {
      
    // if(!localCollectionNode) return;

    if(config.isPortraitMode) {
        learningActionBtn.innerHTML = 'Checking location...';
        learningActionBtn.disabled = true;
    } else {
        speciesPendingSpinner(config);
    }
  
    const place = await getPlace(config);

    if(config.inatId) {
        collectionText.innerText = `iNat observations for ${config.inatId}`;   
    } 
    
    if(place && config.collection.id !== 4) {

        collection.name = place.summary;
        
        if(config.isPortraitMode) {
            learningActionBtn.innerHTML = 'View lesson species';
            learningActionBtn.disabled = false;
        }
  
        if(config.place !== place) {
            config.place = place;
            actions.boundUpdateConfig(config);
        }
    }
  };