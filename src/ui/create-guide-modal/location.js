import { renderTemplate } from 'ui/helpers/templating';
import { getPlace, GooglePlaceDetails } from 'geo/geo';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';
import { renderInatUser } from 'ui/create-guide-modal/inat-user';

import locationsTemplate from 'ui/create-guide-modal/locations-template.html';
import googleLogoImg from 'img/powered_by_google_on_white_hdpi.png';

export const renderLocation = (modal, createGuide) => {

    const config = createGuide.getConfig();

    if(config.guide.locationType === 'inat') {
        renderInatUser(modal, createGuide);
        return;
    }

    createGuide.saveStep('LOCATION');
 
    const guideTxt = modal.querySelector('.js-guide-text');
          guideTxt.innerHTML = 'Choose where you want to explore.';
        
    let locationPlace = config.guide.locationPlace;
    let autocompleteRef;

    const template = document.createElement('template');
          template.innerHTML = locationsTemplate;
    const parent = modal.querySelector('.js-actions');
          parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

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
                                            : 'Or start typing the name of a place.'

    let counter = 0;

    // locationPlaceInput.addEventListener('focus', event => {
    //     counter = 0;
    // });

    // locationPlaceInput.addEventListener('keypress', event => {
    //     if(event.keyCode == 13) {
    //         counter = 0;
    //     }
    // });

    locationPlaceInput.addEventListener('keypress', event => {
        counter++;
        console.log(counter);
        autocompleteRef = inatAutocomplete(locationPlaceInput, 'places', 'autocomplete-options-container', 'place');
        // setTimeout(() => {
        //     const googleImageContainer = modal.querySelector('#inat-place-autocomplete #googleLogoContainer');
        //     if(!googleImageContainer && counter >= 3) {
        //         const options = modal.querySelector('#inat-place-autocomplete');
        //         if(options) options.innerHTML += `<div id="googleLogoContainer"><img id="googleLogo" src="${googleLogoImg}" alt=""></div>`;
        //     }            
        // },750);  
    });

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

    createGuide.nextStepAction.addEventListener('click', event => {
        if(autocompleteRef)
            autocompleteRef.destroy();
    });

    modal.querySelector('.js-set-inat-location-btn').addEventListener('click', event => {

        const iNatLookup = false;

        if(iNatLookup) {
            config.guide.locationType = 'place';
            config.guide.place = { name: locationPlaceInput.value, id: locationPlaceInput.name, type: 'places' };
            locationPlace = locationPlaceInput.value;
            config.guide.locationPlace = locationPlace;
        } else {
            config.guide.locationType = 'longLat';
            config.guide.locationLongLat = locationPlaceInput.value;

            const callback = geocoderResult => {
                const lat = geocoderResult[0].geometry.location.lat();
                const long = geocoderResult[0].geometry.location.lng();
                config.guide.coordinates = { lat, long };

                locationPlaceInput.value = '';

                createGuide.setConfig(config);
                createGuide.saveStep('LOCATION');
            };

            GooglePlaceDetails(locationPlaceInput.name, callback);            
        }
    });

    const linktoInatOptions = modal.querySelector('.js-location-options2 span:nth-child(2)');    

    const renderInatUserLocation = () => {
        renderInatUser(modal, createGuide);
    };

    linktoInatOptions.removeEventListener('click', renderInatUserLocation, true);
    linktoInatOptions.addEventListener('click', renderInatUserLocation, true);
}