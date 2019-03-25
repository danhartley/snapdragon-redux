import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store, persistor } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollectionList, listenToSpeciesCollectionListenReady } from 'ui/screens/lists/species-list';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import homeTemplate from 'ui/screens/home/home-template.html';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { renderExampleGuideHandler } from 'ui/example-guide-modal/example-guide';
import { renderGuideSummary } from 'ui/screens/home/home-guide-summary';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';
import { listenToCloseExampleGuideModal } from 'ui/example-guide-modal/example-guide';

export const renderHome = counter => {

    let { config, collection } = store.getState();

    if(counter.index && counter.index > 0) return;
    
    const sub = subscription.getByName('renderHome');
    if(sub) subscription.remove(sub);

    const template = document.createElement('template');
    template.innerHTML = homeTemplate;

    DOM.rightBody.innerHTML = '';

    renderTemplate({}, template.content, DOM.rightBody);

    let state = (config.collection.id === 0 || !config.guide.ready)
            ? 'MODAL' : (collection && collection.layoutCounter > 0)
                ? 'RESUME-LESSON'
                : 'PREPARE-LESSON';

    let actionLink = document.querySelector('.js-create-guide-link');

    const editLink = document.querySelector('.js-edit-guide-link');
    const editLinkTxt = document.querySelector('.js-edit-guide-link span');

    const deleteLink = document.querySelector('.js-delete-guide-link');
    const deleteLinkTxt = document.querySelector('.js-delete-guide-link span');
    const deleteLinkCheckbox = document.querySelector('.js-delete-guide-link input');

    const exampleLink = document.querySelector('.js-example-guide-link');
    const exampleLinkTxt = document.querySelector('.js-example-guide-link span');

    const modalHandler = () => {        
        const step = 1;
        createGuideHandler(step);
    };

    const examplesHandler = () => {
        renderExampleGuideHandler(config);
    };

    const prepareHandler = () => {
        const { config, collections } = store.getState();  
        const id = parseInt(config.collection.id);
        const collection = collections.find(c => c.id === id);        
        renderSpeciesCollectionList(collection);
        actionLink.disabled = true;
        actionLink.classList.add('disabled');        
    };

    const lessonHandler = () => {
        const { collection, config, history } = store.getState();
        const lessonStateMode = 'new-lesson';
        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, actionLink);
        subscription.remove(subscription.getByName('renderSpeciesGrid'));
        actionLink.disabled = false;
    };

    const resumeLessonHandler = () => {
        const { collection, config, history } = store.getState();
        const lessonStateMode = 'restart-lesson';
        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, actionLink);        
        subscription.remove(subscription.getByName('renderSpeciesGrid'));
    };

    const guideSummary = (speciesCount) => {
        const parent = document.querySelector('.home-container .js-snapdragon-tag');
        parent.innerHTML = '';
        renderGuideSummary(R.clone(config), parent, speciesCount);
        deleteLink.classList.remove('hide');
        editLink.classList.remove('hide');
        exampleLink.classList.add('hide');
    };

    const checkState = state => {

        switch(state) {
            case 'MODAL':
                actionLink.setAttribute('data-toggle', 'modal');
                actionLink.innerHTML = 'Create';
                actionLink.addEventListener('click', modalHandler);
                break;
            case 'PREPARE-LESSON':
                actionLink.removeAttribute('data-toggle');               
                actionLink.innerHTML = 'Prepare';                
                guideSummary();
                actionLink.removeEventListener(prepareHandler);
                actionLink.addEventListener('click', prepareHandler);
                break;
            case 'BEGIN-LESSON':            
                actionLink.innerHTML = 'Begin';
                actionLink.addEventListener('click', lessonHandler);          
                break;
            case 'RESUME-LESSON':
                actionLink.removeAttribute('data-toggle');
                actionLink.innerHTML = 'Resume';    
                guideSummary(collection.items.length);
                editLink.classList.add('hide');
                actionLink.addEventListener('click', resumeLessonHandler);                
                renderSpeciesCollectionList(collection);
                break;
        }   
    }; 

    checkState(state);

    exampleLinkTxt.addEventListener('click', event => {
        examplesHandler();
    });

    editLinkTxt.addEventListener('click', event => {
        modalHandler();
    });

    let deleteEnabled = false;
    
    const handleDeleteLinkCheckbox = event => {
        deleteEnabled = event.target.checked;
        if(deleteEnabled) {
            deleteLinkTxt.classList.add('active');
            deleteLinkTxt.classList.remove('disabled');
        } else {
            deleteLinkTxt.classList.remove('active');
            deleteLinkTxt.classList.add('disabled');
        }
    };

    deleteLinkCheckbox.addEventListener('click', handleDeleteLinkCheckbox);

    const handleDeleteLinkTxt = event => {
        if(deleteEnabled) {
            actionLink.innerHTML = 'Create';
            state = 'MODAL';
            checkState(state);
            persistor.purge();
            window.location.reload(true);
        }
    };

    deleteLinkTxt.addEventListener('click', handleDeleteLinkTxt);

    const closeModalHandler = () => {
        config = store.getState().config;
        state = 'PREPARE-LESSON';
        checkState(state);
    };

    listenToCloseCreateGuideModal(closeModalHandler);

    listenToCloseExampleGuideModal(closeModalHandler);

    const handleBeginLessonState = (counter, speciesCount) => {        
        if(!counter.isLessonPaused && counter.index === null) {
            actionLink.removeEventListener('click', prepareHandler);
            state = 'BEGIN-LESSON';
            checkState(state);
            guideSummary(speciesCount);
        }        
    };

    listenToSpeciesCollectionListenReady(handleBeginLessonState);
};