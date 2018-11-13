import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { taxa } from 'api/snapdragon/taxa';
import { epithets } from 'api/botanical-latin';
import { getGlossary } from 'api/glossary/glossary';
import { itemProperties } from 'ui/helpers/data-checking';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { syndromes } from 'api/snapdragon/syndromes';
import familyTemplate from 'ui/screens/multichoice/multi-strips-template.html';
import questionTemplate from 'ui/screens/common/question-template.html';
import speciesCard from 'ui/screens/cards/species-card-template.html';
import taxonCard from 'ui/screens/cards/taxon-card-template.html';

export const renderMultiStrips = (collection) => {

    const item = collection.nextItem;
    const items = collection.allItems || collection.items;

    const { config, lessonPlan, layout } = store.getState();

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = familyTemplate;

    const families = taxa.filter(taxon => taxon.taxon === 'family').filter(family => R.contains(family.name, collection.families));

    let description = config.isPortraitMode ? `Family: ${item.family} ` : `Which of the above descriptions best fits the ${item.family}?`;

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

    const render = (questionText, questionValue, answers, card = taxonCard, ctxt = {description}) => {
    
        renderTemplate({ answers }, template.content, parent);
        
        const strips = document.querySelectorAll('.js-rptr-strips .strip div');

        parent = document.querySelector('.right-body .snapdragon-container');

        template.innerHTML = card;

        const context = ctxt;

        renderTemplate( context, template.content, parent);

        template.innerHTML = questionTemplate;
        
        renderTemplate( { question: questionText }, template.content, parent);

        const renderAnswer = (score, scoreUpdateTimer) => {
            const answer = document.querySelector('.js-answer');
            answer.innerHTML = 'Continue';
            answer.style.display = 'block';
            answer.style.cursor = 'pointer';
            answer.addEventListener('click', () => {
                window.clearTimeout(scoreUpdateTimer);
                actions.boundUpdateScore(score);
            });
            document.querySelector('.js-question').style.display = 'none';
            if(screen.name === 'species-vernaculars') {
                document.querySelector('.js-txt-species-name').innerHTML =  score.question;
            } else if(screen.name === 'species-scientifics') {
                document.querySelector('.js-txt-species').innerHTML = score.question;
            }            
        }

        const taxon = { name: item.family, binomial: item.name, question: questionValue };

        const test = { itemId: item.id, items: strips, taxon: taxon, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: layout.points};
        const callback = renderAnswer;

        scoreHandler('strip', test, callback, config);
    }

    if(screen.name === 'species-scientifics') {

        const number = config.isPortraitMode ? 6 : config.isLandscapeMode ? 6 : 6;

        const questionText = config.isPortraitMode ? 'Select equivalent of common name' : `Select the latin equivalent of the common name`;
        const question = item.name;
        const answers = itemProperties.answersFromList(itemProperties.itemNamesForGroups(items), question, number);

        const description = { vernacular: item.vernacularName, name: '---' };

        render(questionText, question, answers, speciesCard, description);
    }

    if(screen.name === 'species-vernaculars') {

        if(!collection.speciesVernacularNames) return;

        const number = config.isPortraitMode ? 6 : config.isLandscapeMode ? 6 : 6;

        const questionText = config.isPortraitMode ? 'Select equivalent of latin name' : `Select the common name equivalent of the latin`;
        const question = item.vernacularName;   
        const answers = itemProperties.answersFromList(itemProperties.vernacularNamesForGroups(items, config), question, number);

        const description = { vernacular: '---', name: item.name };

        render(questionText, question, answers, speciesCard, description);
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-quick-id')) {

        const number = config.isPortraitMode ? 3 : config.isLandscapeMode ? 4 : 5;

        const questionText = config.isPortraitMode ? 'Tap to match Quick ID' : `Click to match the Quick Id`;
        const question = families.find(f => f.name === item.family).descriptions[0].identification;
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(families)).filter(f => f.name !== item.family)).map(f => f.descriptions[0].identification);
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-summary')) {
        
        const number = config.isPortraitMode ? 3 : 5;

        const questionText = config.isPortraitMode ? 'Tap to match description' : `Click to match the description`;
        const question = families.find(f => f.name === item.family).descriptions[0].summary;
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(families)).filter(f => f.name !== item.family)).map(f => f.descriptions[0].summary);
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
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

        description = config.isPortraitMode ? `In the species ${item.name}, what does \'${epithet}\' mean?` : `In the species ${item.name}, what is the meaning of the epithet ${epithet}?`;

        const number = config.isPortraitMode ? 6 : 6;
        
        let alternatives = R.take(number-1, utils.shuffleArray(epithets)).filter(e => !R.contains(e.latin, epithet));
        alternatives = alternatives.map(e => e.en.join(', '));
        const questionText = config.isPortraitMode 
            ? `Tap to match the epithet`
            : `Click to match the epithet`
        let question = epithets.find(e => e.latin[0].toUpperCase() === epithet.toUpperCase());
        question = question ? question[config.language][0] : epithet;
        
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
    }

    if(screen.name === 'definition') {
        
        if(!layout.definition) return;

        const { term, definition } = layout.definition;

        description = `What does ${term} mean?`;

        const number = config.isPortraitMode ? 3 : 5;

        const definitions = getGlossary(collection.glossary);
        
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(definitions)).filter(d => !R.contains(d.term, term))).map(d => d.definition);
        const questionText = config.isPortraitMode 
            ? `Tap the correct definition`
            : `Click the correct definition`
        const question = definition;
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
    }
};
