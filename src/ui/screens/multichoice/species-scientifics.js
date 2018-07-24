import { store } from 'redux/store';
import { renderStrips } from 'ui/screens/multichoice/strips';

export const renderScientifics = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config, layouts } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-scientifics')[0];

    if(!screen) return;

    const callback = contentItem => {

        return `<div class="strip">
                    <div id="${contentItem.id}">${contentItem.binomialAnswer}</div>
                </div>`;
       };

    const questionCount = layouts.filter(l => l.name === 'test').length;

    renderStrips(screen, item, callback, config, questionCount);
};
