import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { selectHandler } from 'ui/helpers/handlers';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollection } from 'ui/screens/lists/species';
import { elem } from 'ui/helpers/class-behaviour';
import { speciesCount } from 'gbif/gbif';
import collectionsTemplate from 'ui/screens/home/collections-template.html';

export const renderCollections = (counter) => {

    if(counter && counter.lesson === 'active') return;

    const { collections, config: currentConfig, collection: currentCollection } = store.getState();

    subscription.add(renderSpeciesCollection, 'collections', 'screen');

    let config = { ...currentConfig };
    let collection = currentCollection ? { ...currentCollection } : { name: '---', id: '', description: '' };

    const template = document.createElement('template');

    template.innerHTML = collectionsTemplate;

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const species = collections.filter(collection => collection.type === 'species');

    if(!config.lesson) return;

    const language = config.languages.filter(l => l.lang === config.language)[0];

    collection.description = collection.description || '';

    renderTemplate({ species, config, collection, language }, template.content, parent);

    const selectedCollection = collections.find(collection => collection.selected);
    let collectionId = selectedCollection ? selectedCollection.id : 0;

    const learningActionBtn = document.querySelector('.js-lesson-btn-action');
    const learningActionBtnPlaceholder = document.querySelector('.js-lesson-btn-action-placeholder');
    const typewriter = document.querySelector('.typewriter-container');

    if(selectedCollection) {
        document.querySelectorAll(`[name="${selectedCollection.name}"]`)[0].classList.add('active');
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);
        typewriter.style.display = 'none';
    }

    selectHandler('.dropdown.js-collections .dropdown-item', (id) => {
        collectionId = parseInt(id);
        collection = collections.filter(collection => collection.id === collectionId)[0];
        document.querySelector('.js-selected-collection span').innerHTML = collection.name;
        document.querySelector('.js-selected-description span').innerHTML = collection.description;
        config = { ...config, ...{ collection: { id: collectionId }} };
        elem.show(learningActionBtn);
        elem.hide(learningActionBtnPlaceholder);
        typewriter.style.display = 'none';
        if(!config.isPortraitMode)
            actions.boundSelectCollection(collection);        
    });

    const activeLanguage = '#' + config.language;
    document.querySelectorAll(activeLanguage)[0].classList.add('active');

    selectHandler('.dropdown.js-languages .dropdown-item', (id) => {
        const lang = id;
        const languageName = config.languages.filter(l => l.lang === lang)[0].name;
            document.querySelector('.js-selected-language span').innerHTML = languageName;
            config.language = lang;
            actions.boundUpdateLanguage(lang);
    });

    learningActionBtn.addEventListener('click', () => {        
        if(config.isPortraitMode) {
            actions.boundSelectCollection(collection);
        }
        else {
            actions.boundChangeCollection(config);
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
};