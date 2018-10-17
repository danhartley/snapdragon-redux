import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { kitchenGarden, rhsTrees, commonBirds, rhsWeeds1, mushrooms1, mushrooms2, mushrooms3, cogumelosEmPortugal } from 'snapdragon/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import snapdragonTemplate from 'ui/screens/home/snapdragon-template.html';

export const renderSnapdragon = (counter) => {

    if(counter.isLessonPaused) return;

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const collections = [ kitchenGarden, rhsTrees, commonBirds, rhsWeeds1, mushrooms1, mushrooms2, mushrooms3, cogumelosEmPortugal ];

    collections.forEach(collection => {
        collection.families = collection.items.map(item => item.family).filter(utils.onlyUnique);
    });

    const context = { collections };

    renderTemplate(context, template.content, parent, clone);
};