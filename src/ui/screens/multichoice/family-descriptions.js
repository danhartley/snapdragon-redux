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

    const { config, lessonPlan, layout } = store.getState();

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = familyTemplate;

    const families = taxa.filter(taxon => taxon.taxon === 'family');

    const familyFlavours = config.isPortraitMode 
    ? [ 'match-family-to-quick-id' ] 
    : [ 'match-family-to-quick-id', 'match-family-to-summary' ];

    const screen = layout.screens.find(screen => screen.name === 'family-strips');
    
    if(screen) {
        screen.flavour = utils.shuffleArray(familyFlavours)[0];
    }

    const render = (questionText, questionValue, answers) => {
    
        renderTemplate({ answers }, template.content, parent);
        
        const strips = document.querySelectorAll('.js-rptr-strips .strip div');

        parent = document.querySelector('.right-body .snapdragon-container');

        template.innerHTML = familyCard;

        const description = config.isPortraitMode ? `${item.family}` : `Which of the above describes the ${item.family}`;

        const context = { description };

        renderTemplate( context, template.content, parent);

        template.innerHTML = questionCard;
        
        renderTemplate( { question: questionText }, template.content, parent);

        const renderAnswer = (text, className, correct) => {
            const answer = document.querySelector('.js-answer');
            answer.innerHTML = correct ? 'Correct' : 'Incorrect';
            answer.style.display = 'block';
            answer.classList.add(className);
            document.querySelector('.js-question').style.display = 'none';
        }

        const taxon = { name: item.family, binomial: item.name, question: questionValue };

        const score = { items: strips, taxon: taxon, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount};
        const callback = renderAnswer;

        scoreHandler('strip', score, callback, config.callbackTime);
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-quick-id')) {

        const number = config.isPortraitMode ? 3 : 5;

        const questionText = config.isPortraitMode ? 'Tap to match Quick ID' : `Click to match the Quick ID`;
        const question = families.find(f => f.name === item.family).descriptions[0].identification;
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(families)).filter(f => f.name !== item.family)).map(f => f.descriptions[0].identification);
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-summary')) {
        
        const number = config.isPortraitMode ? 3 : 4;

        const questionText = config.isPortraitMode ? 'Tap to match description' : `Click to match the description`;
        const question = families.find(f => f.name === item.family).descriptions[0].summary;
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(families)).filter(f => f.name !== item.family)).map(f => f.descriptions[0].summary);
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
    }
};
