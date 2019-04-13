import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';

import birdsongTemplate from 'ui/screens/media/media-birdsong-template.html';
import { renderTemplate } from 'ui/helpers/templating';

import { getBirdTraits } from 'api/traits/bird-traits';

import audioPlayersTemplate from 'ui/screens/media/media-audio-players-template.html';

export const renderBirdsong = collection => {

    const { config, enums } = store.getState();

    const item = collection.nextItem;

    let template = document.createElement('template');
        
    template.innerHTML = birdsongTemplate;

    let xcID = traits.find(bird => bird.name === item.name);
        xcID = xcID.traits.find(trait => trait.name === 'song').value;

    let mp3 = './songs/432786.mp3';
        mp3 = xcID ? `./songs/${xcID}.mp3` : mp3;

    let parent = DOM.rightBody;
        parent.innerHTML = '';

    let isAudio = true;

    renderTemplate({ mp3 }, template.content, parent);

    if(config.isPortraitMode) {

        const mediaPlayers = isAudio 
                    ? document.querySelector('.media-audio-players')
                    : document.querySelector('.media-video-players');

        const traits = getBirdTraits(enums);

        let xcIDs = R.take(3, traits.filter(bird => bird.name !== item.name));
            xcIDs = xcIDs.map(xcID => xcID.traits.find(trait => trait.name === 'song').value);
            
            xcIDs.push(xcID)

            xcIDs = utils.shuffleArray(xcIDs);

            template = document.createElement('template');

            template.innerHTML = audioPlayersTemplate;

            parent = mediaPlayers;

            const mp3s = xcIDs.map(xcID => {
                return `./songs/${xcID}.mp3`;
            });

        renderTemplate({ mp3s }, template.content, parent);        
    }    
};