import "babel-polyfill";

import 'checklist/style.scss';

import { checklists } from 'checklist/checklists';

Array.from(document.querySelectorAll('.js-menu button')).forEach(option => option.addEventListener('click', e => {
  console.log(e.target.id);

  switch(e.target.id) {
    case 'tools':
      break;
    case 'about':
      break;
    case 'checklists':
      checklists();
      break;
    default:
      checklists();
  }
}));

document.querySelector('#checklists').focus();
document.querySelector('#checklists').click();