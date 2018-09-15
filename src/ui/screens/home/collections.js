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
import { endOfRoundHandler } from 'ui/helpers/lesson-handlers';
import { score } from '../../../redux/reducers/progress-reducers';

export const renderCollections = (counter) => {

    const { collections, config, collection: stateCollection, history } = store.getState();

    let collection = { ...stateCollection };

    const template = document.createElement('template');
    template.innerHTML = collectionsTemplate;

    let language = config.languages.find(l => l.lang === config.language);
    let lessons = utils.sortBy(collections.filter(c => c.type === 'species'), 'courseId', 'asc');

    DOM.rightBody.innerHTML = '';

    const snapdragon = { descriptions : [
        'Snapdragon is a tool for studying the 1.3 million recorded species on Earth.',
        'Related species are grouped and tested in lessons.',
        'Lessons take the form of concise summaries followed by quick tests.',
        'Take one of the public lessons or request one tailored to your needs.'
    ] };

    const copy = collection.descriptions || snapdragon.descriptions;

    renderTemplate({ lessons, config, collection, language, copy }, template.content, DOM.rightBody);

    const selectedCollection = collections.find(c => c.selected);

    collection = selectedCollection ? { ...collection, ...selectedCollection } : collection;
    
    const learningActionBtn = document.querySelector('.js-lesson-btn-action');
    const learningActionBtnPlaceholder = document.querySelector('.js-lesson-btn-action-placeholder');
    const collectionsHeader = document.querySelector('.btn-collection');
    const collectionDescription = document.querySelector('.js-selected-description');
    const languagesHeader = document.querySelector('.btn-language');
    const lessonPlanLink = document.querySelector('.js-lesson-plan-link');

    if(counter.isLessonPaused && config.isLandscapeMode) {
        collectionDescription.innerHTML += `<span class='snap-alert'>If you change lessons your current lesson score will be lost!</span>`;
    }
    
    elem.hide(lessonPlanLink);

    if(config.isPortraitMode) {
        learningActionBtn.innerHTML =  'View lesson species';
    } else {
        learningActionBtn.innerHTML = 'Begin lesson'
        if(collection.layoutCounter > 1) {
            learningActionBtn.innerHTML = 'Continue lesson';
        }
    }    

    // Selected lesson

    if(collection && collection.name) {
        document.querySelectorAll(`[name="${collection.name}"]`)[0].classList.add('active');
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);
        if(!counter.isLessonPaused) {
            elem.show(lessonPlanLink);
        }        
        collectionsHeader.innerHTML = collection.name;
        if(config.isLandscapeMode) {
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
        }
    } else {
        collectionsHeader.innerHTML = 'Lessons';        
        elem.hide(lessonPlanLink);
    }

    // User selects lesson
    
    let collectionId = collection.id;

    selectHandler('.dropdown.js-collections .dropdown-item', id => {
        
        collection = { ...collection, ...collections.find(collection => collection.id === parseInt(id)) };
        collectionsHeader.innerHTML = collection.name;
        const descriptions = collection.descriptions.map(description => `<span>${description}</span>`).join('');
        collectionDescription.innerHTML = descriptions;
        
        config.collection = { id: parseInt(id) };

        if(config.isLandscapeMode) {
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
            actions.boundSelectCollection(collection);
        }

        if(counter.isLessonPaused && config.isPortraitMode && collection.id !== collectionId) {
            collectionDescription.innerHTML += `<span class='snap-alert'>If you change lessons your current lesson score will be lost!</span>`;
        }
         
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);        
        elem.show(lessonPlanLink);        

        if(config.isPortraitMode && collection.id === collectionId) {
            learningActionBtn.innerHTML = 'Continue lesson';
        } else {
            learningActionBtn.innerHTML = 'Begin lesson';
        }
    });

    let currentCourseId;

    document.querySelectorAll('.dropdown.js-collections .dropdown-item').forEach(option => {

        subscription.getByName('renderSnapdragon').forEach(sub => subscription.remove(sub));

        const optionCollection = collections.find(c => c.id === parseInt(option.id));
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

    // User begins or continues lesson

    learningActionBtn.addEventListener('click', () => {

        if(config.isLandscapeMode) {
            subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));            
            const lessonStateMode = counter.isLessonPaused ? 'restartLesson' : 'newLesson';
            endOfRoundHandler.changeCollection(lessonStateMode, collections, collection, config, history, learningActionBtn);
        }
                
        subscription.getByName('renderCollections').forEach(sub => subscription.remove(sub));

        if(config.isPortraitMode) {            
            subscription.add(renderSpeciesCollectionList, 'collection', 'screen');
            if(counter.isLessonPaused && collectionId === collection.id) {
                renderSpeciesCollectionList(collection, null, true);
            } else {
                actions.boundSelectCollection(collection);
                actions.boundNewPage({ name: 'list'});
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