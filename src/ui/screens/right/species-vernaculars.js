import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderStrips } from 'ui/screens/common/strips';

export const renderVernaculars = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-vernaculars')[0];

    if(!screen) return;

    const callback = contentItem => {

        return `<div class="strip">
                    <div class="capitalised" id="${contentItem.id}" data-vernacular="${contentItem.vernacularQuestion}">${contentItem.vernacularAnswer}</div>
                </div>`;
       };

    DOM.headerTxt.innerHTML = `Click the common name to match the species.`;
    DOM.specimenSpeciesTxt.innerHTML = item.name;

    renderStrips(screen, item, callback, config);
};
