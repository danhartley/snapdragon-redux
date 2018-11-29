import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { selectHandler } from 'ui/helpers/handlers';
import { subscription } from 'redux/subscriptions';
import { updateNavIcons } from 'ui/fixtures/navigation';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { elem } from 'ui/helpers/class-behaviour';
import { editLessonPlans } from 'ui/screens/lists/lesson-plans-editor';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { updateLocalLesson } from 'ui/helpers/local-collection';
import collectionsTemplate from 'ui/screens/home/collections-template.html';

export const renderCollections = (counter) => {

    const { collections, config, collection: collectionState, history } = store.getState();

    let collection = R.clone(collectionState);

    if(lessonLogicHandler.isSkippable(collection, counter, config)) return;

    const template = document.createElement('template');
    template.innerHTML = collectionsTemplate;

    let language = config.languages.find(l => l.lang === config.language);
    let lessons = utils.sortBy(collections.filter(c => c.type === 'species'), 'providerId', 'asc');

    DOM.rightBody.innerHTML = '';

    renderTemplate({ lessons, config, collection, language }, template.content, DOM.rightBody);

    const selectedCollection = collections.find(c => c.selected);

    collection = collection ? collection : { ...collection, ...selectedCollection };
    
    const learningActionBtn = document.querySelector('.js-lesson-btn-action');
    const learningActionBtnPlaceholder = document.querySelector('.js-lesson-btn-action-placeholder');
    const collectionsHeader = document.querySelector('.btn-collection');
    const collectionDescription = document.querySelector('.js-selected-description');
    const languagesHeader = document.querySelector('.btn-language');
    const lessonHelp = document.querySelector('.js-lesson-help');

    if(counter.isLessonPaused && config.isLandscapeMode) {
        collectionDescription.innerHTML += `<span><span class='snap-alert snap-padding'>If you change lessons your current lesson score will be lost!</span></span>`;
    }
    
    elem.hide(lessonHelp);

    const changeCollectionHandler = collectionId => {

        if(collectionId === 8) {
            updateLocalLesson(document.getElementById('8'), config);
        }

        subscription.getByName('renderSnapdragon').forEach(sub => subscription.remove(sub));
        subscription.getByName('renderCollections').forEach(sub => subscription.remove(sub));

        if(config.isLandscapeMode && collection.id === collectionId) {
            learningActionBtn.querySelector('span.landscape').innerHTML = 'Continue lesson';
        }

        collection = { ...collection, ...collections.find(collection => collection.id === collectionId) };
        collectionsHeader.innerHTML = collection.name;
        const descriptions = collection.descriptions.map(description => `<span>${description}</span>`).join('');
        collectionDescription.innerHTML = descriptions;
        
        config.collection = { id: collectionId };

        if(config.isLandscapeMode) {
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
            actions.boundSelectCollection(collection);
            actions.boundNewPage({ name: 'list'});
        }

        if(counter.isLessonPaused && config.isPortraitMode && collection.id !== collectionId) {
            collectionDescription.innerHTML += `<span class='snap-alert'>If you change lessons your current lesson score will be lost!</span>`;
        }
         
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);        
        elem.show(lessonHelp);        

        document.querySelector('.js-about-label').innerHTML = 'About the lesson';

        editLessonPlans('.js-edit-lesson-link', collectionId, config);
    };

    if(collection && collection.name) {
        setTimeout(() => {
            const preSelectedCollection = document.getElementById(collection.id);
            if(!preSelectedCollection) return;
            preSelectedCollection.click();
        });        
        if(config.isLandscapeMode) {
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
        }
    } 
        
    let collectionId = collection.id;

    selectHandler('.dropdown.js-collections .dropdown-item', id => {
       changeCollectionHandler(parseInt(id)); 
    });

    document.querySelector(`#${config.language}`).classList.add('active');
    languagesHeader.innerHTML = config.languages.find(l => l.lang === config.language).name;

    const changeLanguageHandler = language => {
        config.language = language;
        languagesHeader.innerHTML = config.languages.find(l => l.lang === config.language).name;
        actions.boundUpdateLanguage(language);
        if(config.isLandscapeMode && collection.id) {
            collection.language = language;
            actions.boundSelectCollection(collection);
            renderSpeciesCollectionList(collection, true);
        }
        // updateLocalLesson(document.getElementById('8'), config);
    };

    selectHandler('.dropdown.js-languages .dropdown-item', language => {        
        changeLanguageHandler(language);
    });

    learningActionBtn.addEventListener('click', () => {

        if(config.isLandscapeMode) {
            subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));            
            const lessonStateMode = counter.isLessonPaused ? 'restartLesson' : 'newLesson';
            lessonLogicHandler.changeCollection(lessonStateMode, collection, config, history, learningActionBtn);            
        }

        if(config.isPortraitMode) {            
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
            if(counter.isLessonPaused && collectionId === collection.id) {
                renderSpeciesCollectionList(collection, null, true);
            } else {                
                actions.boundSelectCollection(collection);                
            }            
            actions.boundNewPage({ name: 'list'});
         } 
        
        updateNavIcons();        
    });

    // updateLocalLesson(document.getElementById('8'), config);
};