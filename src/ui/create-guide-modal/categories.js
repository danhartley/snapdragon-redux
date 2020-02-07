import * as R from 'ramda';

import { elem } from 'ui/helpers/class-behaviour';
import { iconicTaxa } from 'snapdragon-config/snapdragon-iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';

import categoriesTemplate from 'ui/create-guide-modal/categories-template.html';

export const renderCategories = (modal, createGuide) => {

    const config = createGuide.getConfig();
          config.guide.iconicTaxa = config.guide.iconicTaxa || iconicTaxa.all;

    const filterSelectedClass = 'iconic-taxa-selected';

    const template = document.createElement('template');
          template.innerHTML = categoriesTemplate;
    
    const parent = modal.querySelector('.js-actions');
          parent.innerHTML = '';
    
    renderTemplate({}, template.content, parent);

    const icons = parent.querySelectorAll('.js-iconic-taxa-categories > div > div:nth-child(1)');
    
    if(config.guide.iconicTaxa) {
        icons.forEach(icon => {
            const filterId = icon.parentElement.id;
            if(R.contains(filterId, config.guide.iconicTaxa.map(taxon => taxon.id))) {
                icon.classList.add(filterSelectedClass);
            }
        });
    }

    setTimeout(() => {
        const fungiIcon = modal.querySelector('#fungi > div');
        if(!fungiIcon) return;
        if(elem.hasClass(fungiIcon, 'iconic-taxa-selected')) {
            fungiIcon.querySelector('g g').classList.add('svg-icon-selected');
        }   
    },250);
    
    config.guide.hasChanged = false;

    icons.forEach(category => {
        category.addEventListener('click', event => {

            config.guide.hasChanged = true;
            
            const filter = event.currentTarget;
            const filterId = filter.parentElement.id;        
            const commonName = filter.parentElement.innerText;              

            if(config.guide.iconicTaxa.find(taxon => taxon.id === filterId)) {
                
                if(filterId === 'fungi') {
                    filter.querySelector('g g').classList.remove('svg-icon-selected');                    
                }
                if(config.guide.iconicTaxa.length > 1) {
                    filter.classList.remove(filterSelectedClass);
                    config.guide.iconicTaxa = config.guide.iconicTaxa.filter(taxon => taxon.id !== filterId);
                }

            } else {

                if(filterId === 'fungi') {
                    filter.querySelector('g g').classList.add('svg-icon-selected');
                }
                filter.classList.add(filterSelectedClass);

                config.guide.iconicTaxa.push(
                    {
                        id: filterId,
                        common: commonName    
                    }
                )
            }

            createGuide.setConfig(config);
            createGuide.saveStep('TAXA');            
        });
    });

    createGuide.saveStep('TAXA');

    document.querySelector('.js-arrow-wrapper').innerHTML = '<i class="far fa-arrow-alt-circle-right"></i>';
};