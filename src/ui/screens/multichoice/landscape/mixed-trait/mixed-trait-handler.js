import * as R from 'ramda';

import { store } from 'redux/store';
import { scoreHandler, bindScore } from 'ui/helpers//score-handler';
import { firestore } from 'api/firebase/firestore';
import { utils } from 'utils/utils';
import { traitsHandler } from 'ui/helpers/traits-handler';

const onTraitsReadyListeners = [];
const onTraitsReady = listener => {
    onTraitsReadyListeners.push(listener);
};

const onTraitClickedListeners = [];
const onTraitClicked = listener => {
    onTraitClickedListeners.push(listener);
};

const fetchTraits = async (trait, traitValues, glossary) => {

    let requiredTraitValues;

    for (let [key, obj] of Object.entries(traitValues)) {
        if(utils.toCamelCase(key).toLowerCase() === trait.toLowerCase()) {
            requiredTraitValues = obj.value.map(v => v.toLowerCase());
        }
    };

    let traits = await firestore.getTraitDefinitions(glossary, trait);
        traits.forEach(trait => trait.term = trait.term.toLowerCase());

    let multiples = traitsHandler.getNMultiplesFromArray(traits.map(t => t.term), requiredTraitValues.length);

        multiples = multiples.filter(multiple => {
            return !traitsHandler.doArraysHaveSameValues(multiple, requiredTraitValues);
        });
        
        let requiredTraits = traits.filter(t => R.contains(t.term, requiredTraitValues));
        
        multiples = utils.shuffleArray([ ...R.take(5, multiples), requiredTraitValues ]);

        traits = multiples.map(multiple => {
            return multiple.map(term => traits.find(trait => trait.term === term));
        });

    onTraitsReadyListeners.forEach(listener => listener(traits, requiredTraits));
};

const pendingScore = {};

const callback = (score, scoreUpdateTimer) => {
    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
          continueLessonBtn.disabled = false;
    pendingScore.score = score;
    pendingScore.scoreUpdateTimer = scoreUpdateTimer;
    
    continueLessonBtn.addEventListener('click', () => {
        window.clearTimeout(pendingScore.scoreUpdateTimer);
        bindScore(pendingScore.score);        
    });
};


const onClickTileHandler = (tile, requiredTraits, tiles) => {

    const { config, lesson, collection } = store.getState();

    const item = collection.nextItem;

    tile.addEventListener('click', e => {
        
        const tile = e.currentTarget;
        const traits = Array.from(tile.querySelectorAll('img')).map(t => t.dataset.term);
        const test = {
            points: 0,
            binomial: item.name, 
            trait: true,
            question: requiredTraits.map(trait => trait.term),
            answer: traits,
            questionCount: lesson.questionCount, 
            layoutCount: lesson.layoutCount, 
        }
        scoreHandler('image-match', test, callback, config);

        tiles.forEach(tile => {
            if(!traitsHandler.doArraysHaveSameValues(Array.from(tile.querySelectorAll('img')).map(img => img.dataset.term), requiredTraits.map(trait => trait.term))) {
                tile.querySelectorAll('img').forEach(img => img.classList.add('desaturate'));
            }
        });
})};

export const mixedTraitHandler = {
    fetchTraits,
    onTraitsReady,
    onTraitClicked,
    onClickTileHandler
};