const listenersToVideoTimes = [];

const listenToVideoTimes = callback => {
    listenersToVideoTimes.push(callback);
};

const listenersToSpeciesPlayRequest = [];

const listenToSpeciesPlayRequest = callback => {
    listenersToSpeciesPlayRequest.push(callback);
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

export const videoPlayer = {
    readyPlayer,
    listenersToVideoTimes,
    listenToVideoTimes,
    listenersToSpeciesPlayRequest,
    listenToSpeciesPlayRequest,
    onPlayerReadyListeners,
    onPlayerStateChangeListeners,
    playVideoFrom,
    states
};