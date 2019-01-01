import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';
import { modalImagesHandler, imageUseCases, scaleImage } from 'ui/helpers/image-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenTemplate from 'ui/screens/multichoice/mixed-specimen-tiles-template.html';
import { screenShare } from 'ui/screens/multichoice/mixed-specimen-shared';

export const renderMixedSpecimenTiles = (ui) => {

    const { collection, config } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenTemplate;

    const selectImage = (selectedIndex, selectedName, isCorrectAnswer, correctAnswer) => {
        const imageLayers = document.querySelectorAll('.js-tiles .js-layer-specimens');
        imageLayers.forEach(imageLayer => {
            if(imageLayer.dataset.itemName === selectedName) {
                imageLayer.setAttribute('style', 'font-size: 1em;');
                if(isCorrectAnswer) {
                    elem.addClassToSelected(imageLayers, imageLayer, ['snap-success', 'snap-alert'], 'snap-success' );
                } else {
                    elem.addClassToSelected(imageLayers, imageLayer, ['snap-success', 'snap-alert'], 'snap-alert' );
                    const imageLayerItems = [ ...imageLayers ];
                    const correctImageLayer = imageLayerItems.find(il => il.dataset.itemName === correctAnswer);
                    correctImageLayer.classList.add('snap-success');
                    // correctImageLayer.children[0].innerHTML = correctAnswer;
                    correctImageLayer.setAttribute('style', 'font-size: 1em;');
                }
            }
        });
    };

    screenShare.subscribeToImageSelection(selectImage);
    // const images = screenShare.getRandomImages(item, config, 6);

    const items = R.take(6, collection.items);

    const images = items.map((item, index) => { 
                return { index: index + 1, ...item.images[0], itemName: item.name };
            });

    if(!images) return;

    images.forEach(image => {
        image.url = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config);
    });

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    renderTemplate({images}, template.content, parent);

    modalImagesHandler(document.querySelectorAll('.js-tiles .square'), null, collection, config, 'withheld');
};