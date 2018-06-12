import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { nextLesson } from 'ui/setup/next-lesson';
import { collectionPlans } from'snapdragon/collections-plans';
import { lessonPlans } from 'snapdragon/lesson-plans';
import { renderTemplate } from 'ui/helpers/templating';

export const renderCollections = () => {
    
    DOM.collectionTxt.innerHTML = 'Snapdragon Collections';

    let { collections, collection, config, index } = store.getState();

    const template = document.querySelector('.js-collections-template');

    const clone = document.importNode(template.content, true);
    
    DOM.leftBody.innerHTML = '';

    collection = collection || { name: 'Please chose a collection to start learning', id: ''};

    const species = collections.filter(collection => collection.type === 'species');
    const skills = collections.filter(collection => collection.type === 'skill');

    config.lesson.levels.forEach(level => {
        level.menuName = config.isPortraitMode ? level.id : level.name;
    });

    const languageName = config.languages.filter(l => l.lang === config.language)[0].name;

    renderTemplate({ species, skills, config, collection, languageName }, template.content, DOM.leftBody);

    const startLearningBtn = document.querySelector('.js-continue-lesson');
    startLearningBtn.style.display = collection.id !== '' ? 'inline-block' : 'none';

    const speciesCollectionLinks = document.querySelectorAll('.js-species-collection .dropdown-menu button, .js-species-collection .dropdown-menu span');

    speciesCollectionLinks.forEach(btn => btn.addEventListener('click', event => {
        const collectionId = parseInt(event.target.id);
        actions.boundChangeCollection({ ...config, ...{ collection: { id: collectionId }} });
    }));

    const skillsCollectionsBtns = document.querySelectorAll('.js-skills-collection .dropdown-menu button');

    skillsCollectionsBtns.forEach(btn => btn.addEventListener('click', event => {
        const collectionId = parseInt(event.target.id);
        const { lessonName, levelName } = collectionPlans.filter(collectionPlan => collectionPlan.collectionId === collectionId )[0];
        actions.boundChangeCollection({ ...config, ...{ collection: { id: collectionId }}, ...{ lesson: { name: lessonName, level: { name: levelName }}} });
    }));

    const languageId = '#' + config.language;

    document.querySelectorAll(languageId)[0].classList.add('active');

    document.querySelectorAll('.dropdown.js-languages .dropdown-item').forEach(option => {
        option.addEventListener('click', event => {
            document.querySelectorAll('.dropdown.js-languages .dropdown-item').forEach(option => option.classList.remove('active'));
            event.target.classList.add('active');
            const lang = event.target.id;
            const languageName = config.languages.filter(l => l.lang === lang)[0].name;
            document.querySelector('.js-selected-language span').innerHTML = languageName;
            config.language = lang;
        });
    });

    const levelName = '#level' + config.lesson.level.id;

    document.querySelectorAll(levelName)[0].classList.add('active');

    document.querySelectorAll('.dropdown.js-levels .dropdown-item').forEach(option => {
        option.addEventListener('click', event => {
            document.querySelectorAll('.dropdown.js-levels .dropdown-item').forEach(option => option.classList.remove('active'));
            event.target.classList.add('active');
            const id = event.target.id;
            const level = config.lesson.levels.filter(level => level.id.toString() === id.slice(id.length -1))[0];
            document.querySelector('.js-selected-level span').innerHTML = level.name;
            config.lesson = { ...config.lesson, level };
        });
    });

    startLearningBtn.addEventListener('click', event => {
        actions.boundNextRound(index);
    });
};