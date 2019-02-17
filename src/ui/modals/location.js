import { actions } from 'redux/actions/action-creators';
import { getPlace } from 'geo/geo';

const rangeListeners = [];

export const renderLocation = (config, modal) => {
    
    let place = config.place ? config.place.longLocation : 'unknown';

    const currentLocationTxt = modal.querySelector('.js-current-location');
    currentLocationTxt.innerHTML = `Your current location is ${place}`;

    const defaultRange = config.speciesRange;
    const range = modal.querySelector('#range');

    modal.querySelector('.js-set-range-input').value = defaultRange;
    range.innerHTML = defaultRange;    

    const slider = modal.querySelector('.js-set-range-input');

    const updateSlider  = event => {
        range.innerHTML = event.target.value;
    };

    slider.addEventListener('change', updateSlider);

    const setRangeBtn = modal.querySelector('.js-set-range-btn');
    setRangeBtn.addEventListener('click', event => {
        config.speciesRange = parseInt(range.innerHTML);
        setRangeBtn.innerHTML = 'Updating range...';
        actions.boundUpdateConfig(config);
        rangeListeners.forEach(listener => listener(filters, config));
        setTimeout(() => {                
            setRangeBtn.innerHTML = 'Range updated';            
            setTimeout(() => {
                setRangeBtn.innerHTML = 'Set new range';
            }, 1500);
        }, 1500);
    });

    const setLocationBtn = modal.querySelector('.js-set-location-btn');

    async function handleSetLocation() {
        setLocationBtn.innerHTML = 'Updating location...'
        place = await getPlace(config);
        config.place = place;
        actions.boundUpdateConfig(config);
        setLocationBtn.innerHTML = 'Location updated';
        currentLocationTxt.innerHTML = `Your current location is ${place.longLocation}`;
    }

    setLocationBtn.addEventListener('click', handleSetLocation);
};

export const listenToRangeUpdate = listener => {
    rangeListeners.push(listener);
};