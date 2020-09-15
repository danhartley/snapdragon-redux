import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';

import dashboardTemplate from 'index-helpers/dashboard-template.html';

export const renderDashboard = () => {

  const template = document.createElement('template');
        template.innerHTML = dashboardTemplate;

  const parent = document.querySelector('.js-main-lesson-body');
        parent.innerHTML = '';

  renderTemplate({}, template.content, parent);

};