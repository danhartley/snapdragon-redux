import * as R from 'ramda';

import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { videoPlayer } from 'ui/screens/lists/video-handler';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { enums } from 'ui/helpers/enum-helper';
// import { activateHomeIcon } from 'ui/fixtures/navigation';

import lessonTemplate from 'ui/screens/home/home-lesson-intro-template.html';

export const renderLesson = collection => {

    const { config } = store.getState();

    if(!collection) return;

    const template = document.createElement('template');
          template.innerHTML = lessonTemplate;

    DOM.rightBody.innerHTML = '';

    if(!collection.video) return;

    collection.video.webLabel = collection.video.links[1].label;
    collection.video.webUrl = collection.video.links[1].url;

    renderTemplate({ video: collection.video }, template.content, DOM.rightBody);

    setTimeout(() => {

        videoPlayer.readyPlayer();

        let checkInt;

        const checkCurrentTime = player => {            
            checkInt = setInterval(function() {
               const time = Math.floor(player.getCurrentTime());
               const times = collection.items.filter(sp => sp.time);
               const match = times.find(sp => R.contains(time, sp.time));
               if(match) {
                   videoPlayer.listenersToVideoTimes.map(listener => listener(match.name));
               }
            }, 1000);
        };

        const onPlayerStateChangeCallback = player => {

            switch(player.getPlayerState()) {
                case videoPlayer.states[1].key:
                    checkCurrentTime(player);
                    break;
                case videoPlayer.states[2].key:
                    clearInterval(checkInt);
                    checkInt = null;
                    break;
            }
        };

        videoPlayer.onPlayerStateChangeListeners.push(onPlayerStateChangeCallback);
        
    }, 1000);
        
    const video = document.getElementsByTagName('iframe')[0];
    const videoWidth = video.offsetWidth;
    video.height = videoWidth * 9/16;

    const loadSpeciesCallback = () => console.log('getting species!');

    const container = DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable');

    if(config.isPortraitMode) {
        // activateHomeIcon();
        renderSpeciesCollectionList(collection, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
    }

    const beginLearningActionBtn = document.querySelector('.js-species-list-btn-action');

          beginLearningActionBtn.addEventListener('click', event => {
            const { history } = store.getState();
            lessonHandler.getLessonItems(enums.lessonState.BEGIN_LESSON, collection, config, history);
          });
}