import * as R from 'ramda';

import { iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';

const filterListeners = [];
const rangeListeners = [];

export const listenToTaxaFiltersUpdate = listener => { 
    filterListeners.push(listener);
};

export const listenToRangeUpdate = listener => {
    rangeListeners.push(listener);
};

export const handleIconicTaxaFilter = (config) => {
    
    document.querySelector('#aves div:nth-child(2)').innerHTML = 'Birds';
    document.querySelector('#amphibia div:nth-child(2)').innerHTML = 'Amphibians';
    document.querySelector('#mammalia div:nth-child(2)').innerHTML = 'Mammals';
    document.querySelector('#insecta div:nth-child(2)').innerHTML = 'Insects';
    document.querySelector('#fungi div:nth-child(2)').innerHTML = 'Fungi & Lichens';
    document.querySelector('#plantae div:nth-child(2)').innerHTML = 'Plants';

    const filterBtn = document.querySelector('.js-lesson-filters > button:nth-child(1)');
    const setRangeBtn = document.querySelector('.js-set-range-btn');

    const filterSelectedClass = 'iconic-taxa-selected';

    const icons = document.querySelectorAll('.iconic-taxa-categories > div > div:nth-child(1)');

    if(config.iconicTaxa && config.iconicTaxa.length > 0) {
        icons.forEach(icon => {
            const filterId = icon.parentElement.id;
            if(R.contains(filterId, config.iconicTaxa)) {
                icon.classList.add(filterSelectedClass);
            }
        });
    }

    const checkButtonState = (filters, haveFiltersChanged) => {
        if(filters.length === 0 && !haveFiltersChanged) {
            filterBtn.disabled = true;
        } else {
            filterBtn.disabled = false;
        }
    };

    let filters = [ ...config.iconicTaxa ] || [];
    checkButtonState(filters, false);

    const fungiIcon = document.querySelector('#fungi > div');
    if(elem.hasClass(fungiIcon, 'iconic-taxa-selected')) {
        fungiIcon.querySelector('g g').classList.add('svg-icon-selected');
    }

    icons.forEach(category => {
        category.addEventListener('click', event => {
            const _category = category;
            const filter = event.currentTarget;
            const filterId = filter.parentElement.id;                       

            if(filters.find(f => f === filterId)) {
                if(filterId === 'fungi') {
                    filter.querySelector('g g').classList.remove('svg-icon-selected');                    
                }
                filter.classList.remove(filterSelectedClass);
                filters = filters.filter(f => f !== filterId);
            } else {
                if(filterId === 'fungi') {
                    filter.querySelector('g g').classList.add('svg-icon-selected');
                }
                filter.classList.add(filterSelectedClass);
                filters.push(filterId);
            }    
            checkButtonState(filters, true);
        });
    });

    filterBtn.addEventListener('click', event => {
        document.querySelector('#iconicTaxaFilters .close span').click();
        config.iconicTaxa = filters;
        actions.boundUpdateConfig(config);
        filterListeners.forEach(listener => listener(filters, config));
    });

    const defaultRange = config.speciesRange;
    const range = document.getElementById('range');

    document.querySelector('.js-set-range-input').value = defaultRange;
    range.innerHTML = defaultRange;    
    
    const slider = document.querySelector('.js-set-range-input');

    const updateSlider  = event => {
        range.innerHTML = event.target.value;
    };

    slider.addEventListener('change', updateSlider);

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
};
