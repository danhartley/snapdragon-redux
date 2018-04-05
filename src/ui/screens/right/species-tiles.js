import { store } from 'redux/store';
import { renderTilesScreen } from 'ui/screens/common/tiles';

export const renderSpeciesTiles = (card) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'tiles')[0];

    if(!screen) return;

    const item = card;

    item.content = item.multipleImages;

    const callback = contentItem => {        
        return `<div class="tile">
                    <img src="${contentItem.images[0]}" name="${item.name}" /> 
                </div>`;
    };

    renderTilesScreen(screen, item, callback);
};