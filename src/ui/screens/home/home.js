import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollectionList, listenToSpeciesCollectionListenReady } from 'ui/screens/lists/species-list';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { renderExampleGuideHandler } from 'ui/example-guide-modal/example-guide';
import { renderGuideSummary } from 'ui/screens/home/home-guide-summary';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';
import { listenToCloseExampleGuideModal } from 'ui/example-guide-modal/example-guide';
import { renderSaveLesson, listenToCloseSaveLessonModal } from 'ui/custom-lesson-modal/custom-lesson';
import { renderSpeciesGrid } from 'ui/screens/home/species-grid';
import { enums } from 'ui/helpers/enum-helper';
import { deactivateHomeIcon } from 'ui/fixtures/navigation';

import homeTemplate from 'ui/screens/home/home-template.html';
import introTemple from 'ui/screens/home/home-intro-template.html';

export const renderHome = (counter, loadSpeciesList = true, noRecords = false) => {

    subscription.remove(subscription.getByName('renderSpeciesGrid'));

    let { config, collection, lesson } = store.getState();

    const sub = subscription.getByName('renderHome');
    if(sub) subscription.remove(sub);

    const template = document.createElement('template');
    template.innerHTML = homeTemplate;

    DOM.rightBody.innerHTML = '';

    renderTemplate({}, template.content, DOM.rightBody);

    template.innerHTML = introTemple;
    renderTemplate({}, template.content, document.querySelector('.js-snapdragon-tag'));

    let state = (config.collection.id === 0 || !config.guide.ready)
            ? enums.lessonState.CREATE_LESSON : (lesson && lesson.layoutCounter > 0)
                ? enums.lessonState.RESUME_LESSON
                : noRecords
                    ? enums.lessonState.CREATE_LESSON
                    : enums.lessonState.GET_SPECIES;

    const actionLink = document.querySelector('.js-action-link');
    
    const editLink = document.querySelector('.js-edit-guide-link');
    const editLinkTxt = document.querySelector('.js-edit-guide-link span');
    
    const saveLink = document.querySelector('.js-save-guide-link');

    const deleteLink = document.querySelector('.js-delete-guide-link');
    const deleteLinkTxt = document.querySelector('.js-delete-guide-link span');
    const deleteLinkCheckbox = document.querySelector('.js-delete-guide-link input');
    
    const exampleLink = document.querySelector('.js-example-guide-link');
    const exampleLinkTxt = document.querySelector('.js-example-guide-link span');    

    if(config.isLandscapeMode) {
        actionLink.dataset.toggle = 'modal';
        actionLink.dataset.target = '#createGuide';
        editLink.dataset.toggle = 'modal';
        editLink.dataset.target = '#createGuide'; 
        exampleLinkTxt.dataset.toggle = 'modal';
        exampleLinkTxt.dataset.target = '#exampleGuide';
    }

    const modalHandler = () => {        
        const step = 1;
        createGuideHandler(step);
        if(config.isPortraitMode) {
            deactivateHomeIcon();
        }
    };

    const examplesHandler = () => {
        renderExampleGuideHandler();
        if(config.isPortraitMode) {
            deactivateHomeIcon();
        }
    };

    const getSpeciesHandler = () => {
        let { config, collection, collections } = store.getState();
        const id = parseInt(config.collection.id);
        collection = collection.items ? collection : collections.find(c => c.id === id);
        if(collection && collection.default) {
            renderSpeciesCollectionList(R.clone(collection));
        }
        else {
            renderSpeciesCollectionList(collection);
        }
        actionLink.disabled = true;
        actionLink.classList.add('disabled');        
    };

    const beginLessonHandler = () => {
        const { collection, config, history } = store.getState();
        lessonHandler.getLessonItems(enums.lessonState.BEGIN_LESSON, collection, config, history);        
        actionLink.disabled = false;
    };

    const guideSummary = speciesCount => {
        const parent = document.querySelector('.home-container .js-snapdragon-tag');
        if(parent) {
            parent.innerHTML = '';
            renderGuideSummary(R.clone(config), parent, speciesCount);
            deleteLink.classList.remove('hide');
            exampleLink.classList.add('hide');
        }
    };

    const noRecordsSummary = () => {
        const intro = document.querySelector('.js-snapdragon-intro');
        if(intro) intro.innerHTML = 'Your search returned no species.';
        const help = document.querySelector('.js-snapdragon-help');
        if(help) help.innerHTML = 'Please broaden your criteria.';
    };

    const resumeLessonHandler = () => {
        lessonHandler.getLessonItems(enums.lessonState.RESUME_LESSON, collection, config, history);        
        // subscription.remove(subscription.getByName('renderSpeciesGrid'));
    };

    const checkState = state => {

        const { collection, config, history } = store.getState();

        const speciesCount = collection.items ? collection.items.length : 0;

        const forText = document.querySelector('.js-for-text');

        actionLink.removeEventListener('click', modalHandler);
        actionLink.removeEventListener('click', getSpeciesHandler);
        actionLink.removeEventListener('click', beginLessonHandler);     
        actionLink.removeEventListener('click', resumeLessonHandler);

        switch(state) {

            case enums.lessonState.CREATE_LESSON:

                actionLink.innerHTML = 'Create';
                actionLink.setAttribute('data-toggle', 'modal');
                actionLink.addEventListener('click', modalHandler);
                    
                deleteLink.classList.add('hide');                
                editLink.classList.add('hide');
                saveLink.classList.add('hide');                
                exampleLink.classList.remove('hide');

                if(forText) {
                    forText.classList.remove('hide');
                    forText.innerHTML = 'a';
                }
                                    
                if(noRecords) noRecordsSummary();

                break;

            case enums.lessonState.GET_SPECIES:

                actionLink.innerHTML = 'Get Species';
                actionLink.removeAttribute('data-toggle');
                actionLink.addEventListener('click', getSpeciesHandler);

                const editableTypes = [ 'place', 'longLat' ];
                if(R.contains(config.guide.locationType, editableTypes) && state === enums.lessonState.GET_SPECIES) {
                    editLink.classList.remove('hide');
                }

                if(forText) {
                    forText.classList.remove('hide');
                    forText.innerHTML = 'for';
                }
                                     
                guideSummary(speciesCount);
                
                break;
                
            case enums.lessonState.BEGIN_LESSON:      

                actionLink.innerHTML = 'Begin';
                actionLink.addEventListener('click', beginLessonHandler);

                editLink.classList.add('hide');  

                if(forText) {
                    forText.classList.add('hide');
                }
                
                break;

            case enums.lessonState.RESUME_LESSON:

                actionLink.innerHTML = 'Resume';
                actionLink.removeAttribute('data-toggle');
                actionLink.addEventListener('click', resumeLessonHandler);

                editLink.classList.add('hide');
                saveLink.classList.remove('hide');

                if(forText) {
                    forText.classList.add('hide');
                }

                guideSummary(speciesCount);
                                
                if(loadSpeciesList) {
                    renderSpeciesCollectionList(collection);                
                }                
                break;
        }
    }; 

    checkState(state);

    renderSaveLesson(saveLink);

    exampleLinkTxt.addEventListener('click', event => {
        examplesHandler();
    });

    editLinkTxt.addEventListener('click', event => {
        actionLink.removeEventListener('click', beginLessonHandler);
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
            actions.boundPauseLesson();
            if(config.isLandscapeMode) {
                renderSpeciesGrid();
            }
            state = enums.lessonState.CREATE_LESSON;
            checkState(state);
        }
    };

    deleteLinkTxt.addEventListener('click', handleDeleteLinkTxt);

    const closeModalHandler = (state = enums.lessonState.GET_SPECIES) => {
        
        config = store.getState().config;
        if(state === enums.lessonState.RESUME_LESSON) loadSpeciesList = true;
        checkState(state);
    };

    listenToCloseCreateGuideModal(closeModalHandler);
    listenToCloseExampleGuideModal(closeModalHandler);
    
    listenToCloseSaveLessonModal(()=>{        
        
        checkState(enums.lessonState.CREATE_LESSON);
        // renderSpeciesGrid();

        const template = document.createElement('template');
        template.innerHTML = introTemple;
        const parent = document.querySelector('.js-snapdragon-tag');
        parent.innerHTML = '';
        renderTemplate({}, template.content, parent);
    });

    const handleBeginLessonState = (counter, speciesCount) => {
        
        subscription.remove(subscription.getByName('renderSpeciesGrid'));

        if(config.isPortraitMode && !!speciesCount) return;
        
        if(!counter.isLessonPaused && !counter.index) {
            actionLink.removeEventListener('click', getSpeciesHandler);
            checkState(enums.lessonState.BEGIN_LESSON);
            guideSummary(speciesCount);
        }        
    };

    listenToSpeciesCollectionListenReady(handleBeginLessonState);
};