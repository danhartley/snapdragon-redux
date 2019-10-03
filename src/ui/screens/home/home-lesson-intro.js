import * as R from 'ramda';

import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';

import lessonTemplate from 'ui/screens/home/home-lesson-intro-template.html';

const listenersToVideoTimes = [];

export const listenToVideoTimes = callback => {
    listenersToVideoTimes.push(callback);
};

export const renderLesson = lesson => {

    const { config } = store.getState();

    if(!lesson) return;

    const template = document.createElement('template');
          template.innerHTML = lessonTemplate;

    DOM.rightBody.innerHTML = '';

    if(!lesson.video) return;

    lesson.video.webLabel = lesson.video.links[1].label;
    lesson.video.webUrl = lesson.video.links[1].url;

    renderTemplate({ video: lesson.video }, template.content, DOM.rightBody);

    setTimeout(() => {

        let player;

        const onPlayerReady = event => {
            player = event.target;
        };

        let checkInt;

        const checkCurrentTime = () => {            
            checkInt = setInterval(function() {
               const time = Math.floor(player.getCurrentTime());
               const times = lesson.species.filter(sp => sp.time);
               const match = times.find(sp => R.contains(time, sp.time));
               if(match) {
                   listenersToVideoTimes.map(listener => listener(match));
               }
            }, 1000);
         }

         const onPlayerStateChange = event => {
            player = event.target;
            const states = [ { key: 1, value: 'playing' }, { key: 2, value: 'paused' } ];
            
            switch(player.getPlayerState()) {
                case states[0].key:
                    checkCurrentTime();
                    break;
                    case states[1].key:
                        clearInterval(checkInt);
                        checkInt = null;
                        break;
            }
         };

        new YT.Player('embedded-video', {
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
        
    }, 1000);
        
    const video = document.getElementsByTagName('iframe')[0];
    const videoWidth = video.offsetWidth;
    video.height = videoWidth * 9/16;

    const loadSpeciesCallback = () => console.log('getting species!');

    const container = DOM.rightBody.querySelector('.lesson-list .scrollable');

    if(config.isPortraitMode) {
        renderSpeciesCollectionList(lesson, { readOnlyMode: false, parent: container, tableParent: container, loadSpeciesCallback, isInCarousel: false });
    }
}