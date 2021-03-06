import { contains } from 'ramda';

import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';
import { cookieHandler } from 'ui/helpers/cookie-handler';

import navigationPortraitTemplate from 'ui/fixtures/navigation-portrait-template.html';
import navigationLeftTemplate from 'ui/fixtures/navigation-left-template.html';
import navigationRightTemplate from 'ui/fixtures/navigation-right-template.html';

export const renderNavigation = collection => {

    const { config } = store.getState();

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
                  import('ui/fixtures/settings').then(module => {
                    module.settingsHandler();
                  });
                  break;
              case enums.navigation.LESSONS:
                  import('ui/screens/lists/lesson-state-handler').then(module => {
                    module.lessonStateHandler.recordUserAction(enums.userEvent.RETURN_LESSONS);
                  });
                  import('ui/screens/lists/lesson-list').then(module => {
                    module.renderLessons();
                  });
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
                  import('ui/fixtures/login').then(module => {
                    module.renderLogin(store.getState().user);
                  });
                  break;
              case enums.navigation.LANGUAGE:
                import('ui/fixtures/language').then(module => {
                  module.renderLanguagePicker();
                  document.getElementById('basicModal').addEventListener('hide.bs.modal', e => {
                    document.querySelector('.js-nav-icons .language').classList.remove('active-icon');
                  });
                });                  
              // case enums.navigation.QUIZ:
              //   import('quiz/quiz-modal').then(module => {
              //     module.openQuiz();
              //     document.getElementById('quizModal').addEventListener('hide.bs.modal', e => {
              //       document.querySelector('.js-nav-icons .quiz-icon').classList.remove('active-icon');
              //       actions.boundClearDeckScoreHistory();
              //     });
              //   });
              //   break;
              default:
                return;
          }
        });        
    });

    const onLoadState = () => {

      const { config, userAction } = store.getState();

      if(config.isLandscapeMode) return;

      // if(!cookieHandler.isFirstTimeVisitor()) {
      //   console.log(userAction);
      //   const lessonsIcon = document.querySelector('.js-lessons');
      //   const newScreenActions = [ enums.userEvent.PLAY_LESSON_VIDEO.name, enums.userEvent.START_LESSON_REVIEW.name, enums.userEvent.START_TERM_REVIEW.name ];
      //   (userAction && contains(userAction.name, newScreenActions))
      //     ? lessonsIcon.classList.remove('active-icon')
      //     : lessonsIcon.classList.add('active-icon');
      // }
  };

    onLoadState();
};

export const renderLoginChanges = user => {
  const loginIcon = document.querySelector('.js-login');
  if(loginIcon)
    loginIcon.dataset.isLoggedIn = !user ? "false" : "true";
};
