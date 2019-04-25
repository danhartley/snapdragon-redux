import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { getPlace } from 'geo/geo';
import locationsTemplate from 'ui/create-guide-modal/locations-template.html';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';

export const renderLocation = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
          guideTxt.innerHTML = 'Choose where you want to explore.';
        
    createGuide.save(config, 'LOCATION', false)();
    const save = createGuide.save(config, 'LOCATION');

    let locationPlace = config.guide.locationPlace;
    let autocompleteRef;

    const template = document.createElement('template');
          template.innerHTML = locationsTemplate;
    const parent = modal.querySelector('.js-actions');

    renderTemplate({}, template.content, parent);

    const setLocationLongLatBtn = modal.querySelector('.js-set-location-btn');
          setLocationLongLatBtn.innerHTML = 'Pinpoint your location';

    const currentLocation = modal.querySelector('.js-current-location');
          currentLocation.innerHTML = config.ipLocation
                                        ? `Learn about species in ${config.ipLocation}.`
                                        : '';

    async function handleSetLocationLongLat(event) {

        event.stopPropagation();
        setLocationLongLatBtn.innerHTML = 'Updating location…'
        const place = await getPlace(config, true);
        config.guide.locationType = 'longLat';
        config.place = place;
        config.collection.id = 1;
        config.guide.locationLongLat = place.longLocation;
        actions.boundUpdateConfig(config);
        setLocationLongLatBtn.innerHTML = 'Pinpoint your location';

        save();
    }

    setLocationLongLatBtn.addEventListener('click', handleSetLocationLongLat);

    const locationPlaceInput = modal.querySelector('#inat-place');
          locationPlaceInput.placeholder = config.isLandscapeMode
                                            ? 'Start typing the name of a place you are interested in.'
                                            : 'Start typing the name of a place.'

    locationPlaceInput.addEventListener('keypress', event => {
        autocompleteRef = inatAutocomplete(locationPlaceInput, 'places', 'inat-place-autocomplete', 'place');
    });

    let range = config.guide.speciesRange;
    const rangeTxt = modal.querySelector('.js-range');
          rangeTxt.innerHTML = `Include species within a radius of ${range}km.`;

    modal.querySelector('.js-set-range-input').value = range;

    const slider = modal.querySelector('.js-set-range-input');
    
    const updateSlider  = event => {
        range = event.target.value;
        config.guide.speciesRange = range;
        actions.boundUpdateConfig(config);        
        rangeTxt.innerHTML = `Include species within a radius of ${range}km.`;

        save();
    };
    
    slider.addEventListener('change', updateSlider);

    createGuide.nextStepAction.addEventListener('click', event => {
        if(autocompleteRef)
            autocompleteRef.destroy();
    });

    modal.querySelector('.js-set-inat-location-btn').addEventListener('click', event => {

        config.guide.locationType = 'place';
        config.guide.place = { name: locationPlaceInput.value, id: locationPlaceInput.name, type: 'places' };
        locationPlace = locationPlaceInput.value;
        config.guide.locationPlace = locationPlace;
        config.collection.id = 2;
        actions.boundUpdateConfig(config);
        save();
        locationPlaceInput.value = '';
    });
}