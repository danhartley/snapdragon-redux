import { getLocation, getPlace } from 'geo/geo';
import { actions } from 'redux/actions/action-creators';
import { renderSpinner } from 'ui/screens/lists/species-pending';

export async function updateLocalLesson(localCollectionNode, config) {
        
    if(!localCollectionNode) return;
  
    localCollectionNode.classList.add('collection-disabled');
    localCollectionNode.innerHTML += ' (unavailable)';
  
    const coordinates = await getLocation();            
    const latitude = coordinates['0'];
    const longitude = coordinates['1'];
    const place = await getPlace(longitude, latitude, config.language);

    if(place) {
        const region = place.features.find(f => f.place_type[0] === 'place');
        const country = place.features.find(f => f.place_type[0] === 'country');
        localCollectionNode.innerHTML = `Species from ${region.text}, ${country.text}`;
  
        config.region = region || country;
        actions.boundUpdateConfig(config);
  
        localCollectionNode.classList.remove('collection-disabled');
    }

    renderSpinner(config);

  };