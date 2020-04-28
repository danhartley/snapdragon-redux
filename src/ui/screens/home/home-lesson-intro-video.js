import * as R from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { lessonListEventHandler } from 'ui/screens/lists/lesson-list-event-handler';

import videoTemplate from 'ui/screens/home/home-lesson-intro-video-template.html';
import linksTemplate from 'ui/screens/home/home-lesson-links-template.html';

export const videoSetup = (collection, videoPlayer, parent, startTime) => {

    parent.innerHTML = '';
   
    const template = document.createElement('template');
          template.innerHTML = videoTemplate;

    collection.video.webLabel = collection.video.links[1].label;
    collection.video.webUrl = collection.video.links[1].url;

    const activeLesson = videoPlayer.find(record => record.collectionId === collection.id) || { collectionId: collection.id, startAt: collection.video.startAt || 0 };
          activeLesson.playAt = activeLesson.pausedAt || activeLesson.startAt;

    renderTemplate({ video: { ...collection.video, playAt: activeLesson.playAt, location: collection.video.location || '' } }, template.content, parent);

    const timeBeforeVideoPlayerReady = 1000;

    setTimeout(() => {

        videoHandler.readyPlayer();

        let checkInt;

        const checkCurrentTime = player => {

            checkInt = setInterval(function() {
               const time = Math.floor(player.getCurrentTime());
               const times = collection.items ? collection.items.filter(sp => sp.time) : collection.species.filter(sp => sp.time);
               const match = times.find(sp => R.contains(time, sp.time));
               if(match) {
                   videoHandler.onSpeciesTimeMatchListeners.map(listener => listener(collection, match));
               }
               if(!collection.notes) return;
               const noteMatch = collection.notes.find(note => R.contains(time, note.time));
               if(noteMatch) {
                   videoHandler.onNoteTimeMatchListeners.map(listener => listener(collection, noteMatch));
               }
            }, 1000);
        };

        const onPlayerStateChangeCallback = player => {

            if(!typeof player.getPlayerState === 'function' || player.getPlayerState === undefined) return;

            switch(player.getPlayerState()) {
                case videoHandler.states[1].key:
                    checkCurrentTime(player);
                    break;
                case videoHandler.states[2].key:
                    clearInterval(checkInt);
                    checkInt = null;
                    break;
            }
        };

        videoHandler.subscribeToPlayerStateChange(onPlayerStateChangeCallback);

        if(startTime) {
            setTimeout(() => {
                videoHandler.playVideoFrom(startTime);
            }, 1000);
        }
        
        // xxLessonLogic();

    }, timeBeforeVideoPlayerReady);
        
    const video = document.getElementsByTagName('iframe')[0];
    const videoWidth = video.offsetWidth;
          video.height = videoWidth * 9/16;
  
};

const xxLessonLogic = () => {

    const template = document.createElement('template');
          template.innerHTML = linksTemplate;

    const parent = document.querySelector('.js-lesson-links');
          parent.innerHTML = '';

    const { collection } = store.getState();

    renderTemplate({ lesson: collection }, template.content, parent);

    const reviewLink = document.querySelector('.js-review-link');
    lessonListEventHandler.onReviewClickHandler(reviewLink);
};