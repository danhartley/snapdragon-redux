import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { getPlace } from 'geo/geo';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';
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

    const locationTypes = modal.querySelectorAll('.btn.btn-secondary div');
    const locationLongLatTxt = modal.querySelector('.js-auto-location');

    async function handleAutoLocationLongLat() {        
        ipLocation = config.ipLocation;
        config.ipLocation = ipLocation;
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
        config.place = place;
        config.guide.locationLongLat = place.longLocation;
        actions.boundUpdateConfig(config);
        locationLongLatTxt.innerHTML = place.longLocation;
        setLocationLongLatBtn.innerHTML = 'Reset your location';
        modal.querySelector(`#longLat`).click();
        saveYourChangesBtn();
    }

    setLocationLongLatBtn.addEventListener('click', handleSetLocationLongLat);

    const toggleSpeciesRange = isRangeSensitive => {
        const rangeSlider = modal.querySelector('.range-slider');
        isRangeSensitive 
            ? rangeSlider.classList.remove('disabled') 
            : rangeSlider.classList.add('disabled');
    };

    if(config.guide.locationType) {
        chosen.innerHTML = config.guide.locationType === 'place'
            ? config.guide.locationPlace
            : config.guide.locationLongLat;
        
        config.guide.locationType === 'place'
            ? toggleSpeciesRange(false)
            : toggleSpeciesRange(true);
    }

    const locationPlaceInput = modal.querySelector('#inat-place');

    locationPlaceInput.addEventListener('keyup', event => {
        autocompleteRef = inatAutocomplete(locationPlaceInput, 'places', 'inat-place-autocomplete', 'place');
    });

    locationPlaceInput.addEventListener('focus', event => {
        toggleSpeciesRange(false);
    });

    const locationPlaceRB = modal.querySelector('#place');

    if(locationPlace) {
        locationPlaceInput.value = locationPlace;
        locationPlaceRB.classList.remove('disabled');          
    } else {
        if(locationPlaceInput.value === '') locationPlaceRB.classList.add('disabled');
    }
    
    let locationType = config.guide.locationType;

    let showUpdate = false;

    if(locationType) {
        setTimeout(() => {
            modal.querySelector(`#${locationType}`).click();
        });
    }      

    locationTypes.forEach(type => type.addEventListener('click', event => {        
        
        const rb = rbEventHandler(modal, event);
        if(rb) {
            locationType = rb.id;
            config.guide.locationType = locationType;
            if(locationType === 'place') {
                toggleSpeciesRange(false);
                config.guide.place = { name: locationPlaceInput.value, id: locationPlaceInput.name, type: 'places' };
                locationPlace = locationPlaceInput.value;
                config.guide.locationPlace = locationPlace;
                config.collection.id = 2;
            } else {
                toggleSpeciesRange(true);
                config.collection.id = 1;
            }
        }

        if(showUpdate)
            saveYourChangesBtn();
        else
            showUpdate = true;
    }));


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
};