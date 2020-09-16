import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';
import { renderDashboard } from 'index-helpers/dashboard/dashboard';

import navigationTemplate from 'ui/fixtures/navigation-top.html';

export const renderTopNavigation = (userAction = enums.userEvent.GO_TO_DASHBOARD) => {

  const template = document.createElement('template');
        template.innerHTML = navigationTemplate;

  const parent = document.querySelector('.js-main-lesson-header');
        parent.innerHTML = '';

  renderTemplate({}, template.content, parent);

  const { config } = store.getState();

  let active = document.getElementById(userAction.name);

  if(active) {
    active.classList.add('active');
  } else {
    active = config.isLandscapeMode
          ? document.getElementById(enums.userEvent.GO_TO_DASHBOARD.name)
          : document.getElementById(enums.userEvent.GO_TO_LESSONS.name);

    active.classList.add('active');
  }

  const options = document.querySelectorAll('.js-main-menu-icons button');
        options.forEach(option => {
          option.addEventListener('click', e => {
            const id = e.target.id;
            actions.boundClickEvent(id);
            switch(id) {
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