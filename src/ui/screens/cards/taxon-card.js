import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { taxa } from 'api/snapdragon/taxa';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';
import taxonTemplate from 'ui/screens/cards/taxon-template.html';

export const renderTaxonCard = (collection, isModalMode = false, selectedItem, parent = DOM.rightBody, family) => {
  
    const item = selectedItem || collection.nextItem;

    const { lessonPlan, config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = taxonTemplate;
    
    const clone = document.importNode(template.content, true);

    parent.innerHTML = '';

    const itemFamily = family || item.family;
    const taxon = taxa.find(f => f.name === itemFamily);
    
    const context = {
        rank: 'family',
        name: itemFamily,
        headerImage: scaleImage({ url: item.images[0].url }, imageUseCases.TAXON_CARD, config),
        alt: taxon.alt,
        vernacularName: itemProperties.getNestedTaxonProp(taxon, config.language, 'names', 'names', '0'),
        species: taxon.species || '--',
        genera: taxon.genera || '--',
        identification: itemProperties.getNestedTaxonProp(taxon, config.language, 'descriptions', 'identification'),
        summary: itemProperties.getNestedTaxonProp(taxon, config.language, 'descriptions', 'summary'),
        eol: taxon.eol ? taxon.eol.replace('en', config.language) : '',
        wiki: taxon.wiki ? taxon.wiki.replace('en', config.language) : '',
        occurrences: collection.familyStats ? collection.familyStats[taxon.name] : 0,
        toxic: taxon.toxic ? `Toxic species: ${taxon.toxic.members.join(', ')}` : '',
        notableMembers: taxon.members ? R.take(2, taxon.members).join(', ') : ''
    }

    const continueBtn = clone.querySelector('.js-taxon-card-btn button');

    continueBtn.disabled = true;

    setTimeout(() => {
        continueBtn.disabled = false;            
    }, 500);

    renderTemplate(context, template.content, parent, clone);

    if(isModalMode) {
        document.querySelector('#speciesCardModal .js-modal-text-title').innerHTML = collection.name;
        continueBtn.classList.add('hide-important');
        document.querySelector('.js-external-links').classList.add('hide');
    } else {
        continueBtn.addEventListener('click', event => {
            actions.boundEndRevision({ layoutCount: lessonPlan.layoutCount });
        });
    }
    
    // if(taxon.toxic) {
    //     document.querySelector('.js-taxon-toxic-warning').innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    // }

    document.querySelector('.js-external-page-title').innerHTML = `${itemFamily}`;
    document.querySelector('.js-external-page-body').innerHTML = `<iframe class="modal-iframe" title="Wikipedia page for ${itemFamily}" src="${context.wiki}"></iframe>`;

    const membersCount = document.querySelector('.js-names-badge');

    if(context.occurrences === 0) membersCount.classList.add('hide');

    membersCount.addEventListener('click', event => {
        document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = `Members of the ${itemFamily} family`;
        const members = collection.items.filter(i => i.family === itemFamily);
        const list = document.querySelector('#badgeListModal .js-modal-text');
        list.innerHTML = '';
        members.forEach(member => {
            list.innerHTML += `<div>${member.name}</div>`;
            // list.innerHTML += `<div>${member.name} (${item.vernacularName})</div>`;
        });
    });
};