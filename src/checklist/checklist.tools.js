import { renderTemplate } from 'checklist/templating';
import { api } from 'checklist/checklist-api';

import toolslistTemplate from 'checklist/checklist-tools-template.html';

export const toollist = () => {

  const template = document.createElement('template');
        template.innerHTML = toolslistTemplate;

  const parent = document.querySelector('#main');
        parent.innerHTML = '';

  renderTemplate({toollist: api.toollist}, template.content, parent);

};