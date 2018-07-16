import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { selectHandler } from 'ui/helpers/handlers';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollection } from 'ui/screens/lists/species';
import { elem } from 'ui/helpers/class-behaviour';
import collectionsTemplate from 'ui/screens/home/collections-template.html';

export const renderCollections = (counter) => {

    if(counter && counter.lesson === 'active') return;

    const { collections, config: currentConfig, collection: currentCollection } = store.getState();

    subscription.add(renderSpeciesCollection, 'collections', 'screen');

    let config = { ...currentConfig };
    let collection = currentCollection ? { ...currentCollection } : { name: '---', id: '' };
    let isNewCollection = collection.id === '';

    const template = document.createElement('template');

    template.innerHTML = collectionsTemplate;

    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;

    parent.innerHTML = '';

    const species = collections.filter(collection => collection.type === 'species');

    if(!config.lesson) return;

    config.lesson.levels.forEach(level => {
        level.menuName = config.isPortraitMode ? level.id : level.name;
    });

    const languageName = config.languages.filter(l => l.lang === config.language)[0].name;

    renderTemplate({ species, config, collection, languageName }, template.content, parent);

    const selectedCollection = collections.find(collection => collection.selected);
    let collectionId = selectedCollection ? selectedCollection.id : 0;

    const learningActionBtn = document.querySelector('.js-lesson-btn-action');
    const learningActionBtnPlaceholder = document.querySelector('.js-lesson-btn-action-placeholder');
    const speciesCollectionLink = document.querySelector('.js-species-collection');    

    if(selectedCollection) {
        document.querySelectorAll(`[name="${selectedCollection.name}"]`)[0].classList.add('active');
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);
    }
    
    selectHandler('.dropdown.js-collections .dropdown-item', (id) => {
        collectionId = parseInt(id);
        const collectionName = collections.filter(collection => collection.id === collectionId)[0].name;
        document.querySelector('.js-selected-collection span').innerHTML = collectionName;        
        config = { ...config, ...{ collection: { id: collectionId }} };
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);
        speciesCollectionLink.style.display = config.isPortraitMode ? 'inline-block' : 'none';
        isNewCollection = true;
        if(!config.isPortraitMode)
            actions.boundSelectCollection(collectionId);
    });

    // lesson levels

    const activeLevel = '#level' + config.lesson.level.id;
    document.querySelectorAll(activeLevel)[0].classList.add('active');

    selectHandler('.dropdown.js-levels .dropdown-item', (id) => {
        const level = config.lesson.levels.filter(level => level.id.toString() === id.slice(id.length -1))[0];
            document.querySelector('.js-selected-level span').innerHTML = level.name;
            const lesson = { ...config.lesson, level };
            config = { ...config, lesson };
    });

    // languages

    const activeLanguage = '#' + config.language;
    document.querySelectorAll(activeLanguage)[0].classList.add('active');

    selectHandler('.dropdown.js-languages .dropdown-item', (id) => {
        const lang = id;
        const languageName = config.languages.filter(l => l.lang === lang)[0].name;
            document.querySelector('.js-selected-language span').innerHTML = languageName;
            config.language = lang;
    });

    if(collectionId === 0) {        
        speciesCollectionLink.style.display = 'none';
    } else {
        learningActionBtn.innerHTML = 'Continue lesson';
        speciesCollectionLink.style.display = config.isPortraitMode ? 'inline-block' : 'none';
    }

    learningActionBtn.addEventListener('click', () => {        
        isNewCollection ? actions.boundChangeCollection(config) : actions.boundToggleLesson({ lesson: 'active' });
        updateNavIcons();        
    });

    const updateNavIcons = () => {
        document.querySelector('.js-home').classList.remove('active-icon');
        const svg = document.querySelector('.js-home svg');
        if(svg) {
            svg.classList.remove('active-icon');
        }
    };

    speciesCollectionLink.addEventListener('click', () => {
        actions.boundSelectCollection(collectionId);
        updateNavIcons();
    });
};