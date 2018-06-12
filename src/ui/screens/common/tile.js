import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const renderTile = (screen, item, callbackTime) => {

    const template = document.querySelector(`.${screen.template}`);

    const clone = document.importNode(template.content, true);

    DOM.leftBody.innerHTML = '';

    renderTemplate(item, template.content, DOM.leftBody);
}