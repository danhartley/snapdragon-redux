import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { renderSpeciesCollectionList, listenToSpeciesCollectionListenReady } from 'ui/screens/lists/species-list';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { renderLessons } from 'ui/screens/lists/lesson-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';

import homeTemplate from 'ui/screens/home/home-template.html';

export const renderHome = (counter, loadSpeciesList = true) => {

    let { config, collection, lesson } = store.getState();

    const home = subscription.getByName('renderHome');
    if(home) subscription.remove(home);

    if(config.isPortraitMode) {
        
        if(collection.id > 0) {            
            loadSpeciesList ? renderLesson(collection) : renderLessons();
        } else {
            renderLessons();
        }

    }

    if(config.isLandscapeMode) {

        // left
        renderLessons();

        // right
        const template = document.createElement('template');
        template.innerHTML = homeTemplate;
    
        DOM.rightBody.innerHTML = '';
    
        renderTemplate({}, template.content, DOM.rightBody);
    }
};