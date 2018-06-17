import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { itemVernacularName } from 'ui/helpers/data-checking';
import speciesCard from 'ui/screens/common/species-card-template.html';
import questionCard from 'ui/screens/common/species-question-template.html';

export const renderStrips = (screen, item, callback, config, layout) => {

    const template = document.createElement('template');

    template.innerHTML = `<div class="strips js-rptr-strips"></div>`;
    
    const rptrStrips = template.content.querySelector('.js-rptr-strips');

    screen.parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;
    screen.parent.innerHTML = '';

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

    screen.parent.appendChild(clone);

    if(config.isPortraitMode) {

        const species = item.name;
        const name = itemVernacularName(item, config);
        template.innerHTML = speciesCard;

        const context = (screen.name === 'species-vernaculars') 
                ? { name: '', species, filter: 'species' }
                : { name, species: '', filter: 'name' }

        renderTemplate( context, template.content, screen.parent);
        template.innerHTML = questionCard;
        const question = screen.question;
        renderTemplate( { question }, template.content, screen.parent);
        const renderAnswer = (text, colour, correct) => {
            const answer = document.querySelector('.js-species-answer div');
            answer.innerHTML = correct ? 'Correct' : 'Incorrect';
            answer.parentElement.style.display = 'block';
            answer.style.backgroundColor = colour;
        }
        scoreHandler(strips, item, config, 'strip', renderAnswer);
    } else {
        scoreHandler(strips, item, config, 'strip');
    }
    template.innerHTML = '';
};