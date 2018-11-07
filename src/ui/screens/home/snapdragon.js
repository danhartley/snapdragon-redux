import { DOM } from 'ui/dom';
import { kitchenGarden, rhsTrees, commonBirds, rhsWeeds1, wildFoodUKTopTenBeginners, cogumelosEmPortugal, fallMushroomsEasternUSA } from 'snapdragon/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import snapdragonTemplate from 'ui/screens/home/snapdragon-template.html';
import { getInatSpecies } from 'api/inat/inat';

export const renderSnapdragon = (counter) => {

    if(counter.isLessonPaused) return;

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const collections = [ kitchenGarden, rhsTrees, commonBirds, rhsWeeds1, wildFoodUKTopTenBeginners, cogumelosEmPortugal, fallMushroomsEasternUSA ];

    const context = { collections };

    renderTemplate(context, template.content, parent, clone);

    getInatSpecies().then(items => {
        const names = new Set(items.filter(item => item));
    });

};