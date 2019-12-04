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
// 0 – ended
// 1 – playing
// 2 – paused
// 3 – buffering
// 5 – video cued

const states = [ { key: -1, value: 'unstarted' }, { key: 1, value: 'playing' }, { key: 2, value: 'paused' } ];

const setVideoState = (videoPlayer, lesson) => {

    let state = '';

    const activeLesson = videoPlayer.find(record => record.collectionId === lesson.id);
    
    if(activeLesson) {
        if(lesson.id === activeLesson.collectionId) {
        state = activeLesson.pausedAt ? `Video paused at ${activeLesson.speciesName}` : ''; 
        }
    } else {
        state = '';
    }

    return state;

};

const isVideoPlayerReady = videoId => {
    console.log('video player: ', player);
    console.log('video url: ', player.getVideoUrl());
    const doIdsMatch = videoId === player.getVideoData().video_id;
    return isPlayerReady && doIdsMatch;
};

const destroyPlayer = () => {

    while(onPlayerStateChangeListeners.length > 0) {
        onPlayerStateChangeListeners.pop();
    }

    while(onSpeciesTimeMatchListeners.length > 0) {
        onSpeciesTimeMatchListeners.pop();
    }

    if (!player) {
        console.log("Player could not be found.");
      } else {
        player.stopVideo();
        player.destroy();
        player = null;  // Clear out the reference to the destroyed player
      }
};

const saveVideoState = player => {
    actions.boundUpdateVideoPlayer(player);
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
    saveVideoState,
    isVideoPlayerReady
};