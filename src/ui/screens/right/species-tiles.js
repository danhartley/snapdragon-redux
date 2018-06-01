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
        DOM.headerTxt.innerHTML =  config.isSmallDevice 
                                    ? `Click picture to match species.`
                                    : `Click the picture to match the species.`;
    });

    const callback = contentItem => {
        const images = contentItem.images.filter(img => img !== undefined);

        return `<div class="tile">
                    <img src="${images[0]}" name="${contentItem.name}" /> 
                </div>`;
    };

    renderTiles(screen, item, callback, config);
};