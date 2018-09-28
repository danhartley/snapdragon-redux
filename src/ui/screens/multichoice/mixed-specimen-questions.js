import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenTemplate from 'ui/screens/multichoice/mixed-specimen-questions-template.html';
import updateBtnTemplate from 'ui/screens/multichoice/update-btn-template.html';
import { getRandomItems } from 'ui/screens/multichoice/mixed-specimen-shared';

export const renderMixedSpecimenQuestions = collection => {
    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenTemplate;

    const items = getRandomItems(item);

    const images = items.map((item, index) => { 
        return { index: index + 1, src: item.images[0] };
    } );

    const question1 = `Can you identify which of the 4 species on the left is ${item.name}? Click on the matching image below.`;
    const question2 = `(Click on an image to view more examples.)`;

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ images, question1, question2 }, template.content, parent);

    const updateBtn = document.createElement('template');

    updateBtn.innerHTML = updateBtnTemplate;

    renderTemplate({}, updateBtn.content, document.querySelector('.js-update-btn'));
};
