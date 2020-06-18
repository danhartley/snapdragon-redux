import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderLessons } from 'ui/screens/lists/lesson-list';
import { cookieHandler } from 'ui/helpers/cookie-handler';

import homeTemplate from 'ui/screens/home/home-template.html';

export const renderHome = (counter, forceIntroDisplay = false) => {
    
    subscription.remove(subscription.getByName('renderHome'));
    
    const isFirstTimeVisitor = cookieHandler.setFirstTimeVisitorCookie();

    if(counter.index > 0 && !counter.isLessonPaused) return;

    let { config } = store.getState();

    if(config.isLandscapeMode || forceIntroDisplay) {
        renderLessons();
    }

    // if(config.isLandscapeMode || isFirstTimeVisitor || forceIntroDisplay) {
    //     renderSnapdragonIntro();
    // }

    if(config.isPortraitMode && !isFirstTimeVisitor) {
        renderLessons();
    }
};

const renderSnapdragonIntro = () => {
    
    const template = document.createElement('template');
          template.innerHTML = homeTemplate;

    DOM.rightBody.innerHTML = '';

    renderTemplate({}, template.content, DOM.rightBody);
}
