import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import speciesCard from 'ui/screens/cards/species-card-template.html';
import questionCard from 'ui/screens/common/question-template.html';

export const renderStrips = (screen, item, callback, config, lessonPlan) => {

    // render questions

    const template = document.createElement('template');

    template.innerHTML = `<div class="snapdragon-container"><div class="strips js-rptr-strips"></div></div>`;
    
    const rptrStrips = template.content.querySelector('.js-rptr-strips');

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    item.content = R.take(6, item.multipleNames.map(answer => {
        const vernacularNames = answer.names
            .filter(name => name.language === config.language)
            .map(name => name.vernacularName);

            const vernacularQuestions = item.names.filter(name => name.language === config.language) || item.names.filter(name => name.language === 'en');  
            const vernacularQuestion = (vernacularQuestions && vernacularQuestions.length > 0) ? vernacularQuestions[0].vernacularName : item.genus;
            const vernacularName = (vernacularNames && vernacularNames.length > 0) ? vernacularNames[0] : answer.name.split(' ')[0];

        return {
                id: item.id, 
                binomial: item.name, 
                vernacularQuestion: vernacularQuestion, 
                vernacularAnswer: vernacularName,
                binomialAnswer: answer.name
        };
   }));
                    
    rptrStrips.innerHTML = item.content.map(callback).join('');

    const clone = document.importNode(template.content, true);
    const strips = clone.querySelectorAll('.js-rptr-strips .strip div');

    parent.appendChild(clone);

    parent = document.querySelector('.right-body .snapdragon-container');

    // render species card

    const species = item.name;
    const name = itemProperties.vernacularName(item, config);
    template.innerHTML = speciesCard;

    const context = (screen.name === 'species-vernaculars') 
            ? { name: '---', species }
            : { name, species: '---' }

    renderTemplate( context, template.content, parent);

    // render question

    template.innerHTML = questionCard;
    const question = screen.question;
    renderTemplate( { question }, template.content, parent);

    const renderAnswer = (text, className, correct) => {
        const answer = document.querySelector('.js-answer');
        answer.innerHTML = correct ? 'Correct' : 'Incorrect';
        answer.style.display = 'block';
        answer.classList.add(className);
        document.querySelector('.js-question').style.display = 'none';
    }

    const taxon = { name: item.name, binomial: item.name, question: item.name };
    const score = { items: strips, taxon: taxon, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount};
    
    scoreHandler('strip', score, renderAnswer, config.callbackTime, config.isPortraitMode);

    template.innerHTML = '';
};