import { store } from 'redux/store';
import { modalHandler } from 'ui/helpers/handlers';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import landscapeTemplate from 'ui/screens/left/specimen-tiles-template.html';

export const renderSpecimenTiles = (collection) => {

    const item = collection.items[collection.itemIndex];

    if(!item) return;

    const { layout, config } = store.getState();

    DOM.collectionTxt.innerHTML = collection.name;

    let screen = layout.screens.filter(el => el.name === 'specimen-images')[0];

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

    screen.parent.innerHTML = '';

    renderTemplate({ images }, template.content, screen.parent);

    modalHandler(document.querySelectorAll('.js-tiles .square'), item);
};