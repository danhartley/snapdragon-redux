import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { videoSetup } from 'ui/screens/home/home-lesson-intro-video';
import { textSetup } from 'ui/screens/home/home-lesson-intro-text';

export const renderLessonIntro = collection => {

    const { config, videoPlayer, collection: lesson } = store.getState();

    collection = { ...collection, items: lesson.items };

    collection.video ? videoSetup(collection, videoPlayer || [], DOM.rightBody) : textSetup(collection, config);
    
}