import { renderTemplate } from 'ui/helpers/templating';
import taxonomyBoxTemplate from 'ui/screens/common/taxonomy-box-template.html';

export const renderTaxonomyBox = (parent, context) => {

    const template = document.createElement('template');

    template.innerHTML = taxonomyBoxTemplate;

    parent.innerHTML = '';

    renderTemplate(context, template.content, parent);
};