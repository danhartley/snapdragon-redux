import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { videoSetup } from 'ui/screens/home/home-lesson-intro-video';
import { textSetup } from 'ui/screens/home/home-lesson-intro-text';

export const renderLesson = collection => {

    const { config, videoPlayer } = store.getState();

    collection.video ? videoSetup(collection, videoPlayer || [], DOM.rightBody) : textSetup(collection, config);
}