import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { itemProperties } from 'ui/helpers/data-checking';
import { infoSlider } from 'ui/screens/common/info-slider';
import { imageSlider } from 'ui/screens/common/image-slider';
import * as group from 'api/snapdragon/non-taxa';
import { renderWiki } from 'wikipedia/wiki';
import { renderWikiModal } from 'wikipedia/wiki-modal';
import { renderTemplate } from 'ui/helpers/templating';
import { imageUseCases, prepImagesForCarousel } from 'ui/helpers/image-handlers';
import cardTemplate from 'ui/screens/cards/non-taxon-card-template.html';

const subscriptions = [];

export const subscribeToNonTaxaSelection = callback => {
    subscriptions.push(callback);
};

export const renderNonTaxonCard = (collection, isModalMode = false, keyTrait, parent = DOM.rightBody, imageUrl) => {

    const prev = document.querySelector('#speciesCardModal .js-prev');
    const next = document.querySelector('#speciesCardModal .js-next');
    if(prev) prev.style.display = 'none';
    if(next) next.style.display = 'none';

    const { enums, config, lessonPlan } = store.getState();

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

    const callback = id => {

        const nonTaxon = nonTaxa.find(nt => nt.id === id)
        const items = collection.items.filter(i => R.contains(i.name, nonTaxon.examples));

        const portraitImagesNode = document.querySelector('.js-non-taxon-card-images');

        const images = prepImages(items);

        if(nonTaxon.type) {
            document.querySelector('.js-species-header img').src = `https://content.eol.org/data/media/${nonTaxon.url}`;
        } else {
            config.isPortraitMode ? imageSlider(config, images, portraitImagesNode, true) : onChange(images);
        }

        const wikiNode = document.querySelector('.js-non-taxon-card-wiki');
        const lookup = { name: nonTaxon.name };

        const idNode = document.querySelector('.id-box > div:nth-child(2) > div');
        idNode.innerHTML = nonTaxon.quickId;

        const definitionNode = document.querySelector('.js-non-taxa-definition div');
        definitionNode.innerHTML = nonTaxon.definition;

        const infoNode = document.querySelector('.js-info-box');
        infoSlider({traits:nonTaxon.traits, name: `${keyTrait} lichen`}, nonTaxa, null, infoNode);

        if(isModalMode) {
        } else {
            renderWikiModal(lookup, wikiNode, config);    
            renderWiki(wikiNode, lookup, config.language);
        }
    };

    parent.innerHTML = '';

    renderTemplate({group: nonTaxa, imageUrl}, template.content, parent);

    document.querySelector('#speciesCardModal .js-modal-text-title').innerHTML = `Lichen Forms`;

    document.querySelectorAll('.non-taxon .btn.btn-secondary').forEach(form => {
        form.addEventListener('click', event => {
            const id = event.target.id;
            callback(id);
        });
    });

    const id = keyTrait || nonTaxa[0].id;
    document.getElementById(id).click();
};