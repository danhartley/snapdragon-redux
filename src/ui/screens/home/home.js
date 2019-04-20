import * as R from 'ramda';

import { elem } from 'ui/helpers/class-behaviour';
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

export const renderHome = (counter, loadSpeciesList = true, noRecords = false) => {

    let { config, collection } = store.getState();

    let skip = counter.index !== null && counter.index >= 0 && !counter.isLessonPaused;

    if(skip) {
        const sub = subscription.getByName('renderHome');
        if(sub) subscription.remove(sub);    
        return;
    }
    
    const sub = subscription.getByName('renderHome');
    if(sub) subscription.remove(sub);

    const template = document.createElement('template');
    template.innerHTML = homeTemplate;

    DOM.rightBody.innerHTML = '';

    renderTemplate({}, template.content, DOM.rightBody);

    let state = (config.collection.id === 0 || !config.guide.ready)
            ? 'CREATE-LESSON' : (collection && collection.layoutCounter > 0)
                ? 'RESUME-LESSON'
                : noRecords
                    ? 'CREATE-LESSON'
                    : 'PREPARE-LESSON';

    const actionLink = document.querySelector('.js-create-guide-link');
    
    const editLink = document.querySelector('.js-edit-guide-link');
    const editLinkTxt = document.querySelector('.js-edit-guide-link span');
    
    const deleteLink = document.querySelector('.js-delete-guide-link');
    const deleteLinkTxt = document.querySelector('.js-delete-guide-link span');
    const deleteLinkCheckbox = document.querySelector('.js-delete-guide-link input');
    
    const exampleLink = document.querySelector('.js-example-guide-link');
    const exampleLinkTxt = document.querySelector('.js-example-guide-link span');    

    if(config.isLandscapeMode) {
        actionLink.dataset.toggle = 'modal';
        actionLink.dataset.target = '#createGuide';        
        exampleLink.dataset.toggle = 'modal';
        exampleLink.dataset.target = '#exampleGuide';
    }

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

    const beginLessonHandler = () => {
        const { collection, config, history } = store.getState();
        const lessonStateMode = 'new-lesson';
        lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, actionLink);        
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
        if(parent) {
            parent.innerHTML = '';
            renderGuideSummary(R.clone(config), parent, speciesCount);
            deleteLink.classList.remove('hide');
            editLink.classList.remove('hide');
            exampleLink.classList.add('hide');
        }
    };

    const noRecordsSummary = () => {
        const intro = document.querySelector('.js-snapdragon-intro');
        if(intro) intro.innerHTML = 'Your search returned no species.';
        const help = document.querySelector('.js-snapdragon-help');
        if(help) help.innerHTML = 'Please broaden your criteria.';
    };

    const checkState = state => {

        switch(state) {
            case 'CREATE-LESSON':
                actionLink.setAttribute('data-toggle', 'modal');
                actionLink.innerHTML = 'Create';
                actionLink.addEventListener('click', modalHandler);
                if(noRecords) noRecordsSummary();
                break;
            case 'PREPARE-LESSON':
                actionLink.removeAttribute('data-toggle');    
                actionLink.innerHTML = config.isLandscapeMode ? 'Get Species' : 'Species';
                // document.querySelector('.js-for-text').classList.remove('hide');   
                
                elem.removeClass(document.querySelector('.js-for-text'), 'hide');
                
                guideSummary();
                actionLink.removeEventListener(prepareHandler);
                actionLink.addEventListener('click', prepareHandler);
                break;
            case 'BEGIN-LESSON':            
                actionLink.innerHTML = 'Begin';
                const forText = document.querySelector('.js-for-text');
                if(forText) forText.classList.add('hide');
                actionLink.addEventListener('click', beginLessonHandler);          
                break;
            case 'RESUME-LESSON':
                actionLink.removeAttribute('data-toggle');
                actionLink.innerHTML = 'Resume';    
                guideSummary(collection.items.length);
                editLink.classList.add('hide');
                actionLink.addEventListener('click', resumeLessonHandler);      
                if(loadSpeciesList) {
                    renderSpeciesCollectionList(collection);
                }                          
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
            state = 'CREATE-LESSON';
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
        
        subscription.remove(subscription.getByName('renderSpeciesGrid'));

        if(config.isPortraitMode && !!speciesCount) return;
        
        if(!counter.isLessonPaused && counter.index === null) {
            actionLink.removeEventListener('click', prepareHandler);
            state = 'BEGIN-LESSON';
            checkState(state);
            guideSummary(speciesCount);
        }        
    };

    listenToSpeciesCollectionListenReady(handleBeginLessonState);

    setTimeout(() => {
        const help = document.querySelector('.snapdragon-help');
        if(help) help.classList.add('fade-in'); 
    }, 2500);

    setTimeout(() => {
        const intro = document.querySelector('.snapdragon-intro');
        if(intro) intro.classList.add('fade-away');        
    }, 5000);
};