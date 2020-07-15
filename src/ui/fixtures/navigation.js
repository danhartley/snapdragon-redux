import { contains } from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { enums } from 'ui/helpers/enum-helper';
import { renderLessons } from 'ui/screens/lists/lesson-list';
import { settingsHandler } from 'ui/fixtures/settings';
import { renderLogin } from 'ui/fixtures/login';
import { renderLanguagePicker } from 'ui/fixtures/language';

import navigationPortraitTemplate from 'ui/fixtures/navigation-portrait-template.html';
import navigationLeftTemplate from 'ui/fixtures/navigation-left-template.html';
import navigationRightTemplate from 'ui/fixtures/navigation-right-template.html';

export const renderNavigation = collection => {

    const { config, userAction } = store.getState();

    const template = document.createElement('template');

    let parent;
    
    if(config.isPortraitMode) {
        template.innerHTML = navigationPortraitTemplate;
        parent = document.querySelector('.js-main-footer .js-nav-icons');
        parent.innerHTML = '';
        renderTemplate({ }, template.content, parent);
    } else {
        template.innerHTML = navigationLeftTemplate;
        parent = document.querySelector('.js-side-lesson-list-footer .js-nav-icons');
        parent.innerHTML = '';
        renderTemplate({ }, template.content, parent);
        template.innerHTML = navigationRightTemplate;
        parent = document.querySelector('.js-main-lesson-footer .js-nav-icons');
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
                  import('ui/screens/lists/lesson-state-handler').then(module => {
                    module.lessonStateHandler.recordUserAction(enums.userEvent.RETURN_LESSONS);
                    renderLessons();
                  });
                break;                    
              case enums.navigation.LESSON:
                  // lesson = await import('ui/screens/lists/lesson-state-handler').then(module => {
                  //   module.lessonStateHandler.changeRequest({ requestType: enums.lessonState.PAUSE_LESSON });
                  //   DOM.rightHeaderTxt.innerHTML = 'Learn the planet';
                  //   DOM.rightHeaderScoreTxt.innerHTML = '';
                  // });                  
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

    const onLoadState = (config, userAction) => {

      if(config.isLandscapeMode) return;

      navIcons.forEach(icon => icon.classList.remove('active-icon'));

      const loginIcon = document.querySelector('.js-login');
      if(loginIcon)
        loginIcon.dataset.isLoggedIn = !!store.getState().user;

        switch(userAction &&userAction.name) {
          case enums.userEvent.START_LESSON_REVIEW.name: // quiz
          case enums.userEvent.START_LESSON.name: // video
            const lessonIcon = document.querySelector('.js-lesson');
                  lessonIcon.classList.add('active-icon');
            const lessonsIcon = document.querySelector('.js-lessons');
                  lessonsIcon.classList.remove('active-icon');
            break;
            
        }
  };

    onLoadState(config, userAction);
};

export const renderLoginChanges = user => {
  const loginIcon = document.querySelector('.js-login');
  if(loginIcon)
    loginIcon.dataset.isLoggedIn = !user ? "false" : "true";
};
