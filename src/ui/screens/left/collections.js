import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { nextLesson } from 'ui/setup/next-lesson';

export const renderCollections = () => {

    DOM.moreSpecimensBtn.style.display = 'none';
    DOM.collectionTxt.innerHTML = 'Collections | Levels | Languages';
    DOM.changeCollection.style.display = 'none';

    let { collections, collection, config } = store.getState();

    const template = document.querySelector('.js-collections-template');

    const clone = document.importNode(template.content, true);
    
    DOM.leftBody.innerHTML = '';

    collection = collection || { name: 'no collection selected', id: ''};

    const data = { collections, config, collection };
    
    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, data);
    Stamp.appendChildren(DOM.leftBody, expanded);

    const startLearningBtn = document.querySelector('.js-start-learning');

    if(collection.id !== '') startLearningBtn.style.display = 'block';
    
    const btns = document.querySelectorAll('.collection button');

    btns.forEach(btn => btn.addEventListener('click', event => {
        actions.boundChangeCollection(event.target.id);
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

    const levelId = '#level' + config.lesson.level.id;

    document.querySelectorAll(levelId)[0].classList.add('active');

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
};