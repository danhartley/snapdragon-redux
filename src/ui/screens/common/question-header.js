import { renderIcon } from 'ui/helpers/icon-handler';
import { renderTemplate } from 'ui/helpers/templating';
import questionHeaderTemplate from 'ui/screens/common/question-header-template.html';

export const renderQuestionHeader = (parent, item, question) => {

    const template = document.createElement('template');

    template.innerHTML = questionHeaderTemplate;

    parent.innerHTML = '';

    renderTemplate({ question }, template.content, parent);

    renderIcon(item, document);
};