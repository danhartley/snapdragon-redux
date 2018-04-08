import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderStrips } from 'ui/screens/common/strips';

export const renderSpeciesNamesStrips = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-vernacular-strips')[0];

    if(!screen) return;

    const callback = contentItem => {

        return `<div class="strip">
                    <div class="capitalised" id="${contentItem.id}" data-vernacular="${contentItem.vernacularQuestion}">${contentItem.vernacularAnswer}</div>
                </div>`;
       };

    renderStrips(screen, item, callback);
};
