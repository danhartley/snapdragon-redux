import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { getPlace, getIPLocation } from 'geo/geo';
import { saveButton } from 'ui/create-guide-modal/common/save-button';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';
import locationsTemplate from 'ui/create-guide-modal/locations-list-template.html';

export const renderLocation = (modal, config) => {

    const guideTxt = modal.querySelector('.guide-text');
    guideTxt.innerHTML = 'Where do you want to explore today?';
    
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    const saveYourChangesBtn = saveButton(modal.querySelector('.js-save-your-changes'), config, chosen, 'LOCATION');

    let authorisedLocation = config.place ? config.place.longLocation : null;        
    let ipLocation;
    let userLocation = config.userLocation;
    let autoLocation = config.autoLocation;

    const template = document.createElement('template');
    template.innerHTML = locationsTemplate;
    const parent = modal.querySelector('.js-actions');

    renderTemplate({}, template.content, parent);

    const locationTypes = modal.querySelectorAll('.btn.btn-secondary div');
    const autoLocationTxt = modal.querySelector('.js-auto-location');

    async function handleAutoLocation() {        
        ipLocation = config.ipLocation || await getIPLocation(config);
        config.ipLocation = ipLocation;
        actions.boundUpdateConfig(config);
        autoLocation = authorisedLocation || ipLocation.country_name;
        autoLocationTxt.innerHTML = autoLocation;
        config.autoLocation = autoLocation;
    }

    handleAutoLocation();

    const setLocationBtn = modal.querySelector('.js-set-location-btn');
    setLocationBtn.innerHTML = authorisedLocation ? 'Reset your location' : 'Set your location';

    if(config.locationType) {
        chosen.innerHTML = config.locationType === 'user'
            ? config.userLocation
            : config.autoLocation;
    }

    async function handleSetLocation(event) {
        event.stopPropagation();
        setLocationBtn.innerHTML = 'Updating location...'
        const place = await getPlace(config, true);
        config.place = place;
        config.autoLocation = place.longLocation;
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
    
    let locationType = config.locationType;

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
        config.userLocation = userLocation;
    });

    locationTypes.forEach(type => type.addEventListener('click', event => {        
        
        const rb = rbEventHandler(modal, event);
        if(rb) {
            locationType = rb.id;
            config.locationType = locationType;
        }

        saveYourChangesBtn.disabled = false;
    }));
};