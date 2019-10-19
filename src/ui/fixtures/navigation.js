import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSettings } from 'ui/fixtures/settings';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import { getGlossary } from 'api/glossary/glossary';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { enums } from 'ui/helpers/enum-helper';

import navigationTemplate from 'ui/fixtures/navigation-template.html';
import definitionCardTemplate from 'ui/screens/cards/definition-card-template.html';

export const renderNavigation = () => {

    const { config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = navigationTemplate;

    const parent = config.isPortraitMode ? document.querySelector('.js-right-footer .js-nav-icons') : document.querySelector('.js-left-footer .js-nav-icons');
          parent.innerHTML = '';

    renderTemplate({ }, template.content, parent);

    const navIcons =  document.querySelectorAll('.js-nav-icons .icon');

    navIcons.forEach(icon => {
        icon.addEventListener('click', event => {       
            
                const clickedIcon = event.currentTarget;
                
                const { collection, config, history } = store.getState();

                const activeIcon = document.querySelector('.active-icon');
                if(activeIcon) activeIcon.classList.remove('active-icon');

                clickedIcon.classList.add('active-icon');

                switch(enums.navigation.enumValueOf(clickedIcon.id)) {
                    case enums.navigation.HOME:                        
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub)); // lesson handler?
                        break;
                    case enums.navigation.SETTINGS:
                        DOM.modalText.parentElement.classList.remove('glossary-modal');// remove this hack
                        DOM.modalText.parentElement.classList.add('settings-modal'); // and this one
                        renderSettings();
                        break;
                    case enums.navigation.LIST: // portrait only
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub)); // lesson handler?                   
                        lessonHandler.getLessonItems(enums.lessonState.PAUSE_LESSON, collection, config, history);
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
