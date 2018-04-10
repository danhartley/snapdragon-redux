import { store } from 'redux/store';
import { renderTiles } from 'ui/screens/common/tiles';

export const renderSpeciesTiles = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-images')[0];

    if(!screen) return;

    item.content = item.multipleImages;

    const callback = contentItem => {        
        return `<div class="tile">
                    <img src="${contentItem.images[0]}" name="${contentItem.name}" /> 
                </div>`;
    };

    renderTiles(screen, item, callback);
};