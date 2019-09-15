import * as R from 'ramda';

import { utils } from 'utils/utils';
import { firestore } from 'api/firebase/firestore';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';
import * as group from 'api/snapdragon/non-taxa';
import { renderWiki } from 'wikipedia/wiki';
import { renderWikiModal } from 'wikipedia/wiki-modal';
import { renderTemplate } from 'ui/helpers/templating';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';

import cardTemplate from 'ui/screens/cards/non-taxon-card-template.html';

const subscriptions = [];

export const subscribeToNonTaxaSelection = callback => {
    subscriptions.push(callback);
};

export const renderNonTaxonCard = (mode = 'STAND_ALONE', keyTrait, parent = DOM.rightBody, url) => {

    const prev = document.querySelector('#cardModal .js-prev');
    const next = document.querySelector('#cardModal .js-next');
    if(prev) prev.style.display = 'none';
    if(next) next.style.display = 'none';

    const { enums, config } = store.getState();

    const nonTaxa = group.getNonTaxa(enums).filter(nt => nt.group === group.nonTaxaGroup[0].LICHEN_FORM);

    nonTaxa.forEach(nt => {
        nt.name = itemProperties.getVernacularName(nt, config, false, 'name');
    });

    const template = document.createElement('template');

    template.innerHTML = cardTemplate;
    
    const onChange = items => {
        subscriptions.forEach(sub => sub(items));
    };

    const prepImages = (items) => {
        const itemImagesArray = items.map(item => {
            return prepImagesForCarousel(item, config, imageUseCases.NON_TAXON_CARD);
        });
        const itemImages = utils.shuffleArray([].concat(...itemImagesArray));
        return R.take(9, itemImages);
    };

    const callback = async id => {

        const nonTaxon = nonTaxa.find(nt => nt.id === id)

        let items = await firestore.getSpeciesByNameInParallel(nonTaxon.examples);
            items = items.filter(item => item.images);

        const portraitImagesNode = document.querySelector('.js-non-taxon-card-images');

        const images = prepImages(items);

        if(nonTaxon.type) {
            document.querySelector('.js-species-header img').src = `https://content.eol.org/data/media/${nonTaxon.url}`;
        } else {
            config.isPortraitMode ? imageSlider({ config, images, portraitImagesNode, disableModal: true }) : onChange(images);
        }

        const wikiNode = document.querySelector('.js-non-taxon-card-wiki');
        const lookup = { name: nonTaxon.name };

        const idNode = document.querySelector('.id-box > div:nth-child(2) > div');
              idNode.innerHTML = nonTaxon.quickId;

        const definitionNode = document.querySelector('.js-non-taxa-definition div');
              definitionNode.innerHTML = nonTaxon.definition;

        const nameNode = document.querySelector('.js-non-taxon-card .js-names-container > div:nth-child(1)');
              nameNode.innerHTML = nonTaxon.id;

        if(mode === 'MODAL') {
        } else {
            renderWikiModal(lookup, wikiNode, config);    
            renderWiki(wikiNode, lookup, config.language);
        }
    };

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

    parent.innerHTML = '';

    renderTemplate({group: nonTaxa, image: scaleImage({ url })}, template.content, parent);

    if(mode === 'MODAL') {
        rootNode.querySelector('#cardModal .js-modal-text-title').innerHTML = `Lichen Forms`;
    }

    rootNode.querySelectorAll('.js-non-taxa .btn.btn-secondary').forEach(form => {
        form.addEventListener('click', event => {
            const id = event.target.id;
            callback(id);
        });
    });

    const id = keyTrait || nonTaxa[0].id;
    document.getElementById(id).click();
};