import { actions } from 'redux/actions/action-creators';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';
import { renderDashboard } from 'index-helpers/dashboard/dashboard';

import navigationTemplate from 'ui/fixtures/navigation-top.html';

export const renderTopNavigation = userAction => {

  const template = document.createElement('template');
        template.innerHTML = navigationTemplate;

  const parent = document.querySelector('.js-main-lesson-header');
        parent.innerHTML = '';

  renderTemplate({}, template.content, parent);

  let active = document.getElementById(userAction.name) || document.getElementById(enums.userEvent.GO_TO_DASHBOARD.name);
      active.classList.add('active');

  const lesson = document.getElementById(enums.userEvent.PLAY_LESSON_VIDEO.name);
        lesson.disabled = active.id === enums.userEvent.GO_TO_DASHBOARD.name;

  const options = document.querySelectorAll('.js-main-menu-icons button');
        options.forEach(option => {
          option.addEventListener('click', e => {
            const button = e.target;
            actions.boundClickEvent(enums.userEvent[button.id]);
            switch(button.id) {
              case enums.userEvent.GO_TO_DASHBOARD.name:
                renderDashboard();
                break;
              case enums.userEvent.GO_TO_LESSONS.name :
                import('ui/screens/lists/lesson-list').then(module => {
                  module.renderLessons();
                });
              default:
                break;
            }
          });
        });
};