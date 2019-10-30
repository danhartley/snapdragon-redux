import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { videoSetup } from 'ui/screens/home/home-lesson-intro-video';
import { textSetup } from 'ui/screens/home/home-lesson-intro-text';

export const renderLesson = collection => {

    const { config, videoPlayer } = store.getState();

    collection.video ? videoSetup(collection, videoPlayer || [], DOM.rightBody) : textSetup(collection, config);

    const container = DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable');

    if(config.isPortraitMode) {
        lessonStateHandler.bindAction({ requireSpecies: true, state: enums.lessonState.BEGIN_INTRO, lesson: collection, container, isInCarousel: false });        
    }
}