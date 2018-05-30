import { store } from 'redux/store';
import { renderTile } from 'ui/screens/common/tile';
import { DOM } from 'ui/dom';

export const renderLeafTile = (collection) => {

    const item = collection.items[collection.itemIndex];

    if(!item) return;

    const { layout, config } = store.getState();

    DOM.collectionTxt.innerHTML = collection.name;
    
    let screen = layout.screens.filter(el => el.name === 'leaf-image')[0];

    if(!screen) return;

    renderTile(screen, item, config.callbackTime);

};