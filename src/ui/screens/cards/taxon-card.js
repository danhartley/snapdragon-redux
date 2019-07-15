import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { taxonInfoSlider } from 'ui/screens/common/info-slider';
import { renderTemplate } from 'ui/helpers/templating';
import { renderIcon } from 'ui/helpers/icon-handler';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';

import taxonTemplate from 'ui/screens/cards/taxon-card-template.html';

let transition;

document.querySelector('#cardModal .carousel').addEventListener('click', event => {    
    transition = event.target.dataset.transition;
});

export const renderTaxonCard = (collection, mode = 'STAND_ALONE', selectedItem, parent = DOM.rightBody, speciesTaxon, rank) => {
  
    try {

        const item = selectedItem || collection.nextItem;

        if(!item) {
            document.querySelector('#cardModal .close').click();
        }

        const { config } = store.getState();

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

        rank = rank ? rank.toUpperCase() : '';

        const taxon = rank 
                        ? rank === 'FAMILY' 
                            ? item.family 
                            : item.order
                        : item.family || item.order;

        const familyStats = itemProperties.getFamilyStats(collection.items);
        const occurrences = familyStats ? familyStats[taxon.name] : 0;
                
        const context = {
            rank: rank,
            name: taxon.name,
            headerImage: scaleImage({ url: item.images[0].url }, imageUseCases.TAXON_CARD, config),
            alt: taxon ? taxon.alt : '',
            vernacularName: taxon.vernacularName || itemProperties.getNestedTaxonProp(taxon, config.language, 'names', 'names', '0').split(',')[0],
            species: taxon.species || '--',
            genera: taxon.genera || '--',
            families: taxon.families || '--',
            identification: taxon.identification,
            summary: taxon.summary,
            eol: taxon.eol ? taxon.eol.replace('en', config.language) : '',
            wiki: taxon.wiki ? taxon.wiki.replace('en', config.language) : '',
            occurrences: occurrences,
            toxic: taxon.toxic ? `Toxic species: ${taxon.toxic.members.join(', ')}` : '',
            notableMembers: taxon.members ? R.take(2, taxon.members).join(', ') : ''
        }

        renderTemplate(context, template.content, parent, clone);

        if(taxon && taxon.traits) {
            taxonInfoSlider(taxon.traits, rootNode.querySelector('.js-taxon-info-box'), mode);
        }

        switch(rank) {
            case 'FAMILY': 
                rootNode.querySelector('.js-taxon-family').classList.add('hide-important');
                break;
            case 'ORDER':
                rootNode.querySelector('.js-taxon-rank').classList.add('hide-important');
                break;
        }

        renderIcon(item.taxonomy, rootNode);

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

        document.querySelector('.js-external-page-title').innerHTML = `${taxon.name}`;
        document.querySelector('.js-external-page-body').innerHTML = `<iframe class="modal-iframe" title="Wikipedia page for ${taxon.name}" src="${context.wiki}"></iframe>`;

        const membersCount = document.querySelector('#taxon-card-header .js-names-badge');

        if(!context.occurrences || context.occurrences === 0) membersCount.classList.add('hide-important');

        membersCount.addEventListener('click', event => {
            document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = `Members of the ${taxon.name} family`;
            const members = collection.items.filter(i => i.family === taxon.name);
            const list = document.querySelector('#badgeListModal .js-modal-text');
            list.innerHTML = '';
            members.forEach(member => {
                list.innerHTML += `<div>${member.name}</div>`;
            });
        });

    } catch(e) {

        setTimeout(() => {        
            switch(transition) {
                case 'next':
                    document.querySelector('#cardModal .carousel-control-next-icon').click();
                    break;
                case 'prev':
                    document.querySelector('#cardModal .carousel-control-prev-icon').click();
                    break;
            }
        });
    }
};