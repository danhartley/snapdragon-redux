import * as R from 'ramda';

import { elem } from 'ui/helpers/class-behaviour';
import { saveButton } from 'ui/modals/common/save-button';
import { renderTemplate } from 'ui/helpers/templating';
import categoriesTemplate from 'ui/modals/categories-list-template.html';

export const renderCategories = (config, modal) => {

    const guideTxt = modal.querySelector('.guide-text');
    // const guideSubTxt = modal.querySelector('.guide-sub-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');

    const saveYourChangesBtn = saveButton(modal.querySelector('.js-save-your-changes'), config);

    
    const filterSelectedClass = 'iconic-taxa-selected';

    guideTxt.innerHTML = 'Filter species';
    // guideSubTxt.innerHTML = '(You haven\'t applied any filters yet all species will be included in the guide.)'; 

    // const addAndToEndOfList = (str, replacement = ', and ') => {
    //     return str.replace(/,([^,]*)$/,replacement+'$1'); 
    // };

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

    // const defaultNoFiltersTxt = '(You haven\'t applied any filters so all species will be included in the guide by default.)';
    // const getFiltersTxt = str => {
    //     return `Species will be included from ${str}.`;
    // };

    // guideSubTxt.innerHTML = filtersCommon.length > 0 
    //         ? getFiltersTxt(addAndToEndOfList(filtersCommon.join(', ')))
    //         : defaultNoFiltersTxt;

    chosen.innerHTML = filtersCommon.length > 0 ? filtersCommon.join(', ') : 'All categories';

    const checkButtonState = (filters, noChangesToSave) => {
        saveYourChangesBtn.disabled = noChangesToSave;
        config.iconicTaxa = filters;
    };

    let filters = [ ...config.iconicTaxa ] || [];
    
    checkButtonState(filters, true);

    const fungiIcon = modal.querySelector('#fungi > div');
    if(elem.hasClass(fungiIcon, 'iconic-taxa-selected')) {
        fungiIcon.querySelector('g g').classList.add('svg-icon-selected');
    }
    
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

            // guideSubTxt.innerHTML = filters.length > 0 
            //     ? getFiltersTxt(addAndToEndOfList(filtersCommon.join(', ')))
            //     : defaultNoFiltersTxt;

            chosen.innerHTML = filtersCommon.join(', ');

            checkButtonState(filters, false);
        });
    });
};