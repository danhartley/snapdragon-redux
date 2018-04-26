import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { nextLesson } from 'ui/setup/next-lesson';

export const renderCollections = () => {

    DOM.moreSpecimensBtn.style.display = 'none';
    DOM.collectionTxt.innerHTML = '';

    const { collections, config } = store.getState();

    const template = document.querySelector('.js-collections-template');

    const clone = document.importNode(template.content, true);
    
    DOM.leftBody.innerHTML = '';

    const data = { collections, config };

    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, data);
    Stamp.appendChildren(DOM.leftBody, expanded);
    
    const btns = document.querySelectorAll('.collection button');

    btns.forEach(btn => btn.addEventListener('click', event => {
        actions.boundChangeCollection(event.target.id);
        nextLesson(0);
    }));

    const languageId = '#' + config.language;

    document.querySelectorAll(languageId)[0].classList.add('active');

    document.querySelectorAll('.dropdown.js-languages .dropdown-item').forEach(option => {        
        option.addEventListener('click', event => {
            document.querySelectorAll(languageId)[0].classList.remove('active');
            event.target.classList.add('active');
            const lang = event.target.id;
            document.querySelector('.js-selected-language span').innerHTML = lang;
            const data = { language: lang };
            actions.boundUpdateConfig(data);
        });
    });

    const levelId = '#level' + config.lesson.level.id;

    document.querySelectorAll(levelId)[0].classList.add('active');

    document.querySelectorAll('.dropdown.js-levels .dropdown-item').forEach(option => {        
        option.addEventListener('click', event => {
            document.querySelectorAll(levelId)[0].classList.remove('active');
            event.target.classList.add('active');
            const id = event.target.id;
            const level = config.lesson.levels.filter(level => level.id.toString() === id.slice(id.length -1))[0];
            document.querySelector('.js-selected-level span').innerHTML = level.name;
            const data = { lesson: {
                name: config.lesson.name,
                level: level       
            }};
            actions.boundUpdateConfig(data);
        });
    });
};