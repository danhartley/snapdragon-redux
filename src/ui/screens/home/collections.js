import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { selectHandler } from 'ui/helpers/handlers';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { elem } from 'ui/helpers/class-behaviour';
import { renderLessonPlans } from 'ui/screens/lists/lesson-plans-table';
import collectionsTemplate from 'ui/screens/home/collections-template.html';

export const renderCollections = (counter) => {

    const { collections, config, collection: _collection, history } = store.getState();

    let collection = { ..._collection };
    
    if(counter && counter.log) {
        actions.boundSelectCollection(collection);
    }    

    const template = document.createElement('template');
    template.innerHTML = collectionsTemplate;

    let language = config.languages.find(l => l.lang === config.language);
    let lessons = utils.sortBy(collections.filter(collection => collection.type === 'species'), 'courseId', 'asc');

    DOM.rightBody.innerHTML = '';

    const snapdragon = { descriptions : [
        'Snapdragon is a tool for studying the 1.3 million recorded species on Earth.',
        'Related species are grouped and tested in lessons.',
        'Lessons take the form of concise summaries followed by quick tests.',
        'Take one of the public lessons or request one tailored to your needs.'
    ] };

    const copy = collection.descriptions || snapdragon.descriptions;

    renderTemplate({ lessons, config, collection, language, copy }, template.content, DOM.rightBody);

    const selectedCollection = collections.find(collection => collection.selected);

    collection = selectedCollection ? { ...collection, ...selectedCollection } : { id: 0 };

    const learningActionBtn = document.querySelector('.js-lesson-btn-action');
    const learningActionBtnPlaceholder = document.querySelector('.js-lesson-btn-action-placeholder');
    const collectionsHeader = document.querySelector('.btn-collection');
    const collectionDescription = document.querySelector('.js-selected-description');
    const languagesHeader = document.querySelector('.btn-language');
    const lessonPlanLink = document.querySelector('.js-lesson-plan-link');
    
    elem.hide(lessonPlanLink);

    if(config.isPortraitMode) {
        learningActionBtn.innerHTML =  'View lesson species';
    } else {
        const isLessonPaused = (counter && counter.log) ? true : false;
        learningActionBtn.innerHTML = 'Begin lesson'
        if(history || isLessonPaused) {
            learningActionBtn.innerHTML = 'Continue lesson';
        }
    }    

    // Selected lesson

    if(collection && collection.name) {
        document.querySelectorAll(`[name="${collection.name}"]`)[0].classList.add('active');
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);
        elem.show(lessonPlanLink);
        collectionsHeader.innerHTML = collection.name;
        if(config.isLandscapeMode) {
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
        }
    } else {
        collectionsHeader.innerHTML = 'Lessons';        
        elem.hide(lessonPlanLink);
    }

    // User selects lesson
    
    selectHandler('.dropdown.js-collections .dropdown-item', id => {
        
        collection = { ...collection, ...collections.find(collection => collection.id === parseInt(id)) };
        collectionsHeader.innerHTML = collection.name;
        const descriptions = collection.descriptions.map(description => `<span>${description}</span>`).join('');
        collectionDescription.innerHTML = descriptions;
        
        config.collection = { id: parseInt(id) };
        config.moduleSize = collection.moduleSize;

        if(config.isLandscapeMode) {
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
            actions.boundSelectCollection(collection);
        }

        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);        
        elem.show(lessonPlanLink);        
    });

    let currentCourseId;

    document.querySelectorAll('.dropdown.js-collections .dropdown-item').forEach(option => {

        subscription.getByName('renderSnapdragon').forEach(sub => subscription.remove(sub));

        const optionCollection = collections.find(collection => collection.id === parseInt(option.id));
        if(optionCollection.courseId !== currentCourseId && optionCollection.course !== '') {
            var courseHeader = document.createElement('span');
            courseHeader.classList.add('dropdown-item-text');
            courseHeader.innerHTML = optionCollection.course;
            option.before(courseHeader);            
        }
        currentCourseId = optionCollection.courseId;
    });

    // Languages

    document.querySelector(`#${config.language}`).classList.add('active');
    languagesHeader.innerHTML = config.languages.find(l => l.lang === config.language).name;

    selectHandler('.dropdown.js-languages .dropdown-item', language => {        
        config.language = language;
        languagesHeader.innerHTML = config.languages.find(l => l.lang === config.language).name;
        actions.boundUpdateLanguage(language);
    });

    const getLatestCounter = () => { 
        const counter = store.getState().counter;
        const log = counter.log;
        const index = log ? log.index : counter.index;
        return { index };
    };

    // User begins or continues lesson

    learningActionBtn.addEventListener('click', () => {

        const notEnoughItemsSelected = collection.items.filter(item => !item.isDeselected).length < config.moduleSize;

        if(notEnoughItemsSelected) {
            learningActionBtn.innerHTML = `You must select at least ${config.moduleSize} items`;
        }

        setTimeout(() => {
            learningActionBtn.innerHTML = 'Begin lesson';
        }, 2000);

        if(notEnoughItemsSelected) return;
                
        subscription.getByName('renderCollections').forEach(sub => subscription.remove(sub));

        if(config.isPortraitMode) {            
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
            actions.boundSelectCollection(collection);
            actions.boundNewPage({ name: 'list'});
         } else {
            subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));            
            const isLessonPaused = (counter && counter.log) ? true : false; 
             if(isLessonPaused) {
                actions.boundToggleLesson(getLatestCounter());
             } else {
                const items = collection.items.filter(item => !item.isDeselected);
                actions.boundChangeCollection({ config: config, items: items });
             }
            }
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

    lessonPlanLink.addEventListener('click', event => {
        const planId = config.isPortraitMode ? 3 : 1;
        renderLessonPlans(planId);
    });
    
};