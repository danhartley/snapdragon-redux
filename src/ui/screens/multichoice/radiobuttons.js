import * as R from 'ramda';

import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { utils } from 'utils/utils';
import { taxa } from 'api/snapdragon/taxa';
import radiobuttonsTemplate from 'ui/screens/multichoice/radiobuttons-template.html';
import { radioButonClickhandler } from 'ui/helpers/handlers';

export const renderRadioButtons = (collection) => {

    const item = collection.nextItem;

    const { config, lessonPlan, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = radiobuttonsTemplate;

    let randomAnswers, question = {}, answers;
    let indices = config.isPortraitMode ? [4,5] : [4,5];

    const descriptions = ['','',''];

    const species = item.name;
    const family = item.family;
    const collectionFamilies = collection.items.map(item => item.family).filter(utils.onlyUnique);
    const families = taxa.filter(taxon => taxon.taxon === 'family').filter(family => R.contains(family.name, collectionFamilies));
    const otherFamilies = R.take(indices[0], R.take(indices[1], utils.shuffleArray(families)).filter(family => family.name !== item.family));
    const otherFamiliesLatinNames = otherFamilies.map(family => family.name);
    const otherFamiliesCommonNames = otherFamilies.filter(family => family.names.find(name => name.language === config.language)).map(family => family.names[0].names[0]);    
    const familyTaxon = families.find(family => family.name === item.family); 
    const commonFamilyName = familyTaxon ? itemProperties.getTaxonProp(familyTaxon, config.language, 'names', 'names', '0').names[0] : '';

    indices = config.isPortraitMode ? [3,4] : [4,5];

    const scorehandler = (descriptions, question, answers) => {
        const questionFormat = { itemId: item.id, question, layoutCount: lessonPlan.layouts.length, points: layout.points };
        radioButonClickhandler(config, template, answers, questionFormat, item);
        // radioButonClickhandler(config, template, descriptions, answers, '.js-rb-answer-btn', questionFormat, item);
    }

    const familyFlavours = config.isPortraitMode 
        ? [ 'match-species-to-latin-family-name', 'match-common-family-name-to-latin-family-name', 'match-latin-family-name-to-common-family-name', 'match-species-to-common-family-name' ] 
        : [ 'match-species-to-latin-family-name', 'match-family-to-quick-id', 'match-family-to-summary', 'match-common-family-name-to-latin-family-name', 'match-latin-family-name-to-common-family-name', 'match-species-to-common-family-name' ];

    const screen = layout.screens.find(screen => screen.name === 'family');

    if(screen) {
        screen.flavour = utils.shuffleArray(familyFlavours)[0];
        question.taxon = 'family';
    }

    // if(layout.screens.find(screen => screen.flavour === 'match-family-to-summary')) {

    //     const summary = families.find(f => f.name === family).descriptions[0].summary;
    //     descriptions[0] = `${species} is a member of which family?`;
    //     question = { question: family, binomial: item.name };
    //     answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);

    //     scorehandler(descriptions, question, answers);
    // }

    // if(layout.screens.find(screen => screen.flavour === 'match-family-to-quick-id')) {

    //     const identification = families.find(f => f.name === family).descriptions[0].identification;
    //     descriptions[0] = `${species} is a member of which family?`;
    //     question = { ...question,  question: family, binomial: item.name };
    //     answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);

    //     scorehandler(descriptions, question, answers);
    // }
    
    if(layout.screens.find(screen => screen.flavour === 'match-species-to-latin-family-name')) {

        descriptions[0] = `${species} is a member of which family?`;
        question = { ...question,  question: family, binomial: item.name };
        answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);
        
        scorehandler(descriptions, question, answers);
    }
    
    if(layout.screens.find(screen => screen.flavour === 'match-species-to-common-family-name')) {

        descriptions[0] = `${species} is a member of which family?`;
        question = { ...question,  question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        scorehandler(descriptions, question, answers);
    }

    if(layout.screens.find(screen => screen.flavour === 'match-common-family-name-to-latin-family-name')) {

        indices = config.isPortraitMode ? [4,5] : [4,5];

        descriptions[0] = `${species} is a member of which family?`;
        descriptions[1] = `The latin name is ${family}.`
        question = { ...question,  question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        scorehandler(descriptions, question, answers);
    }

    if(layout.screens.find(screen => screen.flavour === 'match-latin-family-name-to-common-family-name')) {

        indices = config.isPortraitMode ? [4,5] : [4,5];

        descriptions[0] = `${species} is a member of which family?`;
        question = { ...question,  question: commonFamilyName, binomial: item.name };
        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
        
        scorehandler(descriptions, question, answers);
    }

    if(layout.screens.find(screen => screen.name === 'cultivar-match')) {
        
        indices = config.isPortraitMode ? [3,4] : [4,5];

        const itemNames = [ ...collection.items.map(item => item.name) ];

        randomAnswers = R.take(indices[0], R.take(indices[1], utils.shuffleArray(itemNames)).filter(itemName => itemName !== item.name));
        const subspecies = layout.cultivars.subspecies;
        const names = R.take(indices[1], R.flatten(subspecies.map(sub => sub.names.filter(name => name.language === config.language))).map(n => n.vernacularName)).join(', ');
        descriptions[0] = `${names} derive from one species. What is its name?`;
        question = { ...question,  question: item.name, binomial: item.name };
        answers = utils.shuffleArray([item.name, ...randomAnswers]);

        scorehandler(descriptions, question, answers);
    }
};