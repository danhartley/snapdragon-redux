import "babel-polyfill";

import 'checklist/style.scss';

import { checklists } from 'checklist/checklists';
import { toollist } from 'checklist/checklist.tools';
import { about } from 'checklist/checklist-about';

const menuButtons = Array.from(document.querySelectorAll('.js-menu button'));

menuButtons.forEach(option => {

  option.addEventListener('click', e => {
    
    optionDefaults(e.target.id);

    switch(e.target.id) {
      case 'tools':
        toollist();
        break;
      case 'about':
        about();
        break;
      case 'checklists':
        checklists();
        break;
      default:
        checklists();
      }
    })
  });

const optionDefaults = id => {
  document.querySelector('footer button').style.display = id === 'about' ? 'none' : 'inline-block';
  document.querySelector('header h1').innerHTML = id === 'about' ? 'Daniel Hartley' : 'Checklists';
  document.querySelector('header div > div').innerHTML = id === 'about' ? 'Web developer' : 'Web development';
  menuButtons.forEach(button => button.classList.remove('active'));
  document.querySelector(`#${id}`).classList.add('active');
};
        
document.querySelector('#about').focus();
document.querySelector('#about').click();