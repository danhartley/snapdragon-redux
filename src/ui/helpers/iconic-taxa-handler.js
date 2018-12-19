import * as R from 'ramda';

import { iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';

const listeners = [];

export const listenToTaxaFiltersUpdate = listener => { 
    listeners.push(listener);
};

export const handleIconicTaxaFilter = (config) => {
    
    document.querySelector('#aves div:nth-child(2)').innerHTML = 'Birds';
    document.querySelector('#amphibia div:nth-child(2)').innerHTML = 'Amphibians';
    document.querySelector('#mammalia div:nth-child(2)').innerHTML = 'Mammals';
    document.querySelector('#insecta div:nth-child(2)').innerHTML = 'Insects';
    document.querySelector('#fungi div:nth-child(2)').innerHTML = 'Fungi & Lichens';
    document.querySelector('#plantae div:nth-child(2)').innerHTML = 'Plants';

    const filterAllBtn = document.querySelector('.js-lesson-filters > button:nth-child(1)');
    // const filterLocalSpeciesBtn = document.querySelector('.js-lesson-filters > button:nth-child(2)');
    const setRangeBtn = document.querySelector('.js-set-range-btn');

    const filterSelectedClass = 'iconic-taxa-selected';
    let haveFiltersChanged = false;

    const icons = document.querySelectorAll('.iconic-taxa-categories > div > div:nth-child(1)');

    if(config.iconicTaxa && config.iconicTaxa.length > 0) {
        icons.forEach(icon => {
            const filterId = icon.parentElement.id;
            if(R.contains(filterId, config.iconicTaxa)) {
                icon.classList.add(filterSelectedClass);
            }
        });
    }

    const checkButtonState = filters => {
        if(filters.length === 0 && !haveFiltersChanged) {
            filterAllBtn.disabled = true;
            // filterLocalSpeciesBtn.disabled = true;
        } else {
            filterAllBtn.disabled = false;
            // filterLocalSpeciesBtn.disabled = false;
        }
    };

    let filters = config.iconicTaxa || [];
    checkButtonState(filters);

    icons.forEach(category => {
        category.addEventListener('click', event => {
            haveFiltersChanged = true;
            const filter = event.currentTarget;
            const filterId = filter.parentElement.id;                       
            if(elem.hasClass(filter, filterSelectedClass)) {
                filter.classList.remove(filterSelectedClass);
                filters = filters.filter(f => f !== filterId);
            }
            else {
                filter.classList.add(filterSelectedClass);
                filters.push(filterId);
            }                
            checkButtonState(filters);
            event.stopPropagation();
        });
    });

    filterAllBtn.addEventListener('click', event => {
        document.querySelector('#iconicTaxaFilters .close span').click();
        config.iconicTaxa = filters;
        actions.boundUpdateConfig(config);
        listeners.forEach(listener => listener(filters));
    });

    // filterLocalSpeciesBtn.addEventListener('click', event => {
    //     config.iconicTaxa = filters;
    //     actions.boundUpdateConfig(config);
    //     filterLocalSpeciesBtn.innerHTML = 'Updating filters...'; 
    //     setTimeout(() => {                
    //         filterLocalSpeciesBtn.innerHTML = 'Filters updated';                
    //         setTimeout(() => {
    //             filterLocalSpeciesBtn.innerHTML = 'Set new filters';
    //         }, 1500);
    //     }, 1500);
    // }); 

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
        setTimeout(() => {                
            setRangeBtn.innerHTML = 'Range updated';                
            setTimeout(() => {
                setRangeBtn.innerHTML = 'Set new range';
            }, 1500);
        }, 1500);
    });
};
