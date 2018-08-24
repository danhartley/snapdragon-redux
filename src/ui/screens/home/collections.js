import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { selectHandler } from 'ui/helpers/handlers';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollection } from 'ui/screens/lists/species';
import { elem } from 'ui/helpers/class-behaviour';
import { renderLessonPlans } from 'ui/screens/lists/lesson-plans-table';
import collectionsTemplate from 'ui/screens/home/collections-template.html';

export const renderCollections = (counter) => {

    if(counter && counter.lesson === 'active') return;

    const { collections, config: currentConfig, collection: currentCollection } = store.getState();

    if(counter.log) {
        currentCollection.paused = true;
        actions.boundSelectCollection(currentCollection);
    }    

    subscription.add(renderSpeciesCollection, 'collections', 'screen');

    const template = document.createElement('template');
    template.innerHTML = collectionsTemplate;

    let config = { ...currentConfig };
    let collection = currentCollection ? { ...currentCollection } : { name: '---', id: '', descriptions: null };
    let language = config.languages.find(l => l.lang === config.language);
    let courses = collections.filter(collection => collection.type === 'species');

    DOM.rightBody.innerHTML = '';

    const snapdragon = { descriptions : [
        'Snapdragon is a tool for studying the 1.3 million recorded species on Earth.',
        'Related species are grouped and tested in courses.',
        'Courses take the form of concise summaries followed by quick tests.',
        'Take one of the public courses or request one tailored to your needs.'
    ] };

    const copy = collection.descriptions || snapdragon.descriptions;

    renderTemplate({ courses, config, collection, language, copy }, template.content, DOM.rightBody);

    const course = collections.find(collection => collection.selected) || { id: 0 };

    const learningActionBtn = document.querySelector('.js-lesson-btn-action');
    const learningActionBtnPlaceholder = document.querySelector('.js-lesson-btn-action-placeholder');
    const collectionsHeader = document.querySelector('.btn-collection');
    const collectionDescription = document.querySelector('.js-selected-description');
    const languagesHeader = document.querySelector('.btn-language');


    if(config.isPortraitMode) {
        learningActionBtn.innerHTML =  'View course species';
    } else {
        const lessonPaused = counter.log ? true : false;
        learningActionBtn.innerHTML = 'Begin lesson'
        if(history || lessonPaused) {
            learningActionBtn.innerHTML = 'Continue lesson';
        }
    }    

    // Courses

    if(course.name) {
        document.querySelectorAll(`[name="${course.name}"]`)[0].classList.add('active');
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);
        collectionsHeader.innerHTML = course.name;
    }

    selectHandler('.dropdown.js-collections .dropdown-item', id => {
        
        collection = collections.find(collection => collection.id === parseInt(id));
        collectionsHeader.innerHTML = collection.name;
        const descriptions = collection.descriptions.map(description => `<span>${description}</span>`).join('');
        collectionDescription.innerHTML = descriptions;
        
        config = { ...config, ...{ collection: { id: parseInt(id) }} };

        if(!config.isPortraitMode) {
            actions.boundSelectCollection(collection);
        }

        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);        
    });

    // Languages

    document.querySelector(`#${config.language}`).classList.add('active');
    languagesHeader.innerHTML = config.languages.find(l => l.lang === config.language).name;

    selectHandler('.dropdown.js-languages .dropdown-item', language => {        
        config.language = language;
        languagesHeader.innerHTML = config.languages.find(l => l.lang === config.language).name;
        actions.boundUpdateLanguage(language);
    });

    // User action

    learningActionBtn.addEventListener('click', () => {        
        config.isPortraitMode ? actions.boundSelectCollection(collection) : actions.boundChangeCollection(config);
        updateNavIcons();        
    });

    const updateNavIcons = () => {
        document.querySelector('.js-home').classList.remove('active-icon');
        const svg = document.querySelector('.js-home svg');
        if(svg) {
            svg.classList.remove('active-icon');
        }
    };

    // Populates lesson plan modal

    document.querySelector('.js-lesson-plan-link').addEventListener('click', event => {
        const planId = config.isPortraitMode ? 3 : 1;
        renderLessonPlans(planId);
        // renderLessonPlans(config.collection.id);
    });
};