import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderStrips } from 'ui/screens/common/strips';

export const renderSpeciesStrips = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-binomial-strips')[0];

    if(!screen) return;

    const callback = contentItem => {

        return `<div class="strip">
                    <div id="${contentItem.id}">${contentItem.binomialAnswer}</div>
                </div>`;
       };

    renderStrips(screen, item, callback);
};
