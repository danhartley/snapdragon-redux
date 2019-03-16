import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { getPlace } from 'geo/geo';
import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';
import locationsTemplate from 'ui/create-guide-modal/locations-template.html';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';

export const renderLocation = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    guideTxt.innerHTML = 'Study species where you are';
        
    createGuide.save(config, 'LOCATION', false)();
    const save = createGuide.save(config, 'LOCATION');

    let authorisedLocation = config.place ? config.place.longLocation : null;        
    let locationPlace = config.guide.locationPlace;
    let autocompleteRef;

    const template = document.createElement('template');
    template.innerHTML = locationsTemplate;
    const parent = modal.querySelector('.js-actions');

    renderTemplate({}, template.content, parent);

    const locationLongLatTxt = modal.querySelector('.js-auto-location');
    const setLocationLongLatBtn = modal.querySelector('.js-set-location-btn');
    setLocationLongLatBtn.innerHTML = authorisedLocation ? 'Reset your location' : 'Pinpoint your location';

    async function handleSetLocationLongLat(event) {
        event.stopPropagation();
        setLocationLongLatBtn.innerHTML = 'Updating location…'
        const place = await getPlace(config, true);
        config.guide.locationType = 'longLat';
        config.place = place;
        config.collection.id = 1;
        config.guide.locationLongLat = place.longLocation;
        actions.boundUpdateConfig(config);
        locationLongLatTxt.innerHTML = place.longLocation;
        setLocationLongLatBtn.innerHTML = 'Reset your location';
        save();
    }

    setLocationLongLatBtn.addEventListener('click', handleSetLocationLongLat);

    const locationPlaceInput = modal.querySelector('#inat-place');

    locationPlaceInput.addEventListener('keyup', event => {
        autocompleteRef = inatAutocomplete(locationPlaceInput, 'places', 'inat-place-autocomplete', 'place');
    });

    const txt = modal.querySelector('.js-range');
    let range = config.guide.speciesRange;

    txt.innerHTML = `Include species within a radius of <span class="underline-link">${range}km</span>`;

    modal.querySelector('.js-set-range-input').value = range;

    const slider = modal.querySelector('.js-set-range-input');
    
    const updateSlider  = event => {
        range = event.target.value;
        config.guide.speciesRange = range;
        actions.boundUpdateConfig(config);        
        txt.innerHTML = `Include species within a radius of <span class="underline-link">${range}km</span>`;
        save();
    };
    
    slider.addEventListener('change', updateSlider);

    createGuide.nextStepAction.addEventListener('click', event => {
        if(autocompleteRef)
            autocompleteRef.destroy();
    });

    const idSwitch = modal.querySelector('.snapdragon-switch');

    const switchCallback = position => {
        switch(position) { 
            case 'left':
                setLocationLongLatBtn.disabled = false;
                modal.querySelector('.js-inat-location-location').classList.remove('disabled');             
                
                locationPlaceInput.disabled = true;
                locationPlaceInput.classList.remove('active');
                modal.querySelector('.js-inat-location-place').classList.add('disabled');
                modal.querySelector('.js-set-inat-location-btn').classList.add('disabled');
                break;
            case 'right':
                locationPlaceInput.disabled = false;
                locationPlaceInput.classList.add('active');
                modal.querySelector('.js-inat-location-place').classList.remove('disabled');
                modal.querySelector('.js-set-inat-location-btn').classList.remove('disabled');

                modal.querySelector('.js-inat-location-location').classList.add('disabled');
                setLocationLongLatBtn.disabled = true;
                break;
        }
    };

    const position = config.guide.locationType 
            ? config.guide.locationType === 'longLat'
                ? 'left'
                : 'right'
            : 'left';

    switchHandler(idSwitch, position, switchCallback);

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