import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { taxa } from 'api/snapdragon/taxa';
import taxonTemplate from 'ui/screens/cards/taxon-template.html';

export const renderTaxonCard = collection => {
  
    const item = collection.items[collection.itemIndex];
    const { layouts, config } = store.getState();

    item.questionCount = layouts.filter(l => l.name === 'test').length;
    item.layoutCount = layouts.length;

    const template = document.createElement('template');

    template.innerHTML = taxonTemplate;
    
    const clone = document.importNode(template.content, true);

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const taxon = taxa.find(f => f.name === item.family);
    let occurrences = {};

    collection.families.forEach( (item,index) => {
        let num = collection.families[index];
        occurrences[num] = occurrences[num] ? occurrences[num] + 1 : 1;
    });

    const language = "en";

    const context = {
        rank: 'family',
        name: item.family,
        img: taxon.thumb,
        alt: taxon.alt,
        common: taxon.names ? taxon.names.find(name => name.language === language).names[0] : taxon.alt,
        species: taxon.species || '--',
        genera: taxon.genera || '--',
        identification: `QUICK ID :- ${taxon.descriptions.find(name => name.language === language).identification}`,
        summary: taxon.descriptions.find(name => name.language === language).summary || '',
        eol: taxon['eol-entry'] || '',
        wiki: taxon['wiki-entry'] || '',
        occurrences: occurrences[taxon.name],
        toxic: taxon.toxic ? `Toxic species: ${taxon.toxic.members.join(', ')}` : '',
        members: taxon.members ? R.take(2, taxon.members).join(', ') : ''
    }

    clone.querySelector('button').addEventListener('click', event => {
        actions.boundEndRevision(item);
    });

    renderTemplate(context, template.content, parent, clone);

    if(taxon.toxic) {
        document.querySelector('.js-taxon-toxic-warning').innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    }

    document.querySelector('.js-external-page-title').innerHTML = `${item.family}`;
    document.querySelector('.js-external-page-body').innerHTML = `<iframe class="modal-iframe" title="Wikipedia page for ${item.family}" src="${context.wiki}"></iframe>`;

    document.querySelector('.badge').addEventListener('click', event => {
        document.querySelector('#listModal .js-modal-text-title').innerHTML = `Members of the ${item.family} family`;
        const members = collection.items.filter(i => i.family === item.family);
        const list = document.querySelector('#listModal .js-modal-text');
        list.innerHTML = '';
        members.forEach(member => {
            list.innerHTML += `<div>${member.name} (${itemProperties.vernacularName(member, config)})</div>`;
        });
    });
};