import * as R from 'ramda';

import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';

import { videoHandler } from 'ui/screens/lists/video-handler';

import videoTemplate from 'ui/screens/home/home-lesson-intro-video-template.html';

export const videoSetup = (collection, videoPlayer, parent) => {
   
    const updateVideoPlayer = (collection, species) => {
        
        const player = store.getState().videoPlayer || [];
        
        let activeLesson = player.find(p => p.collectionId === collection.id); 
        
        if(!activeLesson) {
            activeLesson = { collectionId: collection.id };
            player.push(activeLesson);
        };

        activeLesson.speciesName = species.name;
        activeLesson.pausedAt = species.time[0];
    
        actions.boundUpdateVideoPlayer(player);
    };

    videoHandler.onSpeciesTimeMatch(updateVideoPlayer);

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
        
    });
        
    const video = document.getElementsByTagName('iframe')[0];
    const videoWidth = video.offsetWidth;
          video.height = videoWidth * 9/16;
  
};