import { species } from 'api/species';
import { scoreHandler } from 'ui/helpers/handlers';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { DOM } from 'ui/dom';
import { iconicTaxa, matchIcon } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';
import specimensTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images-template.html';
import { getPoolItems } from 'ui/screens/multichoice/missing-data-helper';

const listenersToImageSelection = [];
const listenersToUserAnswer = [];

export const listenToUserAnswer = listener => { 
    listenersToUserAnswer.push(listener);
};

export const listenToImageSelection = listener => {
    listenersToImageSelection.push(listener);
};

export const renderMixedSpecimenImages = (...args) => {

    const collection = args[0];
    const noOfImagesPerItem = args[1] || 1;
    const preselectedItems = args[2];

    const { config, score, lesson } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = specimensTemplate;

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const mixedItems = preselectedItems || getPoolItems(collection);

    mixedItems.map(item => item.images.map(image => {
        return image.url = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config);
    }));

    const images = utils.shuffleArray(mixedItems).map((item, index) => {
        
        const itemImages = utils.shuffleArray(item.images);

        return itemImages.map((image, imageIndex) => {
            if(imageIndex < noOfImagesPerItem) {
                return { index: index + index + imageIndex, ...image, itemName: item.name };
            }
        }).filter(image => image);
    }).flat();

    renderTemplate({ images }, template.content, parent);

    setTimeout(() => {
        listenersToImageSelection.forEach((listener, index) => {
            if(index === 0) {
                listener(images);
            }
        });
    }, 250);
        
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

            const test = { ...score, itemId: item.id, 
                question, answer, binomial: item.name, 
                questionCount: lesson.questionCount, layoutCount: lesson.layoutCount, 
                points: 0, icon: matchIcon(item.taxonomy, iconicTaxa),
                vernacularName: itemProperties.getVernacularName(species.find(sp => sp.name === question), config),
                answerVernacularName: itemProperties.getVernacularName(species.find(sp => sp.name === answer), config)};
                
            scoreHandler('image-match', test, callback, config);
        });
    });
};