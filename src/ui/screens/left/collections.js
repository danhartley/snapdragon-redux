import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { collectionPlans } from'snapdragon/collections-plans';
import { renderTemplate } from 'ui/helpers/templating';
import { selectHandler } from 'ui/helpers/handlers';
import { renderSpeciesCollection } from 'ui/screens/common/species';
import collectionsTemplate from 'ui/screens/left/collections-template.html';

export const renderCollections = () => {

    let { collections, config, collection } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = collectionsTemplate;

    if(collection && collection.items) return;

    DOM.leftBody.innerHTML = '';

    collection = collection || { name: '---', id: ''};

    const species = collections.filter(collection => collection.type === 'species');
    const skills = collections.filter(collection => collection.type === 'skill');

    if(!config.lesson) return;

    config.lesson.levels.forEach(level => {
        level.menuName = config.isPortraitMode ? level.id : level.name;
    });

    const languageName = config.languages.filter(l => l.lang === config.language)[0].name;

    renderTemplate({ species, skills, config, collection, languageName }, template.content, DOM.leftBody);

    const skillsCollectionsBtns = document.querySelectorAll('.js-skills-collection .dropdown-menu button');

    skillsCollectionsBtns.forEach(btn => btn.addEventListener('click', event => {
        const collectionId = parseInt(event.target.id);
        const { lessonName, levelName } = collectionPlans.filter(collectionPlan => collectionPlan.collectionId === collectionId )[0];
        config = { ...config, ...{ collection: { id: collectionId }}, ...{ lesson: { name: lessonName, level: { name: levelName }}} };        
    }));

    const languageId = '#' + config.language;

    document.querySelectorAll(languageId)[0].classList.add('active');

    const levelName = '#level' + config.lesson.level.id;

    document.querySelectorAll(levelName)[0].classList.add('active');

    let collectionId;

    selectHandler('.dropdown.js-collections .dropdown-item', (id) => {
        collectionId = parseInt(id);
        const collectionName = collections.filter(collection => collection.id === collectionId)[0].name;
        document.querySelector('.js-selected-collection span').innerHTML = collectionName;        
        config = { ...config, ...{ collection: { id: collectionId }} };
        learningActionBtn.disabled = false;
        goToSpeciesCollectionBtn.disabled = false;      
    });

    selectHandler('.dropdown.js-levels .dropdown-item', (id) => {
        const level = config.lesson.levels.filter(level => level.id.toString() === id.slice(id.length -1))[0];
            document.querySelector('.js-selected-level span').innerHTML = level.name;
            const lesson = { ...config.lesson, level };
            config = { ...config, lesson };
    });

    selectHandler('.dropdown.js-languages .dropdown-item', (id) => {
        const lang = id;
        const languageName = config.languages.filter(l => l.lang === lang)[0].name;
            document.querySelector('.js-selected-language span').innerHTML = languageName;
            config.language = lang;
    });

    const learningActionBtn = document.querySelector('.js-lesson-btn-action');
    const goToSpeciesCollectionBtn = document.querySelector('.js-species-collection');

    if(collection.id === '') {
        learningActionBtn.disabled = true;
        goToSpeciesCollectionBtn.disabled = true;
    }

    learningActionBtn.addEventListener('click', event => {
        actions.boundChangeCollection(config);
    });


    goToSpeciesCollectionBtn.addEventListener('click', () => {
        renderSpeciesCollection(collectionId);
    });
};