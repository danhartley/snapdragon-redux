import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import birdsongTemplate from 'ui/screens/media/media-birdsong-template.html';

// import { getBirdTraits } from 'api/traits/bird-traits';

import audioPlayersTemplate from 'ui/screens/media/media-audio-players-template.html';

export const renderBirdsong = collection => {

    const init = async () => {

        const { config, enums } = store.getState();

        const item = collection.nextItem;

        let template = document.createElement('template');
            
        template.innerHTML = birdsongTemplate;

        let xcID = await firestore.getTraitsBySpeciesName(item.name);

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


            let birds = await firestore.getSpeciesByIconicTaxon({rank, value: item.iconicTaxon}, false);

            let traits;

            const getTraits = async birds => {
                return Promise.all(
                    birds.map(async(bird) => {
                            const birdTraits = await firestore.getTraitsBySpeciesName(bird);
                            traits.push(birdTraits);
                        })
                    );
                };
            };

            await getTraits(birds);

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
    };

    init();
};