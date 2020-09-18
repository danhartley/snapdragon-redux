import { actions } from 'redux/actions/action-creators';
import { enums } from 'ui/helpers/enum-helper';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderDashboard } from 'index-helpers/dashboard/dashboard';

import navigationTemplate from 'ui/fixtures/navigation-top.html';

export const renderTopNavigation = userAction => {

  snapLog('userAction', userAction);

  const template = document.createElement('template');
        template.innerHTML = navigationTemplate;

  const parent = document.querySelector('.js-main-lesson-header');
        parent.innerHTML = '';

  renderTemplate({}, template.content, parent);

  const dashboard = document.querySelector(`.${enums.userEvent.GO_TO_DASHBOARD.name}`);
  const lesson = document.querySelector(`.${enums.userEvent.PLAY_LESSON_VIDEO.name}`);
  const lessons = document.querySelector(`.${enums.userEvent.GO_TO_LESSONS.name}`);

  const active = document.getElementById(userAction.name);
  
  const isDashboardActive = active.id === enums.userEvent.GO_TO_DASHBOARD.name;
  const isLessonsActive = active.id === enums.userEvent.GO_TO_LESSONS.name;

  const { config, collection } = store.getState();

  setTimeout(() => {
    
    if(config.isLandscapeMode) {
      // force redirect to dashboard on page/app load/refresh
      const highlightedRow = document.querySelector('.highlighted-for-review-row');
      if(!highlightedRow && !isDashboardActive) { 
          dashboard.click();      
      } else {
        lesson.disabled = isDashboardActive;
      }
    }

    if(config.isPortraitMode) {
      lesson.disabled = isDashboardActive || isLessonsActive;
    }
    
    active.classList.add('active');

  });

  const options = document.querySelectorAll('.js-main-menu-icons button');
        options.forEach(option => {
          option.addEventListener('click', e => {
            const button = e.target;
            actions.boundClickEvent(enums.userEvent[button.id]);
            switch(button.id) {
              case enums.userEvent.GO_TO_DASHBOARD.name:
                renderDashboard();
                const playButton = document.querySelector('.js-lesson-list-youtube.youtube-green-fg');
                if(playButton) playButton.classList.remove('youtube-green-fg');
                break;
              case enums.userEvent.GO_TO_LESSONS.name:
                import('ui/screens/lists/lesson-list').then(module => {
                  module.renderLessons();
                });
                break;
              case enums.userEvent.TOGGLE_SPECIES_LIST.name :
                import('ui/screens/home/home-lesson-intro-text').then(module => {
                  module.textSetup(collection, config);
                });
                break;
              default:
                break;
            }
          });
        });
};