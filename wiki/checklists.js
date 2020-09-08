import { renderTemplate } from 'checklist/templating';
import { api } from 'checklist/checklist-api';

import checklistsTemplate from 'checklist/checklists-template.html';

export const checklists = () => {

  const template = document.createElement('template');
        template.innerHTML = checklistsTemplate;

  const parent = document.querySelector('#main');
        parent.innerHTML = '';

  renderTemplate({    
    navigation: api.sections.map(section => section.header),
    projectChecklist: api.projectChecklist,
    featureChecklist: api.featureChecklist,
    termList: api.termList,
    // processList: api.processList
  }, template.content, parent);

  Array.from(document.querySelectorAll('.task button:first-child')).forEach(task => {
    let tasksKey = 'checkedTasks';
    let currentState = localStorage.getItem(tasksKey) ? JSON.parse(localStorage.getItem(tasksKey))  : { keys: [] };
        currentState.keys.forEach(key => {
          const span = task.querySelector('span');
          if(span && key === span.innerText) {
            task.classList.add('completed');
          }
        });
    task.addEventListener('click', e => {
      let state = localStorage.getItem(tasksKey) ? JSON.parse(localStorage.getItem(tasksKey))  : { keys: [] };
      let taskToAdd = e.target.innerText.trim();
      if(state.keys.find(key => key === taskToAdd)) {
        state.keys = state.keys.filter(key => key !== taskToAdd);
      } else {
        state.keys.push(taskToAdd);
      }
      localStorage.setItem(tasksKey, JSON.stringify(state));
      toggleClass(task, 'completed');
    });
  });

  document.querySelector('.js-clear').addEventListener('click', e => {
    localStorage.clear();
    location.reload();
  });

  const hasClass = (elem, className) => {
    if(!elem) return false;
    const classArray = [ ...elem.classList ];
    const isTrue = classArray.find(c => c === className);
    return !!isTrue;
  };

  const toggleClass = (elem, className) => {
    if(!elem) return;
    hasClass(elem, className) 
      ? elem.classList.remove(className)
      : elem.classList.add(className);
  };

  const hideShowMore = e => {
    const ddId = e.target.dataset.target;
    const otherDDs = Array.from(document.querySelectorAll('dd')).filter(dd => dd.id !== ddId)
    otherDDs.forEach(dd => dd.classList.add('hide'));
    toggleClass(document.getElementById(ddId), 'hide');
  };

  let showMore = document.querySelectorAll('dt');
      showMore.forEach(dt => dt.addEventListener('click', hideShowMore));

};