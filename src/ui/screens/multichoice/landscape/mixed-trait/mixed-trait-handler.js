import * as R from 'ramda';

import { store } from 'redux/store';
import { scoreHandler } from 'ui/helpers//score-handler';
import { firestore } from 'api/firebase/firestore';
import { utils } from 'utils/utils';

const onTraitsReadyListeners = [];
const onTraitsReady = listener => {
    onTraitsReadyListeners.push(listener);
};

const onTraitClickedListeners = [];
const onTraitClicked = listener => {
    onTraitClickedListeners.push(listener);
};

const fetchTraits = async (trait, traitValues) => {

    let requiredTraitValue;

    for (let [key, obj] of Object.entries(traitValues)) {
        if(utils.toCamelCase(key).toLowerCase() === trait.toLowerCase()) {
            requiredTraitValue = obj.value[0];
        }
    };

    let traits = await firestore.getTraitDefinitions(['fungi'], trait); // hack

    let requiredTrait = traits.find(t => t.term === requiredTraitValue);

        traits = [ ...R.take(5, traits.filter(t => t.term.toLowerCase() !== requiredTrait.term.toLowerCase())), requiredTrait ];

    onTraitsReadyListeners.forEach(listener => listener(traits, requiredTrait));
};

const pendingScore = {};

const callback = (score, scoreUpdateTimer) => {
    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
          continueLessonBtn.disabled = false;
    pendingScore.score = score;
    pendingScore.scoreUpdateTimer = scoreUpdateTimer;
};

const onClickTileHandler = (tile, requiredTrait) => {

    const { config } = store.getState();

    tile.addEventListener('click', e => {
    const trait = e.currentTarget;
    const test = {
        trait: true,
        question: requiredTrait.term,
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