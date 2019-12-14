import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { scoreHandler } from 'ui/helpers//score-handler';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { renderTemplate } from 'ui/helpers/templating';

import stripTemplate from 'ui/screens/multichoice/horizontal-strips.html';

export const renderHorizontalStrips = collection => {

    const { config, lesson, layout } = store.getState();

    const item = collection.nextItem || collection.items[collection.itemIndex];

    const binomial = layout.provider.name;
    const statement = layout.provider.statement;
    const providerQuestion = layout.provider.question;

    const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial, question: '', help: '', term: '', className: '', headerClassName: '', bonus: undefined, statement, providerQuestion });

    const template = document.createElement('template');
          template.innerHTML = stripTemplate;

    const answers = utils.shuffleArray([ ...layout.provider.answers, layout.provider.answer ]);

    const options = answers.map((answer, index) => {
        return {
            answer
            // ,
            // conceal: conceal[index]
        }
    });

    renderTemplate({ options }, template.content, parent);

    document.querySelector('.js-test-card-question').classList.add('calendar-block');
    document.querySelector('.js-test-card-question').classList.remove('standard-block');
    document.querySelector('.js-test-card-content').classList.add('horizontal');

    const strips = document.querySelectorAll('.js-rptr-strips .strip');
    const taxon = { name: item.taxonomy.family, binomial: item.name, question: layout.provider.answer };

    const test = { itemId: item.id, items: strips, taxon, binomial: item.name, questionCount: lesson.questionCount, layoutCount: lesson.layoutCount, points: layout.points, clue: ''};  

    scoreHandler('strip', test, null, config);
};