import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { scoringHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';
import { utils } from 'utils/utils';
import { epithets } from 'api/botanical-latin';
import { taxa } from 'api/snapdragon/taxa';
import radiobuttonsTemplate from 'ui/screens/multichoice/radiobuttons-template.html';

export const renderRadioButtons = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { config, layouts, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = radiobuttonsTemplate;

    let randomAnswers, description, question, answers;

    const species = item.name;
    const epithet = itemProperties.speciesName(species);
    const family = item.family;
    const families = taxa.filter(taxon => taxon.taxon === 'family');

    const render = () => {
        const parent = DOM.rightBody;
        parent.innerHTML = '';

        renderTemplate({ description, answers }, template.content, parent);

        document.querySelector('button').addEventListener('click', event => {
            const answer = document.querySelector('input[name="answer"]:checked').value;
            scoringHandler(question, answer, event, config.isPortraitMode, layouts.length, config.callbackTime, renderAnswerHeader);
        });
    };

    const familyTypes = [ 'species-to-family', 'description-to-family', 'family-to-description'];

    const screen = layout.screens.find(screen => screen.name === 'family');
    if(screen) {
        screen.type = utils.shuffleArray(familyTypes)[0];
    }

    if(layout.screens.find(screen => screen.type === 'description-to-family')) {
        
        randomAnswers = R.take(2, R.take(3, utils.shuffleArray(families)).filter(f => f.name !== family)).map(f => f.description[0].summary);
        const familyDescription = families.find(f => f.name === family).description[0].summary;
        description = `${species} belongs to the ${family}. Which of the following best describes the ${family} family?`;
        question = { question: familyDescription, binomial: item.name, enumerated: true };
        answers = utils.shuffleArray([familyDescription, ...randomAnswers]);

        answers = answers.map((answer, index) => {
                if(question.question === answer) {
                    question.question = `${index+1}) ${question.question}`
                }                
                return `${index+1}) ${answer}`
            }
        );

        render();
    }

    if(layout.screens.find(screen => screen.type === 'family-to-description')) {

        randomAnswers = R.take(5, R.take(6, utils.shuffleArray(families)).filter(f => f.name !== family)).map(f => f.name);
        const familyDescription = families.find(f => f.name === family).description[0].summary;
        description = `${species} belongs to a family whose description is '${familyDescription}' What is the name of that family?`;
        question = { question: family, binomial: item.name, enumerated: true };
        answers = utils.shuffleArray([family, ...randomAnswers]);

        answers = answers.map((answer, index) => {
                if(question.question === answer) {
                    question.question = `${index+1}) ${question.question}`
                }                
                return `${index+1}) ${answer}`
            }
        );

        render();
    }
    
    if(layout.screens.find(screen => screen.type === 'species-to-family')) {

        randomAnswers = R.take(5, R.take(6, utils.shuffleArray(families)).filter(i => i.name !== family)).map(i => i.name);
        description = `Which of the following families does the species ${species} belong to?`;
        question = { question: family, binomial: item.name };
        answers = utils.shuffleArray([family, ...randomAnswers]);
        
        render();
    }

    if(layout.screens.find(screen => screen.name === 'epithet')) {
        
        if(!layout.epithet) return;
        
        randomAnswers = R.take(5, R.take(6, utils.shuffleArray(epithets)).filter(e => !R.contains(e.en, layout.epithet.en))).map(e => e.en);
        description = `In the species ${species}, what is the meaning of the epithet ${epithet}?`;
        question = { question: layout.epithet.en[0], binomial: item.name };
        answers = utils.shuffleArray([layout.epithet.en, ...randomAnswers]);

        render();
    }
};