import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { taxa } from 'api/snapdragon/taxa';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import familyTemplate from 'ui/screens/multichoice/family-descriptions.html';
import questionCard from 'ui/screens/common/question-template.html';
import familyCard from 'ui/screens/cards/taxon-card-template.html';

export const renderFamilyDescriptions = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { config, lessonPlan } = store.getState();

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = familyTemplate;

    let randomAnswers, answers;

    const family = item.family;
    const families = taxa.filter(taxon => taxon.taxon === 'family');

    const type = config.isPortraitMode ? 'identification' : 'summary';

    randomAnswers = R.take(2, R.take(3, utils.shuffleArray(families)).filter(f => f.name !== family)).map(f => f.descriptions[0][type]);
    const familyDescription = families.find(f => f.name === family).descriptions[0][type];

    answers = utils.shuffleArray([familyDescription, ...randomAnswers]);

    renderTemplate({ answers }, template.content, parent);
    
    const { questionCount, layoutCount } = lessonPlan;

    const strips = document.querySelectorAll('.js-rptr-strips .strip div');

    // render family card

    parent = document.querySelector('.right-body .snapdragon-container');

    template.innerHTML = familyCard;

    const context = { family: item.family };

    renderTemplate( context, template.content, parent);

    // render question

    template.innerHTML = questionCard;
    
    const question = config.isPortraitMode ? 'Tap to match Quick ID' : 'Tap the description that best matches';

    renderTemplate( { question: question }, template.content, parent);

    const renderAnswer = (text, className, correct) => {
        const answer = document.querySelector('.js-answer');
        answer.innerHTML = correct ? 'Correct' : 'Incorrect';
        answer.style.display = 'block';
        answer.classList.add(className);
        document.querySelector('.js-question').style.display = 'none';
    }

    const taxon = { name: item.family, binomial: item.name, question: familyDescription };

    const score = { items: strips, taxon: taxon, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount};
    const callback = renderAnswer;

    scoreHandler('strip', score, callback, config.callbackTime);
};
