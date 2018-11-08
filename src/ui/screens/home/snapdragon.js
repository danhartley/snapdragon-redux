import { DOM } from 'ui/dom';
import { snapdragonCollections } from 'snapdragon/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import snapdragonTemplate from 'ui/screens/home/snapdragon-template.html';

export const renderSnapdragon = (counter) => {

    if(counter.isLessonPaused) return;

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    const parent = DOM.leftBody;
    parent.innerHTML = '';

    const collections = snapdragonCollections;

    const context = { collections };

    renderTemplate(context, template.content, parent, clone);
};