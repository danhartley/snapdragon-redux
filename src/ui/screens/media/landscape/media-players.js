import { getBirdTraits } from 'api/traits/bird-traits';

export const renderMediaPlayers = collection => {

    let isAudio = true;

    const mediaPlayers = isAudio 
                ? document.querySelectorAll('.media-audio-players')
                : document.querySelectorAll('.media-video-players');
};