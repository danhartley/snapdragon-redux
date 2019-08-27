import * as R from 'ramda';

import { firestore } from 'api/firebase/firestore';
import { scoreHandler } from 'ui/helpers/handlers';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { DOM } from 'ui/dom';
import { iconicTaxa, matchIcon } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';
import { getPoolItems } from 'snapdragon-engine/pool-handler';

import specimensTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images-template.html';

const listenersToImageSelection = [];
const listenersToUserAnswer = [];

export const listenToUserAnswer = listener => { 
    listenersToUserAnswer.push(listener);
};

export const listenToImageSelection = listener => {
    listenersToImageSelection.push(listener);
};

export const renderMixedSpecimenImages = (collection, noOfImagesPerItem, preselectedItems) => {

    const imagesPerItem = noOfImagesPerItem || 1;

    const { config, score, lesson } = store.getState();

    const item = R.clone(collection.nextItem);

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = specimensTemplate;

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const renderSpecimenImages = async () => {
 
        const mixedItems = preselectedItems || await getPoolItems(collection);

        mixedItems.map(item => item.images.map(image => {
            return image = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config).medium;
        }));

        const images = utils.shuffleArray(mixedItems).map((item, index) => {
            
            const itemImages = utils.shuffleArray(item.images);

            return itemImages.map((image, imageIndex) => {
                if(imageIndex < imagesPerItem) {
                    return { index: index + index + imageIndex, ...image, itemName: item.name };
                }
            }).filter(image => image);
        }).flat();

        parent.innerHTML = '';

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
            image.addEventListener('click', async event => {
                
                const selectedImage = event.target;
                const selectedName = selectedImage.dataset.itemName;
                const selectedItem = await firestore.getSpeciesByName(selectedName);

                const question = item.name;
                const answer = selectedItem.name;

                imageTiles.forEach(tile => {
                    if(tile.dataset.itemName !== item.name) {
                        tile.classList.add('desaturate');
                    }
                });

                const questionItem = await firestore.getSpeciesByName(question);
                const answerItem = await firestore.getSpeciesByName(question);

                const test = { ...score, itemId: item.id, 
                    question, answer, binomial: item.name, 
                    questionCount: lesson.questionCount, layoutCount: lesson.layoutCount, 
                    points: 0, icon: matchIcon(item.taxonomy, iconicTaxa),
                    vernacularName: itemProperties.getVernacularName(questionItem, config),
                    answerVernacularName: itemProperties.getVernacularName(answerItem, config)};
                    
                scoreHandler('image-match', test, callback, config);
            });
        });
    };

    renderSpecimenImages();
};