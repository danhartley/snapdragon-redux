import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { sendQandAHandler } from 'ui/helpers/handlers';
import multiSelectTemplate from 'ui/screens/common/multichoice-template.html';

export const renderMultichoice = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { config, layouts, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = multiSelectTemplate;

    if(!layout.epithet) return;

    const species = item.name;
    const epithet = layout.epithet.latin[0];
    const question = `In the species ${species}, what is the meaning of the epithet ${epithet}`;
    const answers = [layout.epithet.en, 'wild', 'hairy'];

    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;

    parent.innerHTML = '';

    renderTemplate({ answers }, template.content, parent);

    document.querySelector('button').addEventListener('click', event => {
        const answer = document.querySelector('input[name="answer"]:checked').value;
        sendQandAHandler(question, answer, event, config.isPortraitMode, layouts.length, config.callbackTime);
    });

};