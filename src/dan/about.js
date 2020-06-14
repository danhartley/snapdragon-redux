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
    checklist: api.checklist
  }, template.content, parent);

  Array.from(document.querySelectorAll('.task')).forEach(task => {
    let tasksKey = 'checkedTasks';
    let state = localStorage.getItem(tasksKey) ? JSON.parse(localStorage.getItem(tasksKey))  : { keys: [] };
    state.keys.forEach(key => {
      if(key === task.querySelector('span').innerHTML) {
        task.classList.add('completed');
      }
    });
    task.addEventListener('click', e => {
      state.keys.push(e.target.innerHTML);
      localStorage.setItem(tasksKey, JSON.stringify(state));
      task.classList.add('completed');
    });
  });

  document.querySelector('.clear').addEventListener('click', e => {
    localStorage.clear();
    location.reload();
  });

};