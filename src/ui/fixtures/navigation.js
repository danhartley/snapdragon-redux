import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import { enums } from 'ui/helpers/enum-helper';
import { renderLessons } from 'ui/screens/lists/lesson-list';
import { renderScoreSummary } from 'ui/screens/progress/score-summary';
import { cookieHandler } from 'ui/helpers/cookie-handler';
import { settingsHandler } from 'ui/fixtures/settings';
import { renderLogin } from 'ui/fixtures/login';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { quickFireHandlers } from 'ui/quick-fire-modal/quick-fire';

import navigationTemplate from 'ui/fixtures/navigation-template.html';

const onLoseFocusListeners = [];

export const onAddLoseFocusListener = listener => {
    onLoseFocusListeners.pop();
    onLoseFocusListeners.push(listener);
}

export const renderNavigation = collection => {

    const { config, counter, user } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = navigationTemplate;

    const parent = config.isPortraitMode ? document.querySelector('.js-right-footer .js-nav-icons') : document.querySelector('.js-left-footer .js-nav-icons');
          parent.innerHTML = '';

    renderTemplate({ }, template.content, parent);

    const navIcons =  document.querySelectorAll('.js-nav-icons .icon');

    navIcons.forEach(icon => {

        icon.addEventListener('click', async event => {
            
                const clickedIcon = event.currentTarget;
                
                const { collection, config } = store.getState();

                const toggleIconOnOff = clickedIcon => {
                    clickedIcon.classList.add('active-icon');
                    setTimeout(() => {
                        clickedIcon.classList.remove('active-icon');
                    }, 1000);
                };

                let lesson;

                switch(enums.navigation.enumValueOf(clickedIcon.id)) {
                    case enums.navigation.LANDSCAPE_HOME:
                        const isIconActive = R.contains('active-icon', clickedIcon.classList);
                        if(!isIconActive) {
                            clickedIcon.classList.add('active-icon');
                            lesson = await lessonStateHandler.changeLessonState(enums.lessonState.PAUSE_LESSON, collection, config);
                            subscription.getByRole('screen').forEach(sub => subscription.remove(sub));
                            renderLessons();
                        }
                        break;
                    case enums.navigation.SETTINGS:
                        toggleIconOnOff(clickedIcon);
                        settingsHandler();
                        break;
                    case enums.navigation.PORTRAIT_HOME:
                        onLoseFocusListeners.forEach(listener => listener());
                        const activeInfoIcon = document.querySelector('.js-info.active-icon');
                        if(activeInfoIcon) activeInfoIcon.classList.remove('active-icon');
                        clickedIcon.classList.add('active-icon');
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));
                        lesson = await lessonStateHandler.changeLessonState(enums.lessonState.PAUSE_LESSON, collection, config);
                        renderLessons();
                        DOM.rightHeaderTxt.innerHTML = 'Learn the planet';
                        DOM.rightHeaderScoreTxt.innerHTML = '';
                        break;
                    case enums.navigation.GLOSSARY:   
                        toggleIconOnOff(clickedIcon);
                        const { glossary } = store.getState();
                        const definitions = !!collection.glossary
                            ? glossary.filter(definition => R.contains(definition.taxon, collection.glossary))
                            : glossary;
                        quickFireHandlers.definitions(definitions);
                        break;
                    case enums.navigation.EMAIL:
                        toggleIconOnOff(clickedIcon);
                        break;
                    case enums.navigation.LOGIN:
                        renderLogin(store.getState().user);
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

            const returningUser = !cookieHandler.isFirstTimeVisitor();

            if(id === enums.navigation.LANDSCAPE_HOME.name || (id === enums.navigation.PORTRAIT_HOME.name && returningUser)) {
                icon.classList.add('active-icon');
            }
        } else {
            navIcons.forEach(icon => icon.classList.remove('active-icon'));
        }
    };

    onLoadState(config, counter);
};

export const renderLoginChanges = user => {

    const login = document.querySelector('.js-login');
          login.dataset.isLoggedIn = !!user;
};
