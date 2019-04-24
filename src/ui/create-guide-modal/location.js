import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { getPlace } from 'geo/geo';
import locationsTemplate from 'ui/create-guide-modal/locations-template.html';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';

export const renderLocation = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    guideTxt.innerHTML = 'Choose the location that best suits you.';
        
    createGuide.save(config, 'LOCATION', false)();
    const save = createGuide.save(config, 'LOCATION');

    let locationPlace = config.guide.locationPlace;
    let autocompleteRef;

    const template = document.createElement('template');
    template.innerHTML = locationsTemplate;
    const parent = modal.querySelector('.js-actions');

    renderTemplate({}, template.content, parent);

    const setLocationLongLatBtn = modal.querySelector('.js-set-location-btn');
          setLocationLongLatBtn.innerHTML = 'Refine your location';

    const currentLocation = modal.querySelector('.js-current-location');
          currentLocation.innerHTML = config.ipLocation;

    const locationSelectors = modal.querySelectorAll('.btn.btn-secondary');

    const shortLocation = document.querySelector('.js-short-location');
          shortLocation.innerHTML = config.place ? 
                                        config.isLandscapeMode 
                                            ? `to: ${config.place.shortLocation}`
                                            : `to: ${config.place.locality}`
                                        : '';

    locationSelectors.forEach(location => {
      location.addEventListener('click', event => {
        let id = event.target.id;
            id = id === '' ? id = event.target.parentElement.id : id;
            id = id === '' ? id = event.target.parentElement.parentElement.id : id;
        
        switch(id) {
            case 'ipLocation':
                if(config.ipLocation) {
                    config.guide.locationType = 'longLat';
                    config.guide.locationLongLat = config.ipLocation;
                    save();
                }
                break;
            case 'locationLongLat':
                if(config.place) {
                    config.guide.locationType = 'longLat';
                    config.guide.locationLongLat = config.place.longLocation;
                    save();
                }
                break;     
        }
      });
    });

    const setSelectors = selectorId => {
        const selectedSelector = [ ...locationSelectors ].find(locator => locator.id === selectorId);
        locationSelectors.forEach(selector => selector.classList.remove('active'));
        selectedSelector.classList.add('active');
    };

    async function handleSetLocationLongLat(event) {

        setSelectors('locationLongLat');

        event.stopPropagation();
        setLocationLongLatBtn.innerHTML = 'Updating location…'
        const place = await getPlace(config, true);
        config.guide.locationType = 'longLat';
        config.place = place;
        config.collection.id = 1;
        config.guide.locationLongLat = place.longLocation;
        actions.boundUpdateConfig(config);
        setLocationLongLatBtn.innerHTML = 'Refine your location';
        
        shortLocation.innerHTML = config.isLandscapeMode 
                                    ? `to: ${place.shortLocation}`
                                    : `to: ${place.locality}`;

        save();
    }

    setLocationLongLatBtn.addEventListener('click', handleSetLocationLongLat);

    const locationPlaceInput = modal.querySelector('#inat-place');

    locationPlaceInput.addEventListener('focus', event => {
        setSelectors('locationPlace');
    });

    locationPlaceInput.addEventListener('keypress', event => {
        autocompleteRef = inatAutocomplete(locationPlaceInput, 'places', 'inat-place-autocomplete', 'place');
    });

    const txt = modal.querySelector('.js-range');
    let range = config.guide.speciesRange;

    txt.innerHTML = config.isLandscapeMode 
            ? `Include species within a radius of ${range}km`
            : `Species within ${range}km`;

    modal.querySelector('.js-set-range-input').value = range;

    const slider = modal.querySelector('.js-set-range-input');
    
    const updateSlider  = event => {
        range = event.target.value;
        config.guide.speciesRange = range;
        actions.boundUpdateConfig(config);        
        txt.innerHTML = config.isLandscapeMode 
                ? `Include species within a radius of ${range}km`
                : `Species within ${range}km`;
        save();
    };
    
    slider.addEventListener('change', updateSlider);

    createGuide.nextStepAction.addEventListener('click', event => {
        if(autocompleteRef)
            autocompleteRef.destroy();
    });

    modal.querySelector('.js-set-inat-location-btn').addEventListener('click', event => {

        setSelectors('locationPlace');

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