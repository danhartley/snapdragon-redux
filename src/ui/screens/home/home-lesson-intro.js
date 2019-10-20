import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { videoSetup } from 'ui/screens/home/home-lesson-intro-video';

export const renderLesson = collection => {

    const { config, videoPlayer } = store.getState();

    DOM.rightBody.innerHTML = '';

    const textSetup = () => {

    }; 

    collection.video ? videoSetup(collection, videoPlayer || [], DOM.rightBody) : textSetup();

    const loadSpeciesCallback = () => console.log('renderLesson: load species callback called.');

    const container = DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable');

    if(config.isPortraitMode) {
        renderSpeciesList(collection, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
    }
}