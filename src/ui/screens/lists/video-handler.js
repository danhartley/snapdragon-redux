const onSpeciesTimeMatchListeners = [];

const onSpeciesTimeMatch = listener => {    
    // while(onSpeciesTimeMatchListeners.length > 0) {
    //     onSpeciesTimeMatchListeners.pop();
    // }
    console.log('onSpeciesTimeMatchListeners count: ', onSpeciesTimeMatchListeners.length);
    onSpeciesTimeMatchListeners.push(listener);
};

const onSpeciesPlayRequestListeners = [];

const onSpeciesPlayRequest = listener => {
    onSpeciesPlayRequestListeners.push(listener);
};

const onPlayerReadyListeners = [];
const onPlayerStateChangeListeners = [];

let player;

const readyPlayer = () => {

    const onPlayerReady = event => {
        player = event.target;
    };
    
    const onPlayerStateChange = event => {
        player = event.target;
        onPlayerStateChangeListeners.forEach(listener => listener(player));
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

const states = [ { key: -1, value: 'unstarted' }, { key: 1, value: 'playing' }, { key: 2, value: 'paused' } ];

const getLessonState = (videoPlayer, lesson) => {

    let state = '';

    const activeLesson = videoPlayer.find(record => record.collectionId === lesson.id);
    
    if(activeLesson) {
        if(lesson.id === activeLesson.collectionId) {
        state = activeLesson.pausedAt ? 'Video paused' : ''; 
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
    onPlayerStateChangeListeners,
    playVideoFrom,
    states,
    getLessonState
};