import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { scoreHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { utils } from 'utils/utils';
import { taxa } from 'api/snapdragon/taxa';
import radiobuttonsTemplate from 'ui/screens/multichoice/radiobuttons-template.html';

export const renderRadioButtons = (collection) => {

    const item = collection.nextItem;

    const { config, lessonPlan, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = radiobuttonsTemplate;

    let randomAnswers, description, description2, question, answers;
    let indices = config.isPortraitMode ? [4,5] : [5,6];

    description2 = '';

    const species = item.name;
    const family = item.family;
    const collectionFamilies = collection.items.map(item => item.family).filter(utils.onlyUnique);
    const families = taxa.filter(taxon => taxon.taxon === 'family').filter(family => R.contains(family.name, collectionFamilies));
    const otherFamilies = R.take(indices[0], R.take(indices[1], utils.shuffleArray(families)).filter(family => family.name !== item.family));
    const otherFamiliesLatinNames = otherFamilies.map(family => family.name);
    const otherFamiliesCommonNames = otherFamilies.filter(family => family.names.find(name => name.language === config.language)).map(family => family.names[0].names[0]);    
    const familyTaxon = families.find(family => family.name === item.family); 
    const commonFamilyName = itemProperties.getTaxonProp(familyTaxon, config.language, 'names', 'names', '0').names[0];

    indices = config.isPortraitMode ? [3,4] : [4,5];

    const render = () => {
        const parent = DOM.rightBody;
        parent.innerHTML = '';

        renderTemplate({ description, description2, answers }, template.content, parent);

        document.querySelector('input[name="answer"]:checked').checked = false;

        const answerBtn = document.querySelector('.js-rb-answer-btn');

        const callback = (colour, score, scoreUpdateTimer) => {            
            answerBtn.disabled = false;
            answerBtn.classList.add(colour);
            answerBtn.removeEventListener('click', scoreEventHandler);     
            answerBtn.addEventListener('click', () => {
                window.clearTimeout(scoreUpdateTimer);
                actions.boundUpdateScore(score);
            });
        };

        const scoreEventHandler = event => {
            const answer = document.querySelector('input[name="answer"]:checked').value;
            const score = { itemId: item.id, question, answer, event, layoutCount: lessonPlan.layouts.length, points: layout.points };
            scoreHandler('radio', score, callback, config);            
        };

        answerBtn.addEventListener('click', scoreEventHandler)};

    const familyFlavours = config.isPortraitMode 
        ? [ 'match-species-to-latin-family-name', 'match-common-family-name-to-latin-family-name', 'match-latin-family-name-to-common-family-name', 'match-species-to-common-family-name' ] 
        : [ 'match-species-to-latin-family-name', 'match-family-to-quick-id', 'match-family-to-summary', 'match-common-family-name-to-latin-family-name', 'match-latin-family-name-to-common-family-name', 'match-species-to-common-family-name' ];

    const screen = layout.screens.find(screen => screen.name === 'family');

    if(screen) {
        screen.flavour = utils.shuffleArray(familyFlavours)[0];
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-summary')) {

        const summary = families.find(f => f.name === family).descriptions[0].summary;
        description = `${species.toUpperCase()} belongs to a family whose description is '${summary}'`;
        description2 = 'What is the name of this FAMILY?';
        question = { question: family, binomial: item.name };
        answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);

        render();
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-quick-id')) {

        const identification = families.find(f => f.name === family).descriptions[0].identification;
        description = `${species.toUpperCase()} belongs to a family whose Quick Id is '${identification}'`;
        description2 = 'What is the name of this FAMILY?';
        question = { question: family, binomial: item.name };
        answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);

        render();
    }
    
    if(layout.screens.find(screen => screen.flavour === 'match-species-to-latin-family-name')) {

        description = `To which FAMILY does the species ${species.toUpperCase()} belong?`;        
        question = { question: family, binomial: item.name };
        answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);
        
        render();
    }
    
    if(layout.screens.find(screen => screen.flavour === 'match-species-to-common-family-name')) {

        description = `To which FAMILY does the species ${species.toUpperCase()} belong?`;
        question = { question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        render();
    }

    if(layout.screens.find(screen => screen.flavour === 'match-common-family-name-to-latin-family-name')) {

        indices = config.isPortraitMode ? [4,5] : [5,6];

        description = `Which of the following common FAMILY names matches the latin name ${family.toUpperCase()}?`;
        question = { question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        render();
    }

    if(layout.screens.find(screen => screen.flavour === 'match-latin-family-name-to-common-family-name')) {

        indices = config.isPortraitMode ? [4,5] : [5,6];

        description = `Which of the following common FAMILY names matches the latin name ${family.toUpperCase()}?`;
        question = { question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        render();
    }

    if(layout.screens.find(screen => screen.name === 'cultivar-match')) {
        
        indices = config.isPortraitMode ? [3,4] : [5,6];

        const itemNames = [ ...collection.items.map(item => item.name) ];

        randomAnswers = R.take(indices[0], R.take(indices[1], utils.shuffleArray(itemNames)).filter(itemName => itemName !== item.name));
        const subspecies = layout.cultivars.subspecies;
        const names = R.take(indices[1], R.flatten(subspecies.map(sub => sub.names.filter(name => name.language === config.language))).map(n => n.vernacularName)).join(', ');
        description = `${names} derive from one species. What is its name?`;
        question = { question: item.name, binomial: item.name };
        answers = utils.shuffleArray([item.name, ...randomAnswers]);

        render();
    }
};