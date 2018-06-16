import { DOM } from 'ui/dom';
import { collections } from 'snapdragon/species-collections';
import { renderTemplate } from 'ui/helpers/templating';
import speciesTemplate from 'ui/screens/common/species-template.html';

export const renderSpecies = (collectionId) => {

    const template = document.createElement('template');

    template.innerHTML = speciesTemplate;

    DOM.leftBody.innerHTML = '';

    const collection = collections.filter(collection => collection.id === collectionId)[0];

    const context = { collection };

    renderTemplate({ collection }, template.content, DOM.leftBody);
};