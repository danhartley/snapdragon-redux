import * as R from 'ramda';

import { elem } from 'ui/helpers/class-behaviour';
import { saveButton } from 'ui/create-guide-modal/common/save-button';
import { renderTemplate } from 'ui/helpers/templating';
import categoriesTemplate from 'ui/create-guide-modal/categories-list-template.html';

export const renderCategories = (modal, config) => {

    const guideTxt = modal.querySelector('.guide-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');

    const saveYourChangesBtn = saveButton(modal.querySelector('.js-save-your-changes'), config, chosen, 'SPECIES');

    
    const filterSelectedClass = 'iconic-taxa-selected';

    guideTxt.innerHTML = 'Select the species you are interested in';

    let filtersCommon = [];


    const template = document.createElement('template');
    template.innerHTML = categoriesTemplate;
    const parent = modal.querySelector('.js-actions');
    parent.innerHTML = '';
    renderTemplate({}, template.content, parent);

    const icons = parent.querySelectorAll('.iconic-taxa-categories > div > div:nth-child(1)');

    if(config.iconicTaxa && config.iconicTaxa.length > 0) {
        icons.forEach(icon => {
            const filterId = icon.parentElement.id;
            if(R.contains(filterId, config.iconicTaxa)) {
                filtersCommon.push(icon.parentElement.innerText);
                icon.classList.add(filterSelectedClass);
            }
        });
    }

    chosen.innerHTML = filtersCommon.length > 0 ? filtersCommon.join(', ') : 'All categories';

    const checkButtonState = (filters, noChangesToSave) => {
        saveYourChangesBtn.disabled = noChangesToSave;
        config.iconicTaxa = filters;
    };

    let filters = [ ...config.iconicTaxa ] || [];
    
    checkButtonState(filters, true);

    setTimeout(() => {
        const fungiIcon = modal.querySelector('#fungi > div');
        if(!fungiIcon) return;
        if(elem.hasClass(fungiIcon, 'iconic-taxa-selected')) {
            fungiIcon.querySelector('g g').classList.add('svg-icon-selected');
        }   
    },250);
    
    icons.forEach(category => {
        category.addEventListener('click', event => {
            
            const filter = event.currentTarget;
            const filterId = filter.parentElement.id;        
            const commonName = filter.parentElement.innerText;              

            if(filters.find(f => f === filterId)) {
                if(filterId === 'fungi') {
                    filter.querySelector('g g').classList.remove('svg-icon-selected');                    
                }
                filter.classList.remove(filterSelectedClass);
                filters = filters.filter(f => f !== filterId);
                filtersCommon = filtersCommon.filter(f => f !== commonName);
            } else {
                if(filterId === 'fungi') {
                    filter.querySelector('g g').classList.add('svg-icon-selected');
                }
                filter.classList.add(filterSelectedClass);
                filters.push(filterId);
                filtersCommon.push(commonName);
            }

            chosen.innerHTML = filtersCommon.join(', ');

            checkButtonState(filters, false);
        });
    });
};