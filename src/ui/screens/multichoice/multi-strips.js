import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderQuestionHeader } from 'ui/screens/common/question-header';
import { taxa } from 'api/snapdragon/taxa';
import { epithets } from 'api/botanical-latin';
import { getGlossary } from 'api/glossary/glossary';
import { itemProperties } from 'ui/helpers/data-checking';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { syndromes } from 'api/snapdragon/syndromes';
import testCardTemplate from 'ui/screens/common/test-card-template.html';
import stripTemplate from 'ui/screens/multichoice/multi-strips-template.html';

export const renderMultiStrips = (collection) => {

    const item = collection.nextItem;
    const items = collection.allItems || collection.items;

    const { config, lessonPlan, layout } = store.getState();

    const template = document.createElement('template');
    
    template.innerHTML = testCardTemplate;

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ vernacularName: item.vernacularName, binomial: item.binomial, question: 'Match the name' }, template.content, parent);

    renderQuestionHeader(document.querySelector('.js-question-container'), item, config);

    const families = taxa.filter(taxon => taxon.taxon === 'family').filter(family => R.contains(family.name, collection.families));

    const familyFlavours = config.isPortraitMode 
            ? [ 'match-family-to-quick-id' ] 
            : [ 'match-family-to-quick-id', 'match-family-to-summary' ];

    let screen = layout.screens.find(screen => screen.name === 'family-strips');
    
    if(screen) {
        screen.flavour = utils.shuffleArray(familyFlavours)[0];
    } else { screen =    
        layout.screens.find(screen => screen.name === 'species-scientifics') || 
        layout.screens.find(screen => screen.name === 'species-vernaculars') || 
        layout.screens.find(screen => screen.name === 'epithet') || 
        layout.screens.find(screen => screen.name === 'definition') || 
        layout.screens.find(screen => screen.name === 'wildcard-match')
    }

    if(!screen) return;

    const render = (questionValue, answers) => {
    
        parent = document.querySelector('.js-test-card');

        template.innerHTML = stripTemplate;

        renderTemplate({ answers }, template.content, parent);

        const strips = document.querySelectorAll('.js-rptr-strips .strip div');

        const taxon = { name: item.family, binomial: item.name, question: questionValue };

        const test = { itemId: item.id, items: strips, taxon: taxon, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: layout.points};
        
        const callback = (score, scoreUpdateTimer) => {
        
            const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
    
            continueLessonBtn.disabled = false;
    
            continueLessonBtn.addEventListener('click', event => {
                window.clearTimeout(scoreUpdateTimer);
                actions.boundUpdateScore(score);
            });
        };

        scoreHandler('strip', test, callback, config);
    }

    if(screen.name === 'species-scientifics') {

        const number = config.isPortraitMode ? 6 : config.isLandscapeMode ? 6 : 6;
        const question = item.name;
        const answers = itemProperties.answersFromList(itemProperties.itemNamesForGroups(items), question, number);

        render(question, answers);
    }

    if(screen.name === 'species-vernaculars') {

        if(!collection.speciesVernacularNames) return;

        const number = config.isPortraitMode ? 6 : config.isLandscapeMode ? 6 : 6;
        const question = item.vernacularName;   
        const answers = itemProperties.answersFromList(itemProperties.vernacularNamesForGroups(items, config), question, number);

        render(question, answers);
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-quick-id')) {

        const number = config.isPortraitMode ? 3 : 4;

        const questionText = config.isPortraitMode ? 'Tap to match Quick ID' : `Click to match the Quick Id`;
        const question = families.length > 0 ? families.find(f => f.name === item.family).descriptions[0].identification : 'no families available';
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(families)).filter(f => f.name !== item.family)).map(f => f.descriptions[0].identification);
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-summary')) {
        
        const number = config.isPortraitMode ? 3 : 4;
        const question = families.length > 0 ? families.find(f => f.name === item.family).descriptions[0].summary : 'no families available';
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(families)).filter(f => f.name !== item.family)).map(f => f.descriptions[0].summary);
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(question, answers);
    }

    if(screen.name === 'wildcard-match') {

        const getTraits = (traits) => {
            const _traits = [];
            traits.forEach(trait => {
                const _trait = items.map( (item, i) => {                
                    return {
                        traits: R.flatten(syndromes.traits.map(trait => {
                            const t = trait.keys.find(key => key.key === trait);
                            return { trait: trait.name, value: t.value, description: t.description || '' };
                        })),
                        index: i
                    };                
                }).filter(c => c);
                _traits.push(_trait[0].traits);
            });

            const options = _traits.map(trait => trait.map(t => {
                return `${t.trait}: ${t.value}`;
            }));

            return options.map(option => option.join('; '));
        }

        const number = config.isPortraitMode ? 1 : 2;

        const pollinators = R.take(number, utils.shuffleArray(['beetle', 'bird', 'butterfly', 'fly', 'moth', 'wind']));
        
        const traits = getTraits(pollinators);
        const question = getTraits(['bee'])[0];

        const questionText = `Which set of traits best fits the ${item.family}?`;
        const answers = utils.shuffleArray([question, ...traits]);

        render(questionText, question, answers);
    }

    if(screen.name === 'epithet') {
        
        if(!layout.epithet) return;

        const epithet = layout.epithet.latin[0];
        const number = config.isPortraitMode ? 6 : 6;
        
        let alternatives = R.take(number-1, utils.shuffleArray(epithets)).filter(e => !R.contains(e.latin, epithet));
        alternatives = alternatives.map(e => e.en.join(', '));
        let question = epithets.find(e => e.latin[0].toUpperCase() === epithet.toUpperCase());
        question = question ? question[config.language][0] : epithet;
        
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(question, answers);
    }

    if(screen.name === 'definition') {
        
        if(!layout.definition) return;

        const { term, definition } = layout.definition;

        const number = config.isPortraitMode ? 3 : 5;
        const definitions = getGlossary(collection.glossary);
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(definitions)).filter(d => !R.contains(d.term, term))).map(d => d.definition);
        
        const question = definition;
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(question, answers);
    }
};
