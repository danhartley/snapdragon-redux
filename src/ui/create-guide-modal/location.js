import { actions } from 'redux/actions/action-creators';
import { getPlace, getIPLocation } from 'geo/geo';

export const renderLocation = (config, modal) => {
    
    const chosenLocation = modal.querySelector('.js-chosen-location span:nth-child(2)');
    const currentIPLocationTxt = modal.querySelector('.js-ip-location');

    let location = config.place ? config.place.longLocation : null;
    
    const currentLocationTxt = modal.querySelector('.js-current-location');
    currentLocationTxt.innerHTML = location ? `Your current location is <span>${location}<span>.` : '';

    let ipLocation;

    async function handleIpLocation() {
        ipLocation = config.ipLocation || await getIPLocation(config);
        config.ipLocation = ipLocation;
        actions.boundUpdateConfig(config);
        currentIPLocationTxt.innerHTML = location 
            ? `You are in ${ipLocation.country_name}.`
            : `You are in ${ipLocation.country_name}. You can be more specific by setting your location.`;
        chosenLocation.innerHTML = location || ipLocation.country_name;
    }

    handleIpLocation();

    const setLocationBtn = modal.querySelector('.js-set-location-btn');
    setLocationBtn.innerHTML = location ? 'Reset your location' : 'Set your location';

    async function handleSetLocation() {
        setLocationBtn.innerHTML = 'Updating location...'
        const place = await getPlace(config, true);
        config.place = place;
        actions.boundUpdateConfig(config);
        setLocationBtn.innerHTML = 'Reset your location';
        currentLocationTxt.innerHTML = `Your current location is ${place.longLocation}`;
        chosenLocation.innerHTML = place.longLocation;
        currentIPLocationTxt.innerHTML = `You are in ${ipLocation.country_name}.`;
    }

    setLocationBtn.addEventListener('click', handleSetLocation);
};