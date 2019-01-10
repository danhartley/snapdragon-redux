import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { snapdragonCollections } from 'snapdragon/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import snapdragonTemplate from 'ui/screens/home/snapdragon-template.html';
import { listenToTaxaFiltersUpdate } from 'ui/helpers/iconic-taxa-handler';


const renderSnapdragonTempla = (snapdragonTemplate, DOM, snapdragonCollections, renderTemplate, filters) => {

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    let collections = [];
    
    if(filters && filters.length !== 0) {
        snapdragonCollections.forEach(collection => {
            collection.iconicTaxa.forEach(iconicTaxon => {
                filters.forEach(filter => {
                    if(filter === iconicTaxon) {
                        collections.push(collection);
                    }
                })
            })
        })
    } else {
        collections = snapdragonCollections;
    }

    const context = { collections };

    renderTemplate(context, template.content, parent, clone);
};

export const renderSnapdragon = (counter) => {

    if(counter.isLessonPaused) return;

    const { config } = store.getState();

    const filters = config.iconicTaxa;

    renderSnapdragonTempla(snapdragonTemplate, DOM, snapdragonCollections, renderTemplate, filters);
};

listenToTaxaFiltersUpdate((filters, config) => {    
    renderSnapdragonTempla(snapdragonTemplate, DOM, snapdragonCollections, renderTemplate, filters);
});  