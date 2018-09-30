import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';
import { modalImagesHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenTemplate from 'ui/screens/multichoice/mixed-specimen-tiles-template.html';
import { screenShare } from 'ui/screens/multichoice/mixed-specimen-shared';

export const renderMixedSpecimenTiles = (ui) => {

    const { collection, config } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenTemplate;

    const selectImage = (selectedIndex, selectedName, isCorrectAnswer) => {
        const imageLayers = document.querySelectorAll('.js-tiles .square .layer');
        imageLayers.forEach(imageLayer => {
            if(imageLayer.children.length === 0) return;
            if(imageLayer.children[0].innerHTML === selectedIndex) {
                imageLayer.children[0].innerHTML = selectedName;
                imageLayer.innerHTML = selectedName;
                imageLayer.setAttribute('style', 'font-size: 1em;');
                if(isCorrectAnswer) {
                    elem.addClassToSelected(imageLayers, imageLayer, ['snap-success', 'snap-alert'], 'snap-success' );
                } else {
                    elem.addClassToSelected(imageLayers, imageLayer, ['snap-success', 'snap-alert'], 'snap-alert' );
                }
            }
        });
    };

    screenShare.subscribeToImageSelection(selectImage);
    const images = screenShare.getRandomImages(item, config);

    if(!images) return;

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    renderTemplate({images}, template.content, parent);

    modalImagesHandler(document.querySelectorAll('.js-tiles .square'), null, collection, 'withheld');
};