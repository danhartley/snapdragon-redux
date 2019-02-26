import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderSettings } from 'ui/fixtures/settings';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import { renderHome } from 'ui/screens/home/home';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { getGlossary } from 'api/glossary/glossary';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import navigationTemplate from 'ui/fixtures/navigation-template.html';
import definitionCardTemplate from 'ui/screens/cards/definition-card-template.html';

export const renderNavigation = (page) => {

    setTimeout(() => {
        const glossary = document.querySelector('.js-glossary');
        if(glossary) {
            glossary.disabled = !page.glossary; 
            if(page.glossary) {
                glossary.classList.remove('inactive-icon');
            } else {
                glossary.classList.add('inactive-icon');
            }
        }
    }, 500);    

    const { config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = navigationTemplate;

    const parent = config.isPortraitMode ? document.querySelector('.js-right-footer .js-nav-icons') : document.querySelector('.js-left-footer .js-nav-icons');
    parent.innerHTML = '';

    renderTemplate({ }, template.content, parent);

    const navIcons =  document.querySelectorAll('.js-nav-icons .icon');

    const activateIcon = id => {
        const icon = document.querySelector(`.${id}`);
        if(icon) {
            icon.classList.add('active-icon');
            const svgId = `${id} svg`; 
            const svg = document.querySelector(svgId);
            if(svg) {
                svg.classList.remove('active-icon');
            }
        }
    };

    switch(page.name) {
        case 'home':
            activateIcon('js-home');
            break;
        case 'list':
            activateIcon('js-list');
            break;
        default:
            navIcons.forEach(icon => icon.classList.remove('active-icon'));
    }

    let handleBodyClick = true;

    document.body.addEventListener('click', event => {
        if(handleBodyClick) {
            document.querySelector('.js-settings').classList.remove('active-icon');
            const svg = document.querySelector('.js-settings svg');
            if(svg) {
                svg.classList.remove('active-icon');
            }
        } else {
            handleBodyClick = true;
        }
    });

    navIcons.forEach(icon => {
        icon.addEventListener('click', event => {       
                handleBodyClick = false;
                const target = event.target.parentElement;
                const targetId = target.id === '' ? target.parentElement.id : target.id;
                const name = targetId;                 
                const { collections, collection, config, history } = store.getState();
                switch(targetId) {                    
                    case 'home':
                        target.classList.add('active-icon');
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));        
                        lessonLogicHandler.changeCollection('pauseLesson', collection, config, history); 
                        const { counter } = store.getState();
                        renderHome(counter);
                        break;
                    case 'settings':
                        target.classList.add('active-icon');
                        DOM.modalText.parentElement.classList.remove('glossary-modal');
                        DOM.modalText.parentElement.classList.add('settings-modal');
                        renderSettings();
                        break;
                    case 'list':                        
                        target.classList.add('active-icon');
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));                                   
                        lessonLogicHandler.changeCollection('pauseLesson', collection, config, history);         
                        break;
                    case 'glossary':
                        if(page.glossary) {
                            target.classList.add('active-icon');                        
                            DOM.modalText.innerHTML = '';
                            DOM.modalText.parentElement.classList.remove('settings-modal');
                            DOM.modalText.parentElement.classList.add('glossary-modal');
                            const template = document.createElement('template');                    
                            template.innerHTML = definitionCardTemplate;                    
                            DOM.modalTextTitle.innerHTML = 'Glossary';
                            const glossary = utils.sortAlphabeticallyBy(getGlossary(collection.glossary), 'term');
                            renderTemplate({ glossary }, template.content, DOM.modalText);
                            document.querySelector('.js-definition-card-btn').style.display = 'none';
                        }
                        break;
                    case 'email':
                        target.classList.add('active-icon');
                        break;
                }
                actions.boundNewPage({ name: name});
            }
        )}
    );
};

export const updateNavIcons = () => {
    document.querySelector('.js-home').classList.remove('active-icon');
    const svg = document.querySelector('.js-home svg');
    if(svg) {
        svg.classList.remove('active-icon');
    }
};