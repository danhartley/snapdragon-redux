import * as R from 'ramda';

import { videoHandler } from 'ui/screens/lists/video-handler';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';

import videoTemplate from 'ui/screens/home/home-lesson-intro-video-template.html';

export const videoSetup = (collection, videoPlayer, parent) => {

    const recordMatch = (collection, species) => {
        const activeLesson = {
            collectionId: collection.id,
            speciesName: species.name,
            pausedAt: species.time[0]
        };
        const player = R.clone(videoPlayer);
        player.push(activeLesson);
        actions.boundUpdateVideoPlayer(player);
    };
    
    videoHandler.onSpeciesTimeMatch(recordMatch);

    const template = document.createElement('template');
          template.innerHTML = videoTemplate;

    collection.video.webLabel = collection.video.links[1].label;
    collection.video.webUrl = collection.video.links[1].url;

    const activeLesson = videoPlayer.find(record => record.collectionId === collection.id) || { collectionId: collection.id, startAt: collection.video.startAt || 0 };
          activeLesson.playAt = activeLesson.pausedAt || activeLesson.startAt;

    renderTemplate({ video: { ...collection.video, playAt: activeLesson.playAt } }, template.content, parent);

    setTimeout(() => {

        videoHandler.readyPlayer();

        let checkInt;

        const checkCurrentTime = player => {

            checkInt = setInterval(function() {
               const time = Math.floor(player.getCurrentTime());
               const times = collection.items.filter(sp => sp.time);
               const match = times.find(sp => R.contains(time, sp.time));
               if(match) {
                   videoHandler.onSpeciesTimeMatchListeners.map(listener => listener(collection, match));
               }
            }, 1000);
        };

        const onPlayerStateChangeCallback = player => {

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

        videoHandler.onPlayerStateChangeListeners.push(onPlayerStateChangeCallback);
        
    }, 1000);
        
    const video = document.getElementsByTagName('iframe')[0];
    const videoWidth = video.offsetWidth;
          video.height = videoWidth * 9/16;
  
};