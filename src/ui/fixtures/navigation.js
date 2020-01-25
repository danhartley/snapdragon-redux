import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import { getGlossary } from 'api/glossary/glossary';
import { enums } from 'ui/helpers/enum-helper';
import { renderHome } from 'ui/screens/home/home';
import { renderLessons } from 'ui/screens/lists/lesson-list';
import { renderScoreSummary } from 'ui/screens/progress/score-summary';

import { cookieHandler } from 'ui/helpers/cookie-handler';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { settingsHandler } from 'ui/fixtures/settings';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

import navigationTemplate from 'ui/fixtures/navigation-template.html';
import definitionCardTemplate from 'ui/screens/cards/definition-card-template.html';

export const renderNavigation = collection => {

    const { config, counter } = store.getState();

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

                const toggleIconOnOff = clickedIcon => {
                    clickedIcon.classList.add('active-icon');
                    setTimeout(() => {
                        clickedIcon.classList.remove('active-icon');
                    }, 1000);
                };

                switch(enums.navigation.enumValueOf(clickedIcon.id)) {
                    case enums.navigation.LANDSCAPE_HOME:
                        clickedIcon.classList.add('active-icon');
                        // lessonHandler.changeState(enums.lessonState.PAUSE_LESSON, collection, config, history);
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));
                        renderLessons();     
                        renderScoreSummary(); 
                        break;
                    case enums.navigation.SETTINGS:
                        toggleIconOnOff(clickedIcon);
                        settingsHandler();
                        break;
                    case enums.navigation.INFO:
                        const activeHomeIcon = document.querySelector('.js-list.active-icon');
                        if(activeHomeIcon) activeHomeIcon.classList.remove('active-icon');
                        clickedIcon.classList.add('active-icon');
                        renderHome(store.getState().counter, true);
                        break;
                    case enums.navigation.PORTRAIT_HOME:
                        const activeInfoIcon = document.querySelector('.js-info.active-icon');
                        if(activeInfoIcon) activeInfoIcon.classList.remove('active-icon');
                        clickedIcon.classList.add('active-icon');
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));
                        lessonHandler.changeState(enums.lessonState.PAUSE_LESSON, collection, config, history);
                        renderLessons();
                        DOM.rightHeaderTxt.innerHTML = 'Learn the planet';
                        DOM.rightHeaderScoreTxt.innerHTML = '';
                        break;
                    case enums.navigation.GLOSSARY:   
                        toggleIconOnOff(clickedIcon);
                        DOM.modalText.innerHTML = '';
                        const template = document.createElement('template');                    
                              template.innerHTML = definitionCardTemplate;                 
                        DOM.modalTextTitle.innerHTML = 'Glossary';
                        const glossary = utils.sortAlphabeticallyBy(getGlossary(collection.glossary || ['common']), 'term');
                        renderTemplate({ glossary }, template.content, DOM.modalText);                        
                        break;
                    case enums.navigation.EMAIL:
                        toggleIconOnOff(clickedIcon);
                        break;
                    default:
                        return;
                }
        });        
    });

    const onLoadState = (config, counter) => {
        
        if(config.isPortraitMode && config.collection.id !== 0 && !counter.isLessonRehydrated) {
            navIcons.forEach(icon => icon.classList.remove('active-icon'));
            return;
        }

        if(counter.isLessonPaused) {

            const id = config.isPortraitMode ? enums.navigation.PORTRAIT_HOME.name : enums.navigation.LANDSCAPE_HOME.name;
            let icon = document.getElementById(id);

            if(id === enums.navigation.LANDSCAPE_HOME.name || (id === enums.navigation.PORTRAIT_HOME.name && !cookieHandler.isFirstTimeVisitor())) {
                icon.classList.add('active-icon');
            } else if(id === enums.navigation.PORTRAIT_HOME.name && cookieHandler.isFirstTimeVisitor()) {
                icon = document.querySelector('.js-info');
                icon.classList.add('active-icon');
            }
        } else {
            navIcons.forEach(icon => icon.classList.remove('active-icon'));
        }
    };

    onLoadState(config, counter);
};
