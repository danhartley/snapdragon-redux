import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const renderTile = (screen, item, callbackTemplate, callbackTime) => {

    const template = document.querySelector(`.${screen.template}`);

    const tile = template.content.querySelector('.js-tile');

    //tile.innerHTML = item.content.map(callbackTemplate).join('');
    tile.innerHTML = 'tile image';

    const clone = document.importNode(template.content, true);

    // document.querySelector('.js-tile').addEventListener('click', event => {
    //     console.log(event);
    // });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);
}