import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { familyTemplate } from 'ui/screens/multichoice/family-descriptions.html';

export const renderFamilyDescriptions = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config, layouts } = store.getState();

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = familyTemplate;

    let randomAnswers, description, question, answers;

    const species = item.name;
    const epithet = itemProperties.speciesName(species);
    const family = item.family;
    const families = taxa.filter(taxon => taxon.taxon === 'family');

    randomAnswers = R.take(2, R.take(3, utils.shuffleArray(families)).filter(f => f.name !== family)).map(f => f.descriptions[0].summary);
    const familyDescription = families.find(f => f.name === family).descriptions[0].summary;
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


    const context = {};

    renderTemplate({ description, answers }, template.content, parent);
};
