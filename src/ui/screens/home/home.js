import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { handleCustomCollections } from 'ui/helpers/local-collection';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import homeTemplate from 'ui/screens/home/home-template.html';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { renderHomeGuide } from 'ui/screens/home/home-guide';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';

export const renderHome = () => {

    const { config } = store.getState();

    const template = document.createElement('template');
    template.innerHTML = homeTemplate;

    DOM.rightBody.innerHTML = '';

    renderTemplate({}, template.content, DOM.rightBody);

    const state = config.collection.id === 0 
            ? 'MODAL' : 'GUIDE';

    const actionLink = document.querySelector('.js-create-guide-link');
    
    const modalHandler = () => {        
        const step = 1;
        createGuideHandler(step);
    };

    const guideHandler = () => {
        const { config, collections, history, counter } = store.getState();  
        const id = parseInt(config.collection.id);
        const collection = collections.find(c => c.id === id);
        const lessonStateMode = counter.isLessonPaused ? 'restartLesson' : 'newLesson';
        subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
        renderSpeciesCollectionList(collection);
        // handleCustomCollections(null, actionLink, config, collection);    
        // lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, actionLink);
    };

    actionLink.removeEventListener('click');

    switch(state) {
        case 'MODAL':
            actionLink.setAttribute('data-toggle', 'modal');
            actionLink.addEventListener('click', modalHandler);
            break;
        case 'GUIDE':
            actionLink.removeAttribute('data-toggle');
            actionLink.innerHTML = 'Preview';
            // actionLink.innerHTML = (config.counter && config.counter > 0) ? 'Continue' : 'Start';
            actionLink.addEventListener('click', guideHandler);
            const parent = document.querySelector('.home-container .snapdragon-tag');
            parent.innerHTML = '';
            renderHomeGuide(R.clone(config), parent);
            break;
    }    
};

listenToCloseCreateGuideModal(renderHome);