import { contains } from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { videoHandler } from 'ui/screens/lists/video-handler';

import videoTemplate from 'ui/screens/home/home-lesson-intro-video-template.html';

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
               const match = matchSpeciesTime(time, collection);
               if(!!match) {
                   videoHandler.onSpeciesTimeMatchListeners.map(listener => listener(collection, match));
               }
               if(!collection.notes) return;
               const noteMatch = collection.notes.find(note => contains(time, note.time));
               if(noteMatch) {
                   videoHandler.onNoteTimeMatchListeners.map(listener => listener(collection, noteMatch));
               }
            }, 1000);
        };

        const onPlayerStateChangeCallback = player => {

            if(!typeof player.getPlayerState === 'function' || player.getPlayerState === undefined) return;

            const playerState = player.getPlayerState();

            videoHandler.updateVideoPlayer(store.getState().videoPlayer, collection, activeLesson.speciesName);

            switch(playerState) {
                case videoHandler.states.find(state => state.value === 'playing').key: // 1
                    checkCurrentTime(player);
                    break;
                case videoHandler.states.find(state => state.value === 'paused').key: // 2
                    clearInterval(checkInt);
                    checkInt = null;
                    break;
                default:
                    checkCurrentTime(player);
            }
        };

        videoHandler.subscribeToPlayerStateChange(onPlayerStateChangeCallback);

        if(startTime) {
            setTimeout(() => {
                videoHandler.playVideoFrom(startTime);
            }, 1000);
        }        

    }, timeBeforeVideoPlayerReady);
        
    const video = document.getElementsByTagName('iframe')[0];
    const videoWidth = video.offsetWidth;
          video.height = videoWidth * 9/16;
  
};

export const matchSpeciesTime = (time, collection) => {
  const species = collection.items ? collection.items.filter(sp => sp.time) : collection.species.filter(sp => sp.time);
  const match = species.find(sp => contains(time, sp.time));
  return match;
}
