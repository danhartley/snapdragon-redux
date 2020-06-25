import { subscription } from 'redux/subscriptions';
import { store } from 'redux/store';
import { renderLessons } from 'ui/screens/lists/lesson-list';
import { cookieHandler } from 'ui/helpers/cookie-handler';

export const renderHome = (counter, forceIntroDisplay = false) => {
    
    subscription.remove(subscription.getByName('renderHome'));
    
    const isFirstTimeVisitor = cookieHandler.setFirstTimeVisitorCookie();

    if(counter.index > 0 && !counter.isLessonPaused) return;

    let { config } = store.getState();

    if(config.isLandscapeMode || forceIntroDisplay) {
        renderLessons();
    }

    if(config.isPortraitMode && !isFirstTimeVisitor) {
        renderLessons();
    }
};
