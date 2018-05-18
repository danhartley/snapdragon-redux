import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { nextLesson } from 'ui/setup/next-lesson';
import { collectionPlans } from'snapdragon/collections-plans';
import { lessonPlans } from '../../../snapdragon/lesson-plans';
import { persistor } from 'redux/store';

export const renderCollections = () => {

    DOM.moreSpecimensBtn.style.display = 'none';
    DOM.collectionTxt.innerHTML = 'Collections | Levels | Languages';

    let { collections, collection, config } = store.getState();

    const template = document.querySelector('.js-collections-template');

    const clone = document.importNode(template.content, true);
    
    DOM.leftBody.innerHTML = '';

    collection = collection || { name: 'no collection selected', id: ''};

    const species = collections.filter(collection => collection.type === 'species');
    const skills = collections.filter(collection => collection.type === 'skill');

    const data = { species, skills, config, collection };
    
    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, data);
    Stamp.appendChildren(DOM.leftBody, expanded);

    const startLearningBtn = document.querySelector('.js-start-learning');
    const stateClearBtn = document.querySelector('.js-state-clear');

    startLearningBtn.style.display = collection.id !== '' ? 'inline-block' : 'none';
    stateClearBtn.style.display = collection.id !== '' ? 'inline-block' : 'none';

    const speciesCollectionBtns = document.querySelectorAll('.js-species-collection .dropdown-menu button');

    speciesCollectionBtns.forEach(btn => btn.addEventListener('click', event => {
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
            document.querySelector('.js-selected-language span').innerHTML = lang;
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
        actions.boundUpdateConfig(config);
    });

    stateClearBtn.addEventListener('click', () => {
        persistor.purge().then(res => {
            stateClearBtn.innerHTML = 'Clearing...';
            setTimeout(()=>{
                stateClearBtn.innerHTML = 'Clear lesson';
                window.location.reload(true);
            },1000);
        });
    });
};