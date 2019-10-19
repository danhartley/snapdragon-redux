import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { enums } from 'ui/helpers/enum-helper';
import { videoSetup } from 'ui/screens/home/home-lesson-intro-video';

export const renderLesson = collection => {

    const { config, videoPlayer } = store.getState();

    const template = document.createElement('template');

    DOM.rightBody.innerHTML = '';

    const textSetup = () => {

    }; 

    collection.video ? videoSetup(collection, videoPlayer || [], DOM.rightBody) : textSetup();

    const loadSpeciesCallback = () => console.log('renderLesson: load species callback called.');

    const container = DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable');

    if(config.isPortraitMode) {
        renderSpeciesCollectionList(collection, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
    }

    // const beginLearningActionBtn = document.querySelector('.js-species-list-btn-action');

    //       beginLearningActionBtn.addEventListener('click', event => {
    //         const { history } = store.getState();
    //         lessonHandler.getLessonItems(enums.lessonState.BEGIN_LESSON, collection, config, history);
    //       });
}