import * as R from 'ramda';

import { species } from 'api/species';
import { scoreHandler } from 'ui/helpers/handlers';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { DOM } from 'ui/dom';
import { iconicTaxa, matchIcon, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';
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
    const itemPool = species.filter(sp => sp.images);
    const clonedItems = R.clone(itemPool.filter(item => matchTaxonKey(item.taxonomy,[itemRank])));
    const mixedItems = R.take(5, utils.shuffleArray(clonedItems.filter(ci => ci.name !== item.name)));
    mixedItems.push(R.clone(item));

    mixedItems.map(item => item.images.map(image => {
        return image.url = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config);
    }));

    const images = utils.shuffleArray(mixedItems).map((item, index) => { 
        return { index: index + 1, ...utils.shuffleArray(item.images)[0], itemName: item.name };
    });

    renderTemplate({ images }, template.content, parent);

    listenersToImageSelection.forEach((listener, index) => {
        if(index === 0) {
            listener(images);
        }        
    });
        
    const callback = (score, scoreUpdateTimer) => {
        listenersToUserAnswer.forEach(listener => listener(score, scoreUpdateTimer));
    };

    const imageTiles = document.querySelectorAll('.js-tiles img');

    imageTiles.forEach(image => {
        image.addEventListener('click', event => {
            
            const selectedImage = event.target;
            const selectedName = selectedImage.dataset.itemName;
            const selectedItem = species.find(item => item.name === selectedName);

            const question = item.name;
            const answer = selectedItem.name;

            imageTiles.forEach(tile => {
                if(tile.dataset.itemName !== item.name) {
                    tile.classList.add('desaturate');
                }
            });

            const test = { ...score, itemId: selectedItem.id, 
                question, answer, binomial: selectedItem.name, 
                questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, 
                points: 0, icon: matchIcon(item.taxonomy, iconicTaxa),
                vernacularName: itemProperties.getVernacularName(species.find(sp => sp.name === question), config),
                answerVernacularName: itemProperties.getVernacularName(species.find(sp => sp.name === answer), config)};
                
            scoreHandler('image-match', test, callback, config);
        });
    });
};