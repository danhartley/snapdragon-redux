const onSpeciesTimeMatchListeners = [];

const onSpeciesTimeMatch = listener => {    
    while(onSpeciesTimeMatchListeners.length > 0) {
        onSpeciesTimeMatchListeners.pop();
    }
    onSpeciesTimeMatchListeners.push(listener);
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

let player;

const readyPlayer = () => {

    const onPlayerReady = event => {
        player = event.target;
    };
    
    const onPlayerStateChange = event => {
        player = event.target;
        if(player) {
            console.log('player state onPlayerStateChange: ', player.getPlayerState());
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

const getLessonState = (videoPlayer, lesson) => {

    let state = '';

    const activeLesson = videoPlayer.find(record => record.collectionId === lesson.id);
    
    if(activeLesson) {
        if(lesson.id === activeLesson.collectionId) {
        state = activeLesson.pausedAt ? `Video paused  at ${activeLesson.speciesName}` : ''; 
        }
    } else {
        state = '';
    }

    return state;

};

export const videoHandler = {
    readyPlayer,
    onSpeciesTimeMatchListeners,
    onSpeciesTimeMatch,
    onSpeciesPlayRequestListeners,
    onSpeciesPlayRequest,
    onPlayerReadyListeners,
    subscribeToPlayerStateChange,
    playVideoFrom,
    states,
    getLessonState
};