import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { nextLayout } from 'ui/setup/next-layout';

export const renderCollections = () => {

    DOM.moreSpecimensBtn.style.display = 'none';
    DOM.collectionTxt.innerHTML = '';

    const { collections, config } = store.getState();

    const template = document.querySelector('.js-collections-template');

    const clone = document.importNode(template.content, true);
    
    DOM.leftBody.innerHTML = '';

    const languages = [
        { name: 'english', lang: 'en', checked: false },
        { name: 'عربى', lang: 'ar', checked: false },
        { name: 'deutsche', lang: 'de', checked: false },
        { name: 'italiano', lang: 'it', checked: false },
        { name: 'français', lang: 'fr', checked: false },
        { name: 'português', lang: 'pt', checked: false },
        { name: '中文', lang: 'zh', checked: false }
    ];

    languages.map(language => {
        if(language.lang === config.language) { language.checked = true; }
        else { language.checked = false; }
    });

    let selectedLanguage = languages.filter(language => language.checked === true)[0].lang;
    let id = '#' + selectedLanguage;

    const data = { collections, config, languages, selectedLanguage };

    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, data);
    Stamp.appendChildren(DOM.leftBody, expanded);
    
    const btns = document.querySelectorAll('.collection button');

    btns.forEach(btn => btn.addEventListener('click', event => {
        actions.boundChangeCollection(event.target.id);
        nextLayout(0);
    }));

    document.querySelectorAll(id)[0].classList.add('active');

    document.querySelectorAll('.dropdown div').forEach(option => {        
        option.addEventListener('click', event => {
            document.querySelectorAll(id)[0].classList.remove('active');
            event.target.classList.add('active');
            const lang = event.target.id;
            document.querySelector('.js-selected-language').innerHTML = lang; // time for rivets? (http://rivetsjs.com/)
            const data = { language: lang };
            actions.boundUpdateConfig(data);
        });
    });
};