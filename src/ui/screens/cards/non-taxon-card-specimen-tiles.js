import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler } from 'ui/helpers/image-handlers';
import { subscribeToNonTaxaSelection } from 'ui/screens/cards/non-taxon-card';
import mixedSpecimenTemplate from 'ui/screens/multichoice/mixed-specimen-tiles-template.html';

export const renderNonTaxonCardSpecimenTiles = collection => {

    const { config } = store.getState(); 

    const callback = images => {

        const template = document.createElement('template');

        template.innerHTML = mixedSpecimenTemplate;

        const parent = DOM.leftBody;
        parent.innerHTML = '';

        renderTemplate({images}, template.content, parent);

        modalImagesHandler(document.querySelectorAll('.js-tiles .square'), null, collection, config);
    };

    const item = collection.nextItem;

    if(!item) return;

    subscribeToNonTaxaSelection(callback);    
};