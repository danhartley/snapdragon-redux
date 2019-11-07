import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';

import questionTemplate from 'ui/screens/multichoice/landscape/mixed-trait/right/mixed-trait-question-template.html';

export const renderMixedTraitImages = collection => {

    const template = document.createElement('template');
    template.innerHTML = questionTemplate;

    const parent = DOM.rightBody;
          parent.innerHTML = '';

    const images = [];

    renderTemplate({ images }, template.content, parent);
};