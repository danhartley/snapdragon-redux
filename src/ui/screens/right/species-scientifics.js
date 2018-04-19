import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderStrips } from 'ui/screens/common/strips';

export const renderScientifics = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-scientifics')[0];

    if(!screen) return;

    const callback = contentItem => {

        return `<div class="strip">
                    <div id="${contentItem.id}">${contentItem.binomialAnswer}</div>
                </div>`;
       };

    renderStrips(screen, item, callback, config);
};
