import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { scoreHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';
import { utils } from 'utils/utils';
import { epithets } from 'api/botanical-latin';
import { taxa } from 'api/snapdragon/taxa';
import radiobuttonsTemplate from 'ui/screens/multichoice/radiobuttons-template.html';

export const renderRadioButtons = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { config, lessonPlan, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = radiobuttonsTemplate;

    let randomAnswers, description, question, answers;
    let indices = config.isPortraitMode ? [3,4] : [4,5];

    const species = item.name;
    const epithet = itemProperties.speciesName(species);
    const family = item.family;
    const families = taxa.filter(taxon => taxon.taxon === 'family');
    const otherFamilies = R.take(indices[0], R.take(indices[1], utils.shuffleArray(families)).filter(family => family.name !== item.family));
    const otherFamilyLatinNames = otherFamilies.map(family => family.name);
    const otherFamiliesCommonNames = otherFamilies.filter(family => family.names.find(name => name.language === config.language)).map(family => family.names[0].names[0]);
    const commonFamilyName = families.find(family => family.name === item.family).names.find(name => name.language === config.language).names[0];

    const render = () => {
        const parent = DOM.rightBody;
        parent.innerHTML = '';

        renderTemplate({ description, answers }, template.content, parent);

        document.querySelector('input[name="answer"]:checked').checked = false;

        document.querySelector('button').addEventListener('click', event => {
            const answer = document.querySelector('input[name="answer"]:checked').value;
            const score = { question, answer, event, layoutCount: lessonPlan.layouts.length };
            scoreHandler('radio', score, null, config.callbackTime, renderAnswerHeader);
        });
    };

    const familyFlavours = config.isPortraitMode 
        ? [ 'match-species-to-latin-family-name', 'match-common-family-name-to-latin-family-name', 'match-latin-family-name-to-common-family-name', 'match-species-to-common-family-name' ] 
        : [ 'match-species-to-latin-family-name', 'match-family-to-quick-id', 'match-family-to-summary', 'match-common-family-name-to-latin-family-name', 'match-latin-family-name-to-common-family-name', 'match-species-to-common-family-name' ];

    const screen = layout.screens.find(screen => screen.name === 'family');

    if(screen) {
        screen.flavour = utils.shuffleArray(familyFlavours)[0];
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-summary')) {

        const summary = families.find(f => f.name === family).descriptions[0].summary;
        description = `${species.toUpperCase()} belongs to a family whose description is '${summary}' What is the name of this FAMILY?`;
        question = { question: family, binomial: item.name };
        answers = utils.shuffleArray([family, ...otherFamilyLatinNames]);

        render();
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-quick-id')) {

        const identification = families.find(f => f.name === family).descriptions[0].identification;
        description = `${species.toUpperCase()} belongs to a family whose Quick ID is '${identification}' What is the name of this FAMILY?`;
        question = { question: family, binomial: item.name };
        answers = utils.shuffleArray([family, ...otherFamilyLatinNames]);

        render();
    }
    
    if(layout.screens.find(screen => screen.flavour === 'match-species-to-latin-family-name')) {

        indices = config.isPortraitMode ? [3,4] : [5,6];

        description = `To which of the following families does the species ${species.toUpperCase()} belong?`;
        question = { question: family, binomial: item.name };
        answers = utils.shuffleArray([family, ...otherFamilyLatinNames]);
        
        render();
    }
    
    if(layout.screens.find(screen => screen.flavour === 'match-species-to-common-family-name')) {

        indices = config.isPortraitMode ? [3,4] : [5,6];
        
        description = `To which of the following families does the species ${species.toUpperCase()} belong?`;
        question = { question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        render();
    }

    if(layout.screens.find(screen => screen.flavour === 'match-common-family-name-to-latin-family-name')) {

        indices = config.isPortraitMode ? [3,4] : [5,6];

        description = `Which of the following common family names matches the latin name ${family.toUpperCase()}?`;
        question = { question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        render();
    }

    if(layout.screens.find(screen => screen.flavour === 'match-latin-family-name-to-common-family-name')) {

        indices = config.isPortraitMode ? [3,4] : [5,6];

        description = `Which of the following common family names matches the latin name ${family.toUpperCase()}?`;
        question = { question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        render();
    }

    if(layout.screens.find(screen => screen.name === 'epithet')) {
        
        if(!layout.epithet) return;

        indices = config.isPortraitMode ? [3,4] : [5,6];
        
        randomAnswers = R.take(indices[0], R.take(indices[1], utils.shuffleArray(epithets)).filter(e => !R.contains(e.en, layout.epithet.en))).map(e => e.en);
        description = `In the species ${species}, what is the meaning of the epithet ${epithet}?`;
        question = { question: layout.epithet.en[0], binomial: item.name };
        answers = utils.shuffleArray([layout.epithet.en, ...randomAnswers]);

        render();
    }

    if(layout.screens.find(screen => screen.name === 'cultivar-match')) {
        
        indices = config.isPortraitMode ? [3,4] : [5,6];

        randomAnswers = R.take(indices[0], R.take(indices[1], utils.shuffleArray(collection.items)).filter(i => i.name !== item.name)).map(i => i.name);
        const subspecies = layout.cultivars.subspecies;
        const names = R.take(indices[1], R.flatten(subspecies.map(sub => sub.names.filter(name => name.language === config.language))).map(n => n.vernacularName)).join(', ');
        description = `${names} derive from one species. What is its name?`;
        question = { question: item.name, binomial: item.name };
        answers = utils.shuffleArray([item.name, ...randomAnswers]);

        render();
    }
};