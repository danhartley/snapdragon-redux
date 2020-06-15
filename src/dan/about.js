import { renderTemplate } from 'ui/helpers/templating';
import { api } from 'dan/opt-api';

import aboutTemplate from 'dan/about-template.html';

export const about = () => {

  const template = document.createElement('template');
        template.innerHTML = aboutTemplate;

  const parent = document.querySelector('body');

  renderTemplate({
    navigation: api.sections.map(section => section.header),
    toollist: api.toollist,
    checklist: api.checklist,
    conceptList: api.conceptList
  }, template.content, parent);

  Array.from(document.querySelectorAll('.task')).forEach(task => {
    let tasksKey = 'checkedTasks';
    let state = localStorage.getItem(tasksKey) ? JSON.parse(localStorage.getItem(tasksKey))  : { keys: [] };
    state.keys.forEach(key => {
      if(task.querySelector('span') && key === task.querySelector('span').innerText) {
        task.classList.add('completed');
      }
    });
    task.addEventListener('click', e => {
      state.keys.push(e.target.innerText);
      localStorage.setItem(tasksKey, JSON.stringify(state));
      task.classList.add('completed');
    });
  });

  document.querySelector('.clear').addEventListener('click', e => {
    localStorage.clear();
    location.reload();
  });

};