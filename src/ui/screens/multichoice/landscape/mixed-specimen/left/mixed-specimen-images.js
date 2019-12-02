import * as R from 'ramda';

import { firestore } from 'api/firebase/firestore';
import { scoreHandler } from 'ui/helpers//score-handler';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageUseCases, scaleImage } from 'ui/helpers/image-handler';
import { DOM } from 'ui/dom';
import { iconicTaxa, matchIcon } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';
import { getPoolItems } from 'snapdragon-engine/pool-handler';

import specimensTemplate from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images-template.html';

let listenersToImageSelection = [];
let listenersToUserAnswer = [];

export const listenToUserAnswer = listener => { 
    listenersToUserAnswer.push(listener);
};

export const listenToImageSelection = listener => {
    listenersToImageSelection.push(listener);
};

export const renderMixedSpecimenImages = (collection, noOfImagesPerItem, preselectedItems) => {

    let imagesPerItem = noOfImagesPerItem || 1;

    const { config, score, lesson } = store.getState();

    const item = R.clone(collection.nextItem);

    if(!item) return;

    console.log('RENDERMIXEDSPECIMENIMAGES');

    const template = document.createElement('template');
          template.innerHTML = specimensTemplate;

    const parent = DOM.leftBody;
          parent.innerHTML = '';

    const renderSpecimenImages = async () => {

        console.log('calling getPoolItems from renderMixedSpecimenImages');
 
        const mixedItems = preselectedItems || await getPoolItems(collection);

        const images = utils.shuffleArray(mixedItems).map((item, index) => {
            
            const itemImages = item.images.filter(i => i.starred).length > 0 ? item.images.filter(i => i.starred) : utils.shuffleArray(item.images);

            return itemImages.map((image, imageIndex) => {
                if(imageIndex < imagesPerItem) {
                    if(image.url) {
                        return { index: index + imageIndex, ...image, medium: scaleImage(image, imageUseCases.MIXED_SPECIMENS, config).medium, itemName: item.name };
                    } else {
                        imagesPerItem++;
                    }
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