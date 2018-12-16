import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { taxa } from 'api/snapdragon/taxa';
import taxonTemplate from 'ui/screens/cards/taxon-template.html';

export const renderTaxonCard = (collection, isModalMode = false, parent = DOM.rightBody, family) => {
  
    const item = collection.nextItem;
    const { lessonPlan, config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = taxonTemplate;
    
    const clone = document.importNode(template.content, true);

    parent.innerHTML = '';

    const itemFamily = family || item.family;
    const taxon = taxa.find(f => f.name === itemFamily);
    
    const context = {
        rank: 'family',
        name: item.family,
        img: `https://content.eol.org/data/media/${taxon.thumb}`,
        alt: taxon.alt,
        common: itemProperties.getNestedTaxonProp(taxon, config.language, 'names', 'names', '0'),
        species: taxon.species || '--',
        genera: taxon.genera || '--',
        identification: itemProperties.getNestedTaxonProp(taxon, config.language, 'descriptions', 'identification'),
        summary: itemProperties.getNestedTaxonProp(taxon, config.language, 'descriptions', 'summary'),
        eol: taxon.eol ? taxon.eol.replace('en', config.language) : '',
        wiki: taxon.wiki ? taxon.wiki.replace('en', config.language) : '',
        occurrences: collection.familyStats[taxon.name],
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

    document.querySelector('.js-external-page-title').innerHTML = `${item.family}`;
    document.querySelector('.js-external-page-body').innerHTML = `<iframe class="modal-iframe" title="Wikipedia page for ${item.family}" src="${context.wiki}"></iframe>`;

    document.querySelector('.badge').addEventListener('click', event => {
        document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = `Members of the ${item.family} family`;
        const members = collection.items.filter(i => i.family === item.family);
        const list = document.querySelector('#badgeListModal .js-modal-text');
        list.innerHTML = '';
        members.forEach(member => {
            list.innerHTML += `<div>${member.name} (${item.vernacularName})</div>`;
        });
    });
};