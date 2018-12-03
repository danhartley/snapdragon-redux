import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { selectHandler } from 'ui/helpers/handlers';
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

export const renderNonTaxonCard = collection => {

    const { enums, config, lessonPlan } = store.getState();

    const nonTaxa = group.getNonTaxa(enums).filter(nt => nt.group === group.nonTaxaGroup[0].LICHEN_FORM);

    nonTaxa.forEach(nt => {
        nt.name = nt.names.find(name => name.language === config.language).name;
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
        return R.take(4, itemImages);
    };

    const callback = id => {

        const header = document.querySelector('.btn-non-taxa');

        const nonTaxon = nonTaxa.find(nt => nt.id === id)
        const items = collection.items.filter(i => R.contains(i.name, nonTaxon.examples));

        header.innerHTML = nonTaxon.name;

        const portraitImagesNode = document.querySelector('.js-non-taxon-card-images');

        const images = prepImages(items);

        config.isPortraitMode ? imageSlider(config, images, portraitImagesNode, true) : onChange(images);

        const wikiNode = document.querySelector('.js-non-taxon-card-wiki');
        const lookup = { name: nonTaxon.name };

        const idNode = document.querySelector('.id-box > div:nth-child(2) > div');
        idNode.innerHTML = nonTaxon.quickId;

        const definitionNode = document.querySelector('.js-non-taxa-definition');
        definitionNode.innerHTML = nonTaxon.definition;

        const infoNode = document.querySelector('.js-info-box');
        infoSlider({traits:nonTaxon.traits}, infoNode);

        renderWikiModal(lookup, wikiNode, config);    
        renderWiki(wikiNode, lookup, config.language);
    };

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({group: nonTaxa}, template.content, parent);

    selectHandler('.dropdown.js-non-taxa .dropdown-item.icon', id => callback(id));
    document.getElementById(`${nonTaxa[0].id}`).click();
    
    const continueBtn = document.querySelector('.js-non-taxon-card-btn button');
    continueBtn.addEventListener('click', event => {
        actions.boundEndRevision({ layoutCount: lessonPlan.layoutCount });
    });
};