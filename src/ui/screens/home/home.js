import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderTemplate } from 'ui/helpers/templating';

import { renderLessons } from 'ui/screens/lists/lesson-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';

import homeTemplate from 'ui/screens/home/home-template.html';

export const renderHome = counter => {

    let { config, collection } = store.getState();

    const home = subscription.getByName('renderHome');
    if(home) subscription.remove(home);

    if(config.isPortraitMode) {
        
        if(collection.id > 0) {
            counter.isLessonPaused 
                ? renderLessons()
                : renderLesson(collection);      
        } else {
            renderLessons();
        }
    }

    if(config.isLandscapeMode) {

        renderLessons();

        if(collection.id > 0) {
            renderLesson(collection);
        } else {
            const template = document.createElement('template');
            template.innerHTML = homeTemplate;
            DOM.rightBody.innerHTML = '';
            renderTemplate({}, template.content, DOM.rightBody);
        }
    }
};