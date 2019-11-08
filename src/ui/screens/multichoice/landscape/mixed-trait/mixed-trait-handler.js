import * as R from 'ramda';

import { store } from 'redux/store';
import { scoreHandler } from 'ui/helpers//score-handler';
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
            requiredTraitValues = obj.value;
        }
    };

    let traits = await firestore.getTraitDefinitions(glossary, trait);

    const pairs = traitsHandler.getNPairsFromArray(traits.map(t => t.term), requiredTraitValues.length);

    console.log(pairs);

    let requiredTraits = traits.filter(t => R.contains(t.term, requiredTraitValues));
    let number = 6 - requiredTraits.length;

        traits = [ 
            ...R.take(number, traits.filter(t => !R.contains(t, requiredTraits))),
            ...requiredTraits 
        ];

    onTraitsReadyListeners.forEach(listener => listener(traits, requiredTraits));
};

const pendingScore = {};

const callback = (score, scoreUpdateTimer) => {
    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
          continueLessonBtn.disabled = false;
    pendingScore.score = score;
    pendingScore.scoreUpdateTimer = scoreUpdateTimer;
};

const onClickTileHandler = (tile, requiredTraits) => {

    const { config } = store.getState();

    tile.addEventListener('click', e => {
    const trait = e.currentTarget;
    const test = {
        trait: true,
        question: requiredTraits.map(trait => trait.term),
        answer: trait.dataset.term
    }
    scoreHandler('image-match', test, callback, config);
})};

export const mixedTraitHandler = {
    fetchTraits,
    onTraitsReady,
    onTraitClicked,
    onClickTileHandler
};