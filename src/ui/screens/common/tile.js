import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const renderTile = (screen, item, callbackTime) => {

    const template = document.querySelector(`.${screen.template}`);

    const clone = document.importNode(template.content, true);

    DOM.leftBody.innerHTML = '';
    DOM.leftBody.style.backgroundColor = 'rgb(50, 50, 50)';

    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, item);
    Stamp.appendChildren(DOM.leftBody, expanded);
}