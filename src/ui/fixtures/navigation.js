import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderSettings } from 'ui/fixtures/settings';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import { renderHome } from 'ui/screens/home/home';
import { getGlossary } from 'api/glossary/glossary';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { enums } from 'ui/helpers/enum-helper';
import { listenToCloseCreateGuideModal } from 'ui/create-guide-modal/create-guide';
import { listenToCloseExampleGuideModal } from 'ui/example-guide-modal/example-guide';

import navigationTemplate from 'ui/fixtures/navigation-template.html';
import definitionCardTemplate from 'ui/screens/cards/definition-card-template.html';

export const renderNavigation = page => {

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
        const icon = document.querySelector(id);
        if(icon) {
            icon.classList.add('active-icon');
        }
    };

    const name = page.name.name ? page.name : enums.navigation.enumValueOf(page.name);

    switch(name) {
        case enums.navigation.HOME:
            activateIcon('.js-home');
            break;
        case enums.navigation.LIST:
            activateIcon('.js-list');
            break;
        default:
            navIcons.forEach(icon => icon.classList.remove('active-icon'));
    }

    let handleBodyClick = true;

    document.body.addEventListener('click', event => {

        if(handleBodyClick) {
            document.querySelector('.js-settings').classList.remove('active-icon');
            const icon = document.querySelector('.js-settings i');
            if(icon) {
                icon.classList.remove('active-icon');
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
                const { collection, config, history } = store.getState();

                switch(enums.navigation.enumValueOf(targetId)) {                    
                    case enums.navigation.HOME:
                        target.classList.add('active-icon');
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));        
                        lessonHandler.getLessonItems(enums.lessonState.PAUSE_LESSON, collection, config, history); 
                        const { counter } = store.getState();
                        const loadSpeciesList = false;
                        console.log('navigation');
                        config.isPortraitMode ? renderHome(counter, loadSpeciesList) : renderHome(counter);
                        break;
                    case enums.navigation.SETTINGS:
                        target.classList.add('active-icon');
                        DOM.modalText.parentElement.classList.remove('glossary-modal');
                        DOM.modalText.parentElement.classList.add('settings-modal');
                        renderSettings();
                        break;
                    case enums.navigation.LIST:
                        target.classList.add('active-icon');
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));                                   
                        lessonHandler.getLessonItems(enums.lessonState.PAUSE_LESSON, collection, config, history);
                        if(config.isPortraitMode) {
                            const { counter } = store.getState();
                            renderHome(counter);
                        } 
                        break;
                    case enums.navigation.GLOSSARY:
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
                        }
                        break;
                    case enums.navigation.EMAIL:
                        target.classList.add('active-icon');
                        break;
                    default:
                        return;
                }

                actions.boundNewPage({ name: name});
            }
        )}
    );
};

const activateHomeIcon = () => {  
    const icon = document.querySelector('.js-home');
    if(icon) {
        icon.classList.add('active-icon');
    }
};

export const deactivateHomeIcon = () => {  
    const icon = document.querySelector('.js-home');
    if(icon) {
        icon.classList.remove('active-icon');
    }
};

listenToCloseCreateGuideModal(activateHomeIcon);
listenToCloseExampleGuideModal(activateHomeIcon);
