import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTiles } from 'ui/screens/common/tiles';

export const renderSpeciesTiles = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-images')[0];

    if(!screen) return;

    const images = R.take(5, item.multipleImages.filter(image => image.name !== item.name));
        images.push(R.take(5, item.multipleImages.filter(image => image.name === item.name))[0]);
        item.content = images;

    setTimeout(()=>{
        DOM.headerTxt.innerHTML = config.isSmallDevice ? screen.headers.short : screen.headers.long;
    });

    const callback = contentItem => {
        const images = contentItem.images.filter(img => img !== undefined);

        return `<div class="tile"
                    style="cursor: pointer; background-image: url(${images[0]}); background-size:cover;"
                    data-name="${contentItem.name}">
                </div>`;
    };

    renderTiles(screen, item, callback, config);
};