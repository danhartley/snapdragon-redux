import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { getPlace, getIPLocation } from 'geo/geo';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';
import locationsTemplate from 'ui/create-guide-modal/locations-list-template.html';

export const renderLocation = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    guideTxt.innerHTML = 'Please provide your location';
    
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    const saveYourChangesBtn = createGuide.save(config, chosen, 'LOCATION');

    let authorisedLocation = config.place ? config.place.longLocation : null;        
    let ipLocation;
    let userLocation = config.guide.userLocation;
    let autoLocation = config.guide.autoLocation;

    const template = document.createElement('template');
    template.innerHTML = locationsTemplate;
    const parent = modal.querySelector('.js-actions');

    renderTemplate({}, template.content, parent);

    const locationTypes = modal.querySelectorAll('.btn.btn-secondary div');
    const autoLocationTxt = modal.querySelector('.js-auto-location');

    async function handleAutoLocation() {        
        ipLocation = config.ipLocation;
        config.ipLocation = ipLocation;
        actions.boundUpdateConfig(config);
        autoLocation = authorisedLocation || ipLocation.country_name;
        autoLocationTxt.innerHTML = autoLocation;
        config.guide.autoLocation = autoLocation;
    }

    handleAutoLocation();

    const setLocationBtn = modal.querySelector('.js-set-location-btn');
    setLocationBtn.innerHTML = authorisedLocation ? 'Reset your location' : 'Pinpoint your location';

    if(config.guide.locationType) {
        chosen.innerHTML = config.guide.locationType === 'user'
            ? config.guide.userLocation
            : config.guide.autoLocation;
    }

    async function handleSetLocation(event) {
        event.stopPropagation();
        setLocationBtn.innerHTML = 'Updating location...'
        const place = await getPlace(config, true);
        config.place = place;
        config.guide.autoLocation = place.longLocation;
        actions.boundUpdateConfig(config);
        autoLocationTxt.innerHTML = place.longLocation;
        setLocationBtn.innerHTML = 'Reset your location';
    }

    setLocationBtn.addEventListener('click', handleSetLocation);

    const userLocationInput = modal.querySelector('.js-user-location');
    
    const userLocationRB = modal.querySelectorAll('.btn.btn-secondary')[1];

    if(userLocation) {
        userLocationInput.value = userLocation;
        userLocationRB.classList.remove('disabled');          
    } else {
        if(userLocationInput.value === '') userLocationRB.classList.add('disabled');
    }
    
    let locationType = config.guide.locationType;

    if(locationType) {
        setTimeout(() => {
            modal.querySelector(`#${locationType}`).click();   
        });
    }      

    userLocationInput.addEventListener('keyup', event => {

        if(userLocationInput.value.length > 1) {
            userLocationRB.classList.remove('disabled');
        } else {
            userLocationRB.classList.add('disabled');
        }

        userLocation = userLocationInput.value;
        config.guide.userLocation = userLocation;
    });

    locationTypes.forEach(type => type.addEventListener('click', event => {        
        
        const rb = rbEventHandler(modal, event);
        if(rb) {
            locationType = rb.id;
            config.guide.locationType = locationType;
        }

        saveYourChangesBtn.disabled = false;
    }));
};