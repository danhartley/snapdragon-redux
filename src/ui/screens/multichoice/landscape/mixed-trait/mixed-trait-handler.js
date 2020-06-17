import * as R from 'ramda';

import { store } from 'redux/store';
import { scoreHandler, bindScore } from 'ui/helpers//score-handler';
import { firestore } from 'api/firebase/firestore';
import { utils } from 'utils/utils';
import { traitsHandler } from 'ui/helpers/traits-handler';
import { snapLog, logError } from 'ui/helpers/logging-handler';

const onTraitsReadyListeners = [];
const onTraitsReady = listener => {
    onTraitsReadyListeners.push(listener);
};

const onTraitClickedListeners = [];
const onTraitClicked = listener => {
    onTraitClickedListeners.push(listener);
};

const getMatchingTrait = (layoutTraits, traitValues) => {

    try {
        let requiredTraitValues, trait;

        for (let [key, obj] of Object.entries(traitValues)) {
            let t;
            layoutTraits.map(t => { 
                if(t.toLowerCase() === utils.toCamelCase(key).toLowerCase()) {
                    requiredTraitValues = obj.value.map(v => v.toLowerCase());
                    trait = t;
                }
            }) 
        };
    
        return { requiredTraitValues, trait };
    } catch (e) {
      logError(getMatchingTrait, e);
      return { requiredTraitValues: [], trait: {}};
    }

};

const fetchTraits = async (trait, requiredTraitValues, required) => {

    const glossary = store.getState().glossary;

    let traits = await firestore.getTraitDefinitions(glossary, required, trait);
        traits.forEach(t => {
            t.term = t.term.toLowerCase();
            if(t.alt) t.alt = t.alt.toLowerCase();
            return t;
        });

    if(!requiredTraitValues) return { traits: null, requiredTraits: null};

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

    return { traits, requiredTraits };
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
        const images = Array.from(tiles).map(t => t.querySelector('img').dataset);
        const answers = images.map(i => { return { value: i.term, url: i.url } })
        const test = {
            points: 0,
            binomial: item.name, 
            trait: true,
            question: requiredTraits.map(trait => trait.term),
            answer: traits,
            questionCount: lesson.questionCount, 
            layoutCount: lesson.layoutCount,
            answers,
            questionText: 'Match the trait'
        }
        scoreHandler('image-match', test, callback, config);

        tiles.forEach(tile => {
            if(!traitsHandler.doArraysHaveSameValues(Array.from(tile.querySelectorAll('img')).map(img => img.dataset.term), requiredTraits.map(trait => trait.term))) {
                tile.querySelectorAll('img').forEach(img => img.classList.add('desaturate'));
            }
        });
})};

export const mixedTraitHandler = {
    getMatchingTrait,
    fetchTraits,
    onTraitsReady,
    onTraitClicked,
    onClickTileHandler
};