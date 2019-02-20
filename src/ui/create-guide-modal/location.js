import { renderTemplate } from 'ui/helpers/templating';
import { actions } from 'redux/actions/action-creators';
import { getPlace, getIPLocation } from 'geo/geo';
import { saveButton } from 'ui/create-guide-modal/common/save-button';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';
import locationsTemplate from 'ui/create-guide-modal/locations-list-template.html';

export const renderLocation = (config, modal) => {

    const guideTxt = modal.querySelector('.guide-text');
    guideTxt.innerHTML = 'Where do you want to explore today?';

    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    
    const saveYourChangesBtn = saveButton(modal.querySelector('.js-save-your-changes'), config);

    let location = config.place ? config.place.longLocation : null;
    
    let ipLocation;

    const template = document.createElement('template');
    template.innerHTML = locationsTemplate;
    const parent = modal.querySelector('.js-actions');

    renderTemplate({}, template.content, parent);

    const currentIPLocationTxt = modal.querySelector('.js-ip-location');

    async function handleIpLocation() {
        ipLocation = config.ipLocation || await getIPLocation(config);
        config.ipLocation = ipLocation;
        actions.boundUpdateConfig(config);
        currentIPLocationTxt.innerHTML = location || ipLocation.country_name;
    }

    handleIpLocation();

    const setLocationBtn = modal.querySelector('.js-set-location-btn');
    setLocationBtn.innerHTML = location ? 'Reset your location' : 'Set your location';

    async function handleSetLocation() {
        setLocationBtn.innerHTML = 'Updating location...'
        const place = await getPlace(config, true);
        config.place = place;
        actions.boundUpdateConfig(config);
        currentIPLocationTxt.innerHTML = place.longLocation;
        setLocationBtn.innerHTML = 'Reset your location';
    }

    setLocationBtn.addEventListener('click', handleSetLocation);

    const inputPlace = modal.querySelector('.js-user-location');

    inputPlace.addEventListener('focus', event => {
        // typeahead
    });

    modal.querySelectorAll('.btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {
        const target = rbEventHandler(modal, event);
    }));

    modal.querySelectorAll('.btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {        
        const target = rbEventHandler(modal, event);
        saveYourChangesBtn.disabled = false;
        config.userLocation = target.querySelector('.js-ip-location').innerText;
        chosen.innerHTML = config.userLocation;
    }));

};