import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderLessons } from 'ui/screens/lists/lesson-list';

import homeTemplate from 'ui/screens/home/home-template.html';

export const renderHome = counter => {

    if(counter > 0 && !! counter.isLessonPaused) return;

    let { config } = store.getState();

    renderLessons();

    if(config.isLandscapeMode) {

        const template = document.createElement('template');
              template.innerHTML = homeTemplate;
        
        DOM.rightBody.innerHTML = '';

        renderTemplate({}, template.content, DOM.rightBody);
    }
};