import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import lessonsTemplate from 'ui/screens/home/lessons-template.html';

export const renderLessons = () => {

    const { config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = lessonsTemplate;

    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;

    parent.innerHTML = '';

    const lessons = [ { id: 1, name: 'lesson 1'}, { id: 2, name: 'lesson 2'} ];

    renderTemplate({ lessons }, template.content, parent);

};