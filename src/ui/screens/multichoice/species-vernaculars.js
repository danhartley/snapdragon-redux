import { store } from 'redux/store';
import { renderStrips } from 'ui/screens/multichoice/strips';

export const renderVernaculars = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config, lessonPlan } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-vernaculars')[0];

    if(!screen) return;

    const callback = contentItem => {

        return `<div class="strip">
                    <div class="capitalise" id="${contentItem.id}" data-vernacular="${contentItem.vernacularQuestion}">${contentItem.vernacularAnswer}</div>
                </div>`;
       };

    renderStrips(screen, item, callback, config, lessonPlan, layout);
};
