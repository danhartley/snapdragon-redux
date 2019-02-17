import * as R from 'ramda';

import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';

export const renderCategories = (config, modal) => {

    const icons = modal.querySelectorAll('.iconic-taxa-categories > div > div:nth-child(1)');
    const filterBtn = modal.querySelector('.categories > div:last-child button');
    const filterUpdateTxt = modal.querySelector('.categories > div:last-child div');
    const filterSelectedClass = 'iconic-taxa-selected';

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

    const fungiIcon = modal.querySelector('#fungi > div');
    if(elem.hasClass(fungiIcon, 'iconic-taxa-selected')) {
        fungiIcon.querySelector('g g').classList.add('svg-icon-selected');
    }
    
    icons.forEach(category => {
        category.addEventListener('click', event => {
            
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

    filterBtn.removeEventListener('click');
    filterBtn.addEventListener('click', event => {
        config.iconicTaxa = filters;
        actions.boundUpdateConfig(config);
        filterBtn.disabled = true;
        filterUpdateTxt.innerHTML = 'Categories updated';
        setTimeout(() => {
            filterBtn.disabled = false;
            filterUpdateTxt.innerHTML = '';
        }, 1500);
    });
};