import * as R from 'ramda';

import { elem } from 'ui/helpers/class-behaviour';
import { allIconicTaxa } from 'snapdragon-config/snapdragon-collections';
import { renderSpeciesPicker } from 'ui/create-guide-modal/species-picker';
import { renderTemplate } from 'ui/helpers/templating';

import categoriesTemplate from 'ui/create-guide-modal/categories-template.html';

export const renderCategories = (modal, createGuide) => {

    const config = createGuide.getConfig();

    const guideTxt = modal.querySelector('.js-guide-text');
    const linkTxt = modal.querySelector('.js-species-names-link');

    linkTxt.classList.remove('hide-important');
    linkTxt.removeEventListener('click',  renderSpeciesPicker);
    linkTxt.addEventListener('click',  renderSpeciesPicker);

    const filterSelectedClass = 'iconic-taxa-selected';

    guideTxt.innerHTML = config.isLandscapeMode
                            ? 'Click on the taxa that interest you.'
                            : 'Tap on the taxa that interest you.'

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

    config.guide.iconicTaxa = iconicTaxa.length === 0 ? allIconicTaxa : iconicTaxa;     

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

            createGuide.setConfig(config);
            createGuide.saveStep('SPECIES');            
        });
    });

    createGuide.saveStep('SPECIES');

    document.querySelector('.js-arrow-wrapper').innerHTML = '<i class="far fa-arrow-alt-circle-right"></i>';
};