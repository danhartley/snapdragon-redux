import * as R from 'ramda';

import { elem } from 'ui/helpers/class-behaviour';
import { renderTemplate } from 'ui/helpers/templating';
import categoriesTemplate from 'ui/create-guide-modal/categories-template.html';

export const renderCategories = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    createGuide.save(config, 'SPECIES', false)();
    const saveYourChangesBtn = createGuide.save(config, 'SPECIES');

    const filterSelectedClass = 'iconic-taxa-selected';

    guideTxt.innerHTML = 'Filter species by category';

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
            if(R.contains(filterId, config.guide.iconicTaxa.map(taxon => taxon.id))) {
                icon.classList.add(filterSelectedClass);
            }
        });
    }

    config.guide.iconicTaxa = iconicTaxa;        

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

            config.guide.iconicTaxa = iconicTaxa;

            saveYourChangesBtn();
            
        });
    });
};