import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { taxa } from 'api/snapdragon/taxa';
import { renderIcon } from 'ui/helpers/icon-handler';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import taxonTemplate from 'ui/screens/cards/taxon-template.html';

export const renderTaxonCard = (collection, mode = 'STAND_ALONE', selectedItem, parent = DOM.rightBody, speciesTaxon, rank) => {
  
    const item = selectedItem || collection.nextItem;

    const { lessonPlan, config } = store.getState();

    let rootNode;

    switch(mode) {
        case 'STAND_ALONE':
            rootNode = document.querySelector('.right-body');
            break;
        case 'SWAP_OUT':
            rootNode = document.querySelector('.js-taxon-container');
            break;
        case 'MODAL':
            rootNode = document.querySelector('#cardModal');
            break;
    }

    const template = document.createElement('template');

    template.innerHTML = taxonTemplate;
    
    const clone = document.importNode(template.content, true);

    parent.innerHTML = '';

    let taxon, taxonName;

    rank = rank ? rank.toUpperCase() : '';

    switch(rank) {
        case 'FAMILY': 
            taxonName = speciesTaxon || item.family;
            taxon = taxa.find(f => f.name === taxonName);
            rank = rank || 'family';
            break;
        case 'ORDER':
            taxonName = speciesTaxon || item.taxonomy.order;
            taxon = taxa.find(f => f.name === taxonName);
            rank = rank || 'order';
            break;
        default:

            let activeTaxon = itemProperties.taxonHasTaxaData(item.taxonomy.family, taxa) 
                ? item.taxonomy.family
                : itemProperties.taxonHasTaxaData(item.taxonomy.order, taxa)
                    ? item.taxonomy.order
                    : null
        
            taxonName = activeTaxon || item.taxonomy.order;
            rank = taxonName;
            taxon = taxa.find(f => f.name === taxonName);

            break;
    }

    const context = {
        rank: rank,
        name: taxonName,
        headerImage: scaleImage({ url: item.images[0].url }, imageUseCases.TAXON_CARD, config),
        alt: taxon ? taxon.alt : '',
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

    renderTemplate(context, template.content, parent, clone);

    renderIcon(collection.nextItem, rootNode);

    if(mode === 'MODAL') {

        rootNode.querySelector('.js-external-links').classList.add('hide');

        rootNode.querySelector('#cardModal .js-modal-text-title').innerHTML = collection.name;

        const prev = rootNode.querySelector('#cardModal .js-prev > span');
        prev.dataset.id = item.id;
        prev.dataset.transition = 'prev';
        prev.dataset.modal = 'cardModal';

        const next = rootNode.querySelector('#cardModal .js-next > span');
        next.dataset.id = item.id;
        next.dataset.transition = 'next';
        next.dataset.modal = 'cardModal';

    }
    
    // if(taxon.toxic) {
    //     document.querySelector('.js-taxon-toxic-warning').innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    // }

    document.querySelector('.js-external-page-title').innerHTML = `${taxonName}`;
    document.querySelector('.js-external-page-body').innerHTML = `<iframe class="modal-iframe" title="Wikipedia page for ${taxonName}" src="${context.wiki}"></iframe>`;

    const membersCount = document.querySelector('#taxon-card-header .js-names-badge');

    if(!context.occurrences || context.occurrences === 0) membersCount.classList.add('hide');

    membersCount.addEventListener('click', event => {
        document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = `Members of the ${taxonName} family`;
        const members = collection.items.filter(i => i.family === taxonName);
        const list = document.querySelector('#badgeListModal .js-modal-text');
        list.innerHTML = '';
        members.forEach(member => {
            list.innerHTML += `<div>${member.name}</div>`;
            // list.innerHTML += `<div>${member.name} (${item.vernacularName})</div>`;
        });
    });
};