import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { modalImagesHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import landscapeTemplate from 'ui/screens/landscape/specimen-tiles-template.html';

export const renderSpecimenTiles = (collection) => {

    const item = collection.items[collection.itemIndex];

    if(!item) return;

    const { layout } = store.getState();

    let screen = layout.screens.find(el => el.name === 'specimen-images');

    if(layout.screens[0].name === 'command') screen = layout.screens[0].left;

    if(!screen) return;

    const template = document.createElement('template');

    template.innerHTML = landscapeTemplate;

    let images = [];

    item.imageIndices.forEach(index => {
        const image = item.images[index];
        if(image && index < 4)
            images.push(image);
    });

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    renderTemplate({ images }, template.content, parent);

    modalImagesHandler(document.querySelectorAll('.js-tiles .square'), item);
};