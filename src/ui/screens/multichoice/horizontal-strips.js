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

    let answers = utils.shuffleArray([ ...layout.provider.answers, layout.provider.answer ]);

    answers = answers.map((answer, index) => {
        return {
            term: answer,
            index
        }
    });

    renderTemplate({ answers }, template.content, parent);

    document.querySelector('.js-test-card-question').classList.add('calendar-block');
    document.querySelector('.js-test-card-question').classList.remove('standard-block');

    const strips = document.querySelectorAll('.js-rptr-strips .strip');
    const taxon = { name: item.taxonomy.family, binomial: item.name, question: layout.provider.answer };

    const test = { itemId: item.id, items: strips, taxon, binomial: item.name, 
        questionCount: lesson.questionCount, vernacularName: item.vernacularName,
        layoutCount: lesson.layoutCount, points: layout.points, clue: '', 
        answerIndex: answers.findIndex(a => a.term === layout.provider.answer), answers, 
        questionText: providerQuestion, statement };  

    scoreHandler('strip', test, null, config);
};