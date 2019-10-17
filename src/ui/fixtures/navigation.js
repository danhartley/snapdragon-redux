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

import navigationTemplate from 'ui/fixtures/navigation-template.html';
import definitionCardTemplate from 'ui/screens/cards/definition-card-template.html';

export const renderNavigation = collection => {

    const { config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = navigationTemplate;

    const parent = config.isPortraitMode ? document.querySelector('.js-right-footer .js-nav-icons') : document.querySelector('.js-left-footer .js-nav-icons');
          parent.innerHTML = '';

    renderTemplate({ }, template.content, parent);

    const navIcons =  document.querySelectorAll('.js-nav-icons .icon');

    // const activateIcon = id => {
    //     const icon = document.querySelector(id);
    //     if(icon) {
    //         icon.classList.add('active-icon');
    //     }
    // };

    // setTimeout(() => {
        
    //     const home = subscription.getByName('renderHome');

    //     if(home) {
    //         if(config.isLandscapeMode) {
    //             activateIcon('.js-home'); 
    //         }

    //         if(config.isPortraitMode) {
    //             collection.id > 0 ? activateIcon('.js-home') : activateIcon('.js-list');
    //         }
    //     }
    // });

    navIcons.forEach(icon => {
        icon.addEventListener('click', event => {       
            
                const clickedIcon = event.currentTarget;
                
                const { collection, config, history } = store.getState();

                const activeIcon = document.querySelector('.active-icon');
                if(activeIcon) activeIcon.classList.remove('active-icon');

                clickedIcon.classList.add('active-icon');

                switch(enums.navigation.enumValueOf(clickedIcon.id)) {                    
                    case enums.navigation.HOME:                        
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));        
                        // actions.boundResetCollection({ config: { ...config, collection: { id: 0 }},  collection: { id: 0 } });
                        break;
                    case enums.navigation.SETTINGS:
                        DOM.modalText.parentElement.classList.remove('glossary-modal');
                        DOM.modalText.parentElement.classList.add('settings-modal');
                        renderSettings();
                        break;
                    case enums.navigation.LIST:
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));                                   
                        lessonHandler.getLessonItems(enums.lessonState.PAUSE_LESSON, collection, config, history);
                        if(config.isPortraitMode) {
                            actions.boundResetCollection({ config: { ...config, collection: { id: 0 }},  collection: { id: 0 } });
                        } 
                        break;
                    case enums.navigation.GLOSSARY:   
                        DOM.modalText.innerHTML = '';
                        DOM.modalText.parentElement.classList.remove('settings-modal');
                        DOM.modalText.parentElement.classList.add('glossary-modal');
                        const template = document.createElement('template');                    
                        template.innerHTML = definitionCardTemplate;                    
                        DOM.modalTextTitle.innerHTML = 'Glossary';
                        const glossary = utils.sortAlphabeticallyBy(getGlossary(collection.glossary || ['common']), 'term');
                        renderTemplate({ glossary }, template.content, DOM.modalText);                        
                        break;
                    case enums.navigation.EMAIL:                        
                        break;
                    default:
                        return;
                }
            }
        )}
    );
};
