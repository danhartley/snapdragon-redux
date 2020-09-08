import { renderTemplate } from 'checklist/templating';
import { api } from 'checklist/checklist-api';

import aboutTemplate from 'checklist/checklist-about-template.html';

export const about = () => {

  const template = document.createElement('template');
        template.innerHTML = aboutTemplate;

  const parent = document.querySelector('#main');
        parent.innerHTML = '';

  renderTemplate({toollist: api.toollist}, template.content, parent);
};