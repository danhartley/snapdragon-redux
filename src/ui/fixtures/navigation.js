import { contains } from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import { enums } from 'ui/helpers/enum-helper';
import { renderLessons } from 'ui/screens/lists/lesson-list';
import { cookieHandler } from 'ui/helpers/cookie-handler';
import { settingsHandler } from 'ui/fixtures/settings';
import { renderLogin } from 'ui/fixtures/login';
import { renderLanguagePicker } from 'ui/fixtures/language';

import navigationPortraitTemplate from 'ui/fixtures/navigation-portrait-template.html';
import navigationLeftTemplate from 'ui/fixtures/navigation-left-template.html';
import navigationRightTemplate from 'ui/fixtures/navigation-right-template.html';

export const renderNavigation = collection => {

    const { config, counter } = store.getState();

    const template = document.createElement('template');

    let parent;
    
    if(config.isPortraitMode) {
        template.innerHTML = navigationPortraitTemplate;
        parent = document.querySelector('.js-main-footer .js-nav-icons');
        parent.innerHTML = '';
        renderTemplate({ }, template.content, parent);
    } else {
        template.innerHTML = navigationLeftTemplate;
        parent = document.querySelector('.js-left-footer .js-nav-icons');
        parent.innerHTML = '';
        renderTemplate({ }, template.content, parent);
        template.innerHTML = navigationRightTemplate;
        parent = document.querySelector('.js-right-footer .js-nav-icons');
        parent.innerHTML = '';
        renderTemplate({ }, template.content, parent);
    }

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

          navIcons.forEach(icon => icon.classList.remove('active-icon'));
          const isIconActive = contains('active-icon', clickedIcon.classList);
          if(!isIconActive) {
              clickedIcon.classList.add('active-icon');
          }

          switch(enums.navigation.enumValueOf(clickedIcon.id)) {
              case enums.navigation.LANDSCAPE_HOME:
                  break;
              case enums.navigation.SETTINGS:
                  toggleIconOnOff(clickedIcon);
                  settingsHandler();
                  break;
              case enums.navigation.LESSONS:
                  renderLessons();
                break;                    
              case enums.navigation.LESSON:
                  lesson = await import('ui/screens/lists/lesson-state-handler').then(module => {
                    module.lessonStateHandler.changeRequest({ requestType: enums.lessonState.PAUSE_LESSON });
                  });
                  
                  DOM.rightHeaderTxt.innerHTML = 'Learn the planet';
                  DOM.rightHeaderScoreTxt.innerHTML = '';
                  break;
              case enums.navigation.GLOSSARY:   
                  toggleIconOnOff(clickedIcon);
                  const { glossary } = store.getState();
                  const definitions = !!collection.glossary
                      ? glossary.filter(definition => contains(definition.taxon, collection.glossary))
                      : glossary;
                  import('ui/quick-fire-modal/quick-fire').then(module => {
                    module.quickFireHandlers.definitions(definitions);
                  });
                  break;
              case enums.navigation.EMAIL:
                  toggleIconOnOff(clickedIcon);
                  break;
              case enums.navigation.LOGIN:
                  renderLogin(store.getState().user);
                  break;
              case enums.navigation.LANGUAGE:
                  renderLanguagePicker();
              default:
                  return;
          }
        });        
    });

    const onLoadState = (config, counter) => {

      if(config.isLandscapeMode) return;

      navIcons.forEach(icon => icon.classList.remove('active-icon'));

      if(counter.isLessonPaused) {
        
      }

        // if(config.isPortraitMode && config.collection.id !== 0 && !counter.isLessonRehydrated) {
        //     navIcons.forEach(icon => icon.classList.remove('active-icon'));
        //     return;
        // } else {
        //   if(config.isPortraitMode) {
        //     let lessonIcon = document.querySelector('.js-lesson');
        //         lessonIcon.classList.add('active-icon');
        //     return;
        //   }
        // }

        // if(counter.isLessonPaused) {

        //     if(config.isPortraitMode) {
        //         const id = enums.navigation.LESSONS.name;
        //         let icon = document.getElementById(id);
        //         const returningUser = !cookieHandler.isFirstTimeVisitor();

        //         if(id === enums.navigation.LANDSCAPE_HOME.name || (id === enums.navigation.LESSONS.name && returningUser)) {
        //             icon.classList.add('active-icon');
        //         }
        //     }
        // } else {
        //     navIcons.forEach(icon => icon.classList.remove('active-icon'));
        // }

        const loginIcon = document.querySelector('.js-login');
        if(loginIcon)
          loginIcon.dataset.isLoggedIn = !!store.getState().user;
    };

    onLoadState(config, counter);
};

export const renderLoginChanges = user => {
  const loginIcon = document.querySelector('.js-login');
  if(loginIcon)
    loginIcon.dataset.isLoggedIn = !user ? "false" : "true";
};
