import * as R from 'ramda';

import { elem } from 'ui/helpers/class-behaviour';
import { renderTemplate } from 'ui/helpers/templating';
import categoriesTemplate from 'ui/create-guide-modal/categories-list-template.html';

export const renderCategories = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    const saveYourChangesBtn = createGuide.save(config, chosen, 'SPECIES');

    const filterSelectedClass = 'iconic-taxa-selected';

    guideTxt.innerHTML = 'Select the species you are interested in';

    let iconicTaxa = [ ...config.guide.iconicTaxa ] || [];

    const template = document.createElement('template');
    template.innerHTML = categoriesTemplate;
    const parent = modal.querySelector('.js-actions');
    parent.innerHTML = '';
    renderTemplate({}, template.content, parent);

    const icons = parent.querySelectorAll('.js-iconic-taxa-categories > div > div:nth-child(1)');

    if(config.guide.iconicTaxa && config.guide.iconicTaxa.length > 0) {
        icons.forEach(icon => {
            const filterId = icon.parentElement.id;
            if(R.contains(filterId, config.guide.iconicTaxa)) {
                icon.classList.add(filterSelectedClass);
            }
        });
    }

    chosen.innerHTML = (iconicTaxa && iconicTaxa.length > 0) ? iconicTaxa.map(taxon => taxon.common).join(', ') : 'All species';

    const checkButtonState = (filters, noChangesToSave) => {
        saveYourChangesBtn.disabled = noChangesToSave;
        config.guide.iconicTaxa = filters;
    };

    checkButtonState(iconicTaxa, true);

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

            if(iconicTaxa.find(taxon => taxon.id === filterId)) {
                if(filterId === 'fungi') {
                    filter.querySelector('g g').classList.remove('svg-icon-selected');                    
                }
                filter.classList.remove(filterSelectedClass);
                iconicTaxa = iconicTaxa.filter(taxon => taxon.id !== filterId);
            } else {
                if(filterId === 'fungi') {
                    filter.querySelector('g g').classList.add('svg-icon-selected');
                }
                filter.classList.add(filterSelectedClass);

                iconicTaxa.push(
                    {
                        id: filterId,
                        common: commonName    
                    }
                )
            }

            chosen.innerHTML = iconicTaxa.map(taxon => taxon.common).join(', ');

            checkButtonState(iconicTaxa, false);
        });
    });
};