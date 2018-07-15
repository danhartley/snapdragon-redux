import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { sendQandAHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';
import { utils } from 'utils/utils';
import { epithets } from 'api/botanical-latin';
import multiSelectTemplate from 'ui/screens/common/multichoice-template.html';

export const renderMultichoice = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { config, layouts, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = multiSelectTemplate;

    if(!layout.epithet) return;

    const species = item.name;
    const epithet = itemProperties.speciesName(species);
    const randomAnswers = R.take(5, R.take(6, utils.shuffleArray(epithets)).filter(e => !R.contains(e.en, layout.epithet.en))).map(e => e.en);
    const description = `In the species ${species}, what is the meaning of the epithet ${epithet}?`;
    const question = { question: layout.epithet.en[0], binomial: item.name };
    const answers = utils.shuffleArray([layout.epithet.en, ...randomAnswers]);

    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;

    parent.innerHTML = '';

    renderTemplate({ description, answers }, template.content, parent);

    document.querySelector('button').addEventListener('click', event => {
        const answer = document.querySelector('input[name="answer"]:checked').value;
        sendQandAHandler(question, answer, event, config.isPortraitMode, layouts.length, config.callbackTime, renderAnswerHeader);
    });

};