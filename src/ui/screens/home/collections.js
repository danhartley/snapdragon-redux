import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import { updateNavIcons } from 'ui/fixtures/navigation';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { elem } from 'ui/helpers/class-behaviour';
import { editLessonPlans } from 'ui/screens/lists/lesson-plans-editor';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { handleCustomCollections } from 'ui/helpers/local-collection';
import collectionsTemplate from 'ui/screens/home/collections-template.html';
import { handleIconicTaxaFilter } from 'ui/helpers/iconic-taxa-handler';
import { listenToTaxaFiltersUpdate } from 'ui/helpers/iconic-taxa-handler';
import { createGuideHandler } from 'ui/modals/create-guide';

export const renderCollections = (counter) => { 

    const { collections: collectionsState, config: configState, collection: collectionState, history, layout } = store.getState();

    let config = R.clone(configState);
    let collections = R.clone(collectionsState);
    if(config.iconicTaxa && config.iconicTaxa.length > 0) {
        const localSpecies = collections.find(c => c.id === 1);
        const monsantoSpecies = collections.find(c => c.id === 2);
        const arrabidaSpecies = collections.find(c => c.id === 3);
        collections = [ ...collections.filter(c => R.contains(c.iconicTaxon, config.iconicTaxa)), localSpecies, monsantoSpecies, arrabidaSpecies ];
    }
    let collection = R.clone(collectionState);
    let hasChosenStudyType = false;
    let hasChosenLesson = false;

    if(lessonLogicHandler.isSkippable(collection, counter, config, layout, 'renderCollections', false)) return;

    const template = document.createElement('template');
    template.innerHTML = collectionsTemplate;

    let language = config.languages.find(l => l.lang === config.language);
    let lessons = utils.sortBy(collections.filter(c => c.type === 'species'), 'id', 'asc');

    DOM.rightBody.innerHTML = '';

    renderTemplate({ lessons, config, collection, language }, template.content, DOM.rightBody);

    const selectedCollection = collections.find(c => c.selected);

    collection = collection ? collection : { ...collection, ...selectedCollection };
  
    const learningActionBtn = document.querySelector('.js-lesson-btn-action');
    const learningActionBtnPlaceholder = document.querySelector('.js-lesson-btn-action-placeholder');

    const studyMethod = config.studyMethod;

    const changeCollectionHandler = collectionId => {

        subscription.getByName('renderSnapdragon').forEach(sub => subscription.remove(sub));
        subscription.getByName('renderCollections').forEach(sub => subscription.remove(sub));

        if(config.isLandscapeMode && collection.id === collectionId) {
            learningActionBtn.querySelector('span.landscape').innerHTML = 'Continue lesson';
        }

        collection = { ...collection, ...collections.find(collection => collection.id === collectionId) };

        config.collection = { id: collectionId };

        if(collectionId === 1 || collectionId === 4) {
            handleCustomCollections(document.getElementById(`${collectionId}`), learningActionBtn, config, collection);
        }    

        if(config.isLandscapeMode) {
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
            actions.boundSelectCollection(collection);
            actions.boundNewPage({ name: 'list'});
        }

        if(hasChosenStudyType) {
            elem.show(learningActionBtn);
            elem.hide(learningActionBtnPlaceholder);
            document.querySelector('.js-lesson-plan').classList.add('active');
        } else {
            learningActionBtnPlaceholder.innerHTML = 'Choose a study method';
        }

        editLessonPlans('.js-edit-lesson-link', collectionId, config);
    };

    if(collection && collection.name) {
        setTimeout(() => {
            const preSelectedCollection = document.getElementById(collection.id).querySelectorAll('span')[1];
            if(preSelectedCollection) {
                preSelectedCollection.click();
            }
        });
        if(config.isLandscapeMode) {
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
        }
    } 

    setTimeout(() => {
        const preSelectedStudyMethod = document.getElementById(studyMethod);
        if(preSelectedStudyMethod) {                
            preSelectedStudyMethod.click();
        }     
    });
        
    let collectionId = collection.id;

    document.querySelectorAll('.js-collection-options .btn.btn-secondary').forEach(collection => collection.addEventListener('click', event => {
        const target = event.target.id ? event.target : event.target.parentElement;
        changeCollectionHandler(parseInt(target.id));
        document.querySelectorAll('.js-collection-options .lesson-icon').forEach(icon => icon.innerHTML = '<i class="far fa-circle"></i>');
        target.querySelector('i').classList.remove('fa-circle');
        target.querySelector('i').classList.add('fa-dot-circle');
        hasChosenLesson = true;        
    }));

    const inatOption = document.querySelectorAll('.js-collection-options .btn.btn-secondary')[3];
    if(inatOption) {
        if(!config.inatId) {
            inatOption.classList.add('disabled');
        } else {
            inatOption.querySelector('.collectionName').innerHTML = `iNat observations for ${config.inatId}`;
        }
    }

    // document.querySelectorAll('.js-lesson-options .btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {        
    //     const target = event.target.id ? event.target : event.target.parentElement;
    //     hasChosenStudyType = true;
    //     document.querySelectorAll('.js-lesson-options .lesson-icon').forEach(icon => icon.innerHTML = '<i class="far fa-circle"></i>');
    //     target.querySelector('i').classList.remove('fa-circle');
    //     target.querySelector('i').classList.add('fa-dot-circle');
    //     if(hasChosenLesson) {
    //         elem.show(learningActionBtn);
    //         elem.hide(learningActionBtnPlaceholder);
    //         document.querySelector('.js-lesson-plan').classList.add('active');
    //     }
    //     config.studyMethod = target.id;
    //     actions.boundSelectStudyMethod(config.studyMethod);
    // }));

    document.querySelector('.js-create-guide-link').addEventListener('click', event => {
        createGuideHandler(1, R.clone(config), R.clone(collections));
    });
};