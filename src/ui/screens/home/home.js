import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store, persistor } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollectionList, listenToSpeciesCollectionListenReady } from 'ui/screens/lists/species-list';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import homeTemplate from 'ui/screens/home/home-template.html';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { renderGuideSummary } from 'ui/screens/home/home-guide-summary';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';

export const renderHome = () => {

    let { counter, config, collection } = store.getState();

    if(counter.isLessonRehydrated && counter.index && counter.index > 0) return;
    
    const sub = subscription.getByName('renderHome');
    if(sub) subscription.remove(sub);

    const template = document.createElement('template');
    template.innerHTML = homeTemplate;

    DOM.rightBody.innerHTML = '';

    renderTemplate({}, template.content, DOM.rightBody);

    let state = config.collection.id === 0
            ? 'MODAL' : (collection && collection.layoutCounter > 0)
                ? 'RESUME-LESSON'
                : 'PREVIEW-LESSON';

    let actionLink = document.querySelector('.js-create-guide-link');
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
        
        renderSpeciesCollectionList(collection);
    };

    const lessonHandler = () => {
        const { collection, config, history } = store.getState();
        const lessonStateMode = 'newLesson';
        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, actionLink);
        subscription.remove(subscription.getByName('renderSpeciesGrid'));
    };

    const resumeLessonHandler = () => {
        const { collection, config, history } = store.getState();
        const lessonStateMode = 'restartLesson';
        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, actionLink);        
    };

    const guidesummary = (speciesCount) => {
        const parent = document.querySelector('.home-container .js-snapdragon-tag');
        parent.innerHTML = '';
        renderGuideSummary(R.clone(config), parent, speciesCount);
        deleteLink.classList.remove('hide');            
    };

    const checkState = state => {

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
                actionLink.removeEventListener(previewHandler);
                actionLink.addEventListener('click', previewHandler);
                break;
            case 'BEGIN-LESSON':
                actionLink.innerHTML = 'Begin';
                actionLink.addEventListener('click', lessonHandler);
                
                break;                
            case 'RESUME-LESSON':
                actionLink.removeAttribute('data-toggle');
                actionLink.innerHTML = 'Resume';    
                guidesummary(collection.items.length);
                actionLink.addEventListener('click', resumeLessonHandler);                
                renderSpeciesCollectionList(collection);
                break;
        }   
    }; 

    checkState(state);

    let deleteEnabled = false;

    deleteLinkCheckbox.addEventListener('click', event => {
        deleteEnabled = event.target.checked;
        if(deleteEnabled) {
            deleteLinkTxt.classList.add('active');
            deleteLinkTxt.classList.remove('disabled');
        } else {
            deleteLinkTxt.classList.remove('active');
            deleteLinkTxt.classList.add('disabled');
        }
    });

    deleteLinkTxt.addEventListener('click', event => {
        if(deleteEnabled) {
            actionLink.innerHTML = 'Create';
            state = 'MODAL';
            checkState(state);
            persistor.purge();
            window.location.reload(true);          
        }
    });

    listenToCloseCreateGuideModal(()=>{
        config = store.getState().config;
        state = 'PREVIEW-LESSON';
        checkState(state);
    });

    const handleBeginLessonState = (counter, speciesCount) => {        
        if(!counter.isLessonPaused && counter.index === null) {
            actionLink.removeEventListener('click', previewHandler);
            state = 'BEGIN-LESSON';
            checkState(state);
            guidesummary(speciesCount);
        }        
    };

    listenToSpeciesCollectionListenReady(handleBeginLessonState);
};