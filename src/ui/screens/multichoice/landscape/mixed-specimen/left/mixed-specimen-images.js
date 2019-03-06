import * as R from 'ramda';

import { species } from 'api/species';
import { scoreHandler } from 'ui/helpers/handlers';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { DOM } from 'ui/dom';
import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';
import specimensTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images-template.html';

const listenersToImageSelection = [];
const listenersToUserAnswer = [];

export const listenToUserAnswer = listener => { 
    listenersToUserAnswer.push(listener);
};

export const listenToImageSelection = listener => {
    listenersToImageSelection.push(listener);
};

export const renderMixedSpecimenImages = collection => {

    const { config, score, lessonPlan } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = specimensTemplate;

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const itemRank = matchTaxon(item.taxonomy, iconicTaxa).toLowerCase();
    const itemPool = species;
    const clonedItems = R.clone(itemPool.filter(item => matchTaxonKey(item.taxonomy,[itemRank])));
    const mixedItems = R.take(5, utils.shuffleArray(clonedItems.filter(ci => ci.name !== item.name)));
    mixedItems.push(R.clone(item));

    mixedItems.map(item => item.images.map(image => {
        return image.url = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config);
    }));

    const images = utils.shuffleArray(mixedItems).map((item, index) => { 
        return { index: index + 1, ...utils.shuffleArray(item.images)[0], itemName: item.name };
    });

    listenersToImageSelection.forEach(listener => listener(images));
        
    renderTemplate({ images }, template.content, parent);

    const callback = (score, scoreUpdateTimer) => {
        console.log(score);
        listenersToUserAnswer.forEach(listener => listener(score, scoreUpdateTimer));
    };

    document.querySelectorAll('.js-tiles').forEach(image => {
        image.addEventListener('click', event => {

            const selectedImage = event.target;
            const selectedName = selectedImage.dataset.itemName;
            const selectedItem = species.find(item => item.name === selectedName);

            const question = item.name;
            const answer = selectedItem.name;

            const test = { ...score, itemId: selectedItem.id, question, answer, binomial: selectedItem.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: 0};
            scoreHandler('image-match', test, callback, config);
        });
    });

};