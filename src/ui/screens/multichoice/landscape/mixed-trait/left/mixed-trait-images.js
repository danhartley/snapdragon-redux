import { renderTemplate } from 'ui/helpers/templating';
import { DOM } from 'ui/dom';

import imagesTemplate from 'ui/screens/multichoice/landscape/mixed-trait/left/mixed-trait-images-template.html';

export const renderMixedTraitImages = collection => {

    const template = document.createElement('template');
    template.innerHTML = imagesTemplate;

    const parent = DOM.leftBody;
          parent.innerHTML = '';

    const images = [];

    renderTemplate({ images }, template.content, parent);
};