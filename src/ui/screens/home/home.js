import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollectionList, listenToSpeciesCollectionListenReady } from 'ui/screens/lists/species-list';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import homeTemplate from 'ui/screens/home/home-template.html';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { renderGuideSummary } from 'ui/screens/home/home-guide';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';

export const renderHome = counter => {

    let { config, collection } = store.getState();

    const template = document.createElement('template');
    template.innerHTML = homeTemplate;

    DOM.rightBody.innerHTML = '';

    renderTemplate({}, template.content, DOM.rightBody);

    let state = config.collection.id === 0
            ? 'MODAL' : (collection && collection.layoutCounter > 0)
                ? 'RESUME-LESSON'
                : 'PREVIEW-LESSON';

    const actionLink = document.querySelector('.js-create-guide-link');
    const deleteLink = document.querySelector('.js-delete-guide-link');
    const deleteLinkTxt = document.querySelector('.js-delete-guide-link span');
    const deleteLinkCheckbox = document.querySelector('.js-delete-guide-link input');
    
    const modalHandler = () => {        
        const step = 1;
        createGuideHandler(step);
    };

    const previewHandler = () => {
        const { config, collections } = store.getState();  
        const id = parseInt(config.collection.id);
        const collection = collections.find(c => c.id === id);
        // subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
        renderSpeciesCollectionList(collection);        
    };

    const lessonHandler = () => {
        const { collection, config, history } = store.getState();
        const lessonStateMode = 'newLesson';
        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, actionLink);
        subscription.getByName('renderHome').forEach(sub => subscription.remove(sub));
        subscription.getByName('renderSpeciesGrid').forEach(sub => subscription.remove(sub));
    };

    const resumeLessonHandler = () => {
        subscription.getByName('renderHome').forEach(sub => subscription.remove(sub));
        const { collection, config, history } = store.getState();
        const lessonStateMode = 'restartLesson';
        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, actionLink);
    };

    const guidesummary = () => {
        const parent = document.querySelector('.home-container .snapdragon-tag');
        parent.innerHTML = '';
        renderGuideSummary(R.clone(config), parent);
        deleteLink.classList.remove('hide');            
    };

    actionLink.removeEventListener('click');

    const checkState = state => {

        actionLink.removeEventListener('click');
        
        switch(state) {
            case 'MODAL':
                actionLink.setAttribute('data-toggle', 'modal');
                actionLink.innerHTML = 'Create';
                actionLink.addEventListener('click', modalHandler);
                break;
            case 'PREVIEW-LESSON':
                actionLink.removeAttribute('data-toggle');                
                actionLink.innerHTML = 'Preview';
                guidesummary();
                actionLink.addEventListener('click', previewHandler);
                break;
            case 'BEGIN-LESSON':
                actionLink.innerHTML = 'Begin';
                actionLink.addEventListener('click', lessonHandler);
                // subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub)); 
                break;                
            case 'RESUME-LESSON':
                actionLink.innerHTML = 'Resume';    
                guidesummary();
                actionLink.addEventListener('click', resumeLessonHandler);
                // subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
                renderSpeciesCollectionList(collection);
                break;
        }   
    }; 

    checkState(state);

    deleteLinkCheckbox.addEventListener('click', event => {
        const checked = event.target.checked;
        if(checked) {
            deleteLinkTxt.classList.add('active');
            deleteLinkTxt.classList.remove('disabled');
        } else {
            deleteLinkTxt.classList.remove('active');
            deleteLinkTxt.classList.add('disabled');
        }
    });

    deleteLinkTxt.addEventListener('click', event => {
        // delete guide
        actionLink.innerHTML = 'Create';
        state = 'MODAL';
        checkState(state);
    });

    listenToCloseCreateGuideModal(()=>{
        config = store.getState().config;
        state = 'PREVIEW-LESSON';
        checkState(state);
    });

    listenToSpeciesCollectionListenReady(()=>{        
        if(!counter.isLessonPaused) {
            state = 'BEGIN-LESSON';
            checkState(state);
        }        
    });
};