import { renderTemplate } from 'ui/helpers/templating';
import { getPlace, GooglePlaceDetails } from 'geo/geo';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';
import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';

import locationTemplate from 'ui/create-guide-modal/location-template.html';
import googleLogoImg from 'img/powered_by_google_on_white_hdpi.png';

export const renderLocation = (modal, createGuide) => {

    const config = createGuide.getConfig();

    createGuide.saveStep('LOCATION');

    let locationPlace = config.guide.locationPlace;
    let autocompleteRef;

    const template = document.createElement('template');
          template.innerHTML = locationTemplate;
    const parent = modal.querySelector('.js-actions');
          parent.innerHTML = '';

    config.guide.season.observableMonths = config.guide.season.observableMonths || config.season.observableMonths;

    if(config.guide.season.observableMonths) {

        const months = config.guide.season.observableMonths.map(month => month.name);
        const observableMonths = `${months[0]}-${months[months.length - 1]}`;

        renderTemplate({ observableMonths }, template.content, parent);

        
    }

    const defaultLocationTxt = 'Use your current location';

    const setLocationLongLatBtn = modal.querySelector('.js-set-location-btn');
          setLocationLongLatBtn.innerHTML = defaultLocationTxt;

    async function handleSetLocationLongLat(event) {

        event.stopPropagation();
        setLocationLongLatBtn.innerHTML = 'Updating location…'
        const place = await getPlace(config, true);
        config.guide.locationType = 'longLat';
        config.place = place;
        config.guide.locationLongLat = place.longLocation;
        setLocationLongLatBtn.innerHTML = defaultLocationTxt;
        
        createGuide.setConfig(config);
        createGuide.saveStep('LOCATION');
    }

    setLocationLongLatBtn.addEventListener('click', handleSetLocationLongLat);

    const locationPlaceInput = modal.querySelector('#inat-place');
          locationPlaceInput.placeholder = config.isLandscapeMode
                                            ? 'Or start typing the name of a place you are interested in.'
                                            : 'Or start typing the name of a place.';
          locationPlaceInput.focus();

    // let counter = 0;

    const handleLocationPlaceInput =  e => {
        locationPlaceInput.removeEventListener('keypress', handleLocationPlaceInput);
        // counter++;
        // console.log(counter);
        autocompleteRef = inatAutocomplete(locationPlaceInput, 'places', 'autocomplete-options-container', 'place');
        // saveLocationBtn.disabled = false;        
        // setTimeout(() => {
        //     const googleImageContainer = modal.querySelector('#inat-place-autocomplete #googleLogoContainer');
        //     if(!googleImageContainer && counter >= 3) {
        //         const options = modal.querySelector('#inat-place-autocomplete');
        //         if(options) options.innerHTML += `<div id="googleLogoContainer"><img id="googleLogo" src="${googleLogoImg}" alt=""></div>`;
        //     }            
        // },750);  
    }

    locationPlaceInput.addEventListener('keypress', handleLocationPlaceInput);

    locationPlaceInput.addEventListener('click', e => {
        e.preventDefault();
    });

    locationPlaceInput.addEventListener('keyup', e => {
        e.preventDefault('e.keyCode: ', e.keyCode);
    });

    document.getElementById('locationForm').addEventListener('submit', e => {
        e.preventDefault();
        if(locationPlaceInput.value !== '') {
            saveLocation(config, locationPlaceInput, locationPlace, createGuide);
        }
    });

    if(config.isPortraitMode) {
        locationPlaceInput.addEventListener('focusout', e => {
            const container = document.querySelector('.autocomplete-options-container');
                if(container) {
                    setTimeout(() => {
                        saveLocation(config, locationPlaceInput, locationPlace, createGuide);                   
                    });
                    e.preventDefault();
                }
        });
    }

    let range = config.guide.speciesRange;
    const rangeTxt = modal.querySelector('.js-range');
          rangeTxt.innerHTML = `Include species within ${range}km.`;

    modal.querySelector('.js-set-range-input').value = range;

    const slider = modal.querySelector('.js-set-range-input');
    
    const updateSlider  = event => {
        range = event.target.value;
        config.guide.speciesRange = range;
        rangeTxt.innerHTML = `Include species within ${range}km.`;

        createGuide.setConfig(config);
    };
    
    slider.addEventListener('change', updateSlider);

    createGuide.nextStepActionArrow.addEventListener('click', event => {
        if(autocompleteRef)
            autocompleteRef.destroy();
    });

    const idSwitch = parent.querySelector('.js-snap-switch-slider');

    const switchCallback = position => {

        const config = createGuide.getConfig();

        const currentType = config.guide.season.type;

        if(position === 'right') {
            config.guide.season.type = 'all_year';
        } else {
            config.guide.season.type = 'months';
        }

        createGuide.setConfig(config);
        
        if(config.guide.season.type !== currentType) {
            createGuide.saveStep('SEASON');
        }        
    };

    const position = config.guide.season.type === 'months' ? 'left' : 'right';

    switchHandler(idSwitch, position, switchCallback);
}

const saveLocation = (config, locationPlaceInput, locationPlace, createGuide) => {

    let selectedText = locationPlaceInput.value;
    let selectedId = locationPlaceInput.name;

    config.guide.locationType = 'longLat';
    config.guide.place.name = selectedText;
    config.guide.locationLongLat = selectedText;

    config.guide.locationType = 'longLat';
    config.guide.locationLongLat = selectedText;

    const callback = geocoderResult => {
        if(geocoderResult && geocoderResult.length > 0) {
            const lat = geocoderResult[0].geometry.location.lat();
            const long = geocoderResult[0].geometry.location.lng();
            config.guide.coordinates = { lat, long };
            
            locationPlaceInput.value = '';
            
            createGuide.setConfig(config);
            createGuide.saveStep('LOCATION');
        }
    };
    GooglePlaceDetails(selectedId, callback);

    return locationPlace;
}
