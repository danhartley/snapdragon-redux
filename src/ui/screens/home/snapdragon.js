import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { snapdragonCollections } from 'snapdragon/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import snapdragonTemplate from 'ui/screens/home/snapdragon-template.html';
import { listenToTaxaFiltersUpdate } from 'ui/helpers/iconic-taxa-handler';


const renderSnapdragonTempla = (snapdragonTemplate, DOM, snapdragonCollections, renderTemplate) => {

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const collections = snapdragonCollections;

    const context = { collections };

    renderTemplate(context, template.content, parent, clone);
};

export const renderSnapdragon = (counter) => {

    if(counter.isLessonPaused) return;

    renderSnapdragonTempla(snapdragonTemplate, DOM, snapdragonCollections, renderTemplate);
};

listenToTaxaFiltersUpdate((filters, config) => {
    let collections = snapdragonCollections.filter(c => R.contains(c.iconicTaxon, filters));
    collections = collections.length === 0 ? snapdragonCollections : collections;
    renderSnapdragonTempla(snapdragonTemplate, DOM, collections, renderTemplate);
});  