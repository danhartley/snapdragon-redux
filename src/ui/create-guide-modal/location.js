import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { getPlace } from 'geo/geo';
import locationsTemplate from 'ui/create-guide-modal/locations-list-template.html';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';

export const renderLocation = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    guideTxt.innerHTML = 'Study species where you are';
    
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    const saveYourChangesBtn = createGuide.save(config, chosen, 'LOCATION');

    let authorisedLocation = config.place ? config.place.longLocation : null;        
    let ipLocation;
    let locationPlace = config.guide.locationPlace;
    let locationLongLat = config.guide.locationLongLat;
    let autocompleteRef;

    const template = document.createElement('template');
    template.innerHTML = locationsTemplate;
    const parent = modal.querySelector('.js-actions');

    renderTemplate({}, template.content, parent);

    const locationLongLatTxt = modal.querySelector('.js-auto-location');

    async function handleAutoLocationLongLat() {        
        ipLocation = config.ipLocation;
        config.ipLocation = ipLocation;
        config.collection.id = 1;
        actions.boundUpdateConfig(config);
        locationLongLat = authorisedLocation || ipLocation.country_name;
        locationLongLatTxt.innerHTML = locationLongLat;
        config.guide.locationLongLat = locationLongLat;
    }

    handleAutoLocationLongLat();

    const setLocationLongLatBtn = modal.querySelector('.js-set-location-btn');
    setLocationLongLatBtn.innerHTML = authorisedLocation ? 'Reset your location' : 'Pinpoint your location';

    async function handleSetLocationLongLat(event) {
        event.stopPropagation();
        setLocationLongLatBtn.innerHTML = 'Updating location...'
        const place = await getPlace(config, true);
        config.guide.locationType = 'longLat';
        config.place = place;
        config.guide.locationLongLat = place.longLocation;
        actions.boundUpdateConfig(config);
        locationLongLatTxt.innerHTML = place.longLocation;
        setLocationLongLatBtn.innerHTML = 'Reset your location';
        saveYourChangesBtn();
    }

    setLocationLongLatBtn.addEventListener('click', handleSetLocationLongLat);

    if(config.guide.locationType) {
        chosen.innerHTML = config.guide.locationType === 'place'
            ? config.guide.locationPlace
            : config.guide.locationLongLat;        
    }

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
        saveYourChangesBtn();
    };
    
    slider.addEventListener('change', updateSlider);

    createGuide.nextStepAction.addEventListener('click', event => {
        if(autocompleteRef)
            autocompleteRef.destroy();
    });

    // Set this counter-intuitively because we will force a click thus reversing the position

    let position = config.guide.locationType 
            ? config.guide.locationType === 'longLat'
                ? 'right'
                : 'left'
            : 'right';

    const idSwitch = modal.querySelector('.inat-id-switch');
    const idSwitchBtn = idSwitch.querySelector('div');

    const switchInputs = position => {
        switch(position) { 
            case 'left':
                locationPlaceInput.disabled = true;
                locationPlaceInput.classList.remove('active');
                modal.querySelector('.js-inat-location-place').classList.add('disabled');
                modal.querySelector('.js-set-inat-location-btn').classList.add('disabled');
                modal.querySelector('.js-inat-location-location').classList.remove('disabled');                
                setLocationLongLatBtn.disabled = false;
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

    idSwitch.addEventListener('click', event => {
        switch(position) { 
            case 'left':
                idSwitchBtn.parentElement.classList.add('right');
                idSwitchBtn.parentElement.classList.remove('left');
                position = 'right';
                break;
            case 'right':
                idSwitchBtn.parentElement.classList.add('left');
                idSwitchBtn.parentElement.classList.remove('right');
                position = 'left';
                break;
        }
        switchInputs(position);
    });

    idSwitch.click();

    modal.querySelector('.js-set-inat-location-btn').addEventListener('click', event => {
        config.guide.locationType = 'place';
        config.guide.place = { name: locationPlaceInput.value, id: locationPlaceInput.name, type: 'places' };
        locationPlace = locationPlaceInput.value;
        config.guide.locationPlace = locationPlace;
        config.collection.id = 2;
        actions.boundUpdateConfig(config);
        saveYourChangesBtn();
        locationPlaceInput.value = '';
    });
}