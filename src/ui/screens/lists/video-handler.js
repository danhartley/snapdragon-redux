import { clone } from 'ramda';

import { actions } from 'redux/actions/action-creators';

const onSpeciesTimeMatchListeners = [];
const onNoteTimeMatchListeners = [];

const onSpeciesTimeMatch = listener => {    
    while(onSpeciesTimeMatchListeners.length > 0) {
        onSpeciesTimeMatchListeners.pop();
    }
    onSpeciesTimeMatchListeners.push(listener);
};

const onNoteTimeMatch = listener => {    
    while(onNoteTimeMatchListeners.length > 0) {
        onNoteTimeMatchListeners.pop();
    }
    onNoteTimeMatchListeners.push(listener);
};

const onSpeciesPlayRequestListeners = [];

const onSpeciesPlayRequest = listener => {
    onSpeciesPlayRequestListeners.push(listener);
};

const onPlayerReadyListeners = [];
const onPlayerStateChangeListeners = [];

const subscribeToPlayerStateChange = listener => {
    while(onPlayerStateChangeListeners.length > 0) {
        onPlayerStateChangeListeners.pop();
    }
    onPlayerStateChangeListeners.push(listener);
};

let player, isPlayerReady = false;

const readyPlayer = () => {

    const onPlayerReady = event => {
        player = event.target;
        isPlayerReady = true;
    };
    
    const onPlayerStateChange = event => {
        player = event.target;
        if(player) {
            onPlayerStateChangeListeners.forEach(listener => listener(player));
        }
     };
    
    new YT.Player('embedded-video', {
        playerVars: { 'autoplay': 1 },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
};

const playVideoFrom = time => {

    if(! typeof player.getPlayerState === 'function' || player.getPlayerState === undefined) return;
    if(! typeof player.seekTo === 'function' || player.seekTo === undefined) return;

    player.seekTo(time + 1);
    const state = player.getPlayerState();
    if(state === states[0].key || state === states[2].key) {
        player.playVideo();
    }
};

// -1 – unstarted
//  0 – ended
//  1 – playing
//  2 – paused
//  3 – buffering
//  5 – video cued

const states = [ { key: -1, value: 'unstarted' }, { key: 1, value: 'playing' }, { key: 2, value: 'paused' }, { key: 3, value: 'buffering' } ];

const setVideoState = (videoPlayer, lesson) => {

    let state = '';

    const activeLesson = videoPlayer.find(record => record.collectionId === lesson.id);
    
    if(activeLesson) {
        if(lesson.id === activeLesson.collectionId) {
        state = activeLesson.pausedAt 
                  ? activeLesson.speciesName !== ''
                    ? `Video paused at ${activeLesson.speciesName}`
                    : 'Video paused'
                  : ''; 
        }
    } else {
        state = '';
    }

    return state;

};

const isVideoPlayerReady = videoId => {
    if(isPlayerReady) {
        const doIdsMatch = videoId === player.getVideoData().video_id;
        return isPlayerReady && doIdsMatch;
    } else {
        return false;
    }
};

const destroyPlayer = () => {

    while(onPlayerStateChangeListeners.length > 0) {
        onPlayerStateChangeListeners.pop();
    }

    while(onSpeciesTimeMatchListeners.length > 0) {
        onSpeciesTimeMatchListeners.pop();
    }

    if (!player) {

      } else {
        player.stopVideo();
        player.destroy();
        player = null;  // Clear out the reference to the destroyed player
      }
};

const updateVideoPlayer = (videoPlayer, collection, species) => {

  const newPlayerTime = Math.floor(player.getCurrentTime());
        
  const playerRecords = clone(videoPlayer) || [];
  
  let activeLesson = playerRecords.find(p => p.collectionId === collection.id); 
  
    if(activeLesson) {        
      if(activeLesson.pausedAt === newPlayerTime) return; // user pauses lesson, and then resumes
      // user jumps to another point in the lesson
      activeLesson.speciesName = species ? species.name : activeLesson.speciesName || '';
      activeLesson.pausedAt = species && species.time ? species.time[0] : newPlayerTime;
      activeLesson.playAt = newPlayerTime;
    } else {
      activeLesson = { 
        collectionId: collection.id,
        speciesName: '',
        pausedAt: newPlayerTime,
        playerRecords: newPlayerTime,
      };
      playerRecords.push(activeLesson);
  } 

  actions.boundUpdateVideoPlayer(playerRecords);
};

const getPlayerTime = () => {
    return Math.floor(player.getCurrentTime());
};

export const videoHandler = {
    readyPlayer,
    onSpeciesTimeMatchListeners,
    onNoteTimeMatchListeners,
    onSpeciesTimeMatch,
    onNoteTimeMatch,
    onSpeciesPlayRequestListeners,
    onSpeciesPlayRequest,
    onPlayerReadyListeners,
    subscribeToPlayerStateChange,
    playVideoFrom,
    states,
    setVideoState,
    destroyPlayer,
    isVideoPlayerReady,
    getPlayerTime,
    updateVideoPlayer
};