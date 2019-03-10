import { itemProperties } from 'ui/helpers/data-checking';
import { renderIcon } from 'ui/helpers/icon-handler';
import { renderTemplate } from 'ui/helpers/templating';
import questionHeaderTemplate from 'ui/screens/common/question-header-template.html';

export const renderQuestionHeader = (parent, item, config) => {

    const template = document.createElement('template');

    template.innerHTML = questionHeaderTemplate;

    parent.innerHTML = '';

    const vernacularName = itemProperties.getVernacularName(item, config);
    const binomial = item.name;

    renderTemplate({ vernacularName, binomial }, template.content, parent);

    return renderIcon(item, document);
};