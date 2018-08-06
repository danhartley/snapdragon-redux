import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { taxa } from 'api/snapdragon/taxa';
import { epithets } from 'api/botanical-latin';
import { definitions } from 'api/snapdragon/glossary';
import { itemProperties } from 'ui/helpers/data-checking';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { syndromes } from 'api/snapdragon/syndromes';
import familyTemplate from 'ui/screens/multichoice/multi-strips-template.html';
import questionCard from 'ui/screens/common/question-template.html';
import familyCard from 'ui/screens/cards/taxon-card-template.html';

export const renderMultiStrips = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { config, lessonPlan, layout } = store.getState();

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = familyTemplate;

    const families = taxa.filter(taxon => taxon.taxon === 'family');

    let description = config.isPortraitMode ? `${item.family}` : `Which of the above describes the ${item.family}`;

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

    if(layout.screens.find(screen => screen.name === 'wildcard-match')) {

        const getTraits = (pollinators) => {
            const traits = [];
            pollinators.forEach(pollinator => {
                const trait = collection.items.map( (item, i) => {                
                    return {
                        traits: R.flatten(syndromes.traits.map(trait => {
                            const t = trait.keys.find(key => key.key === pollinator);
                            return { trait: trait.name, value: t.value, description: t.description || '' };
                        })),
                        index: i
                    };                
                }).filter(c => c);
                traits.push(trait[0].traits);
            });

            const options = traits.map(trait => trait.map(t => {
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

    if(layout.screens.find(screen => screen.name === 'epithet')) {
        
        if(!layout.epithet) return;

        const epithet = itemProperties.speciesName(item.name);

        description = config.isPortraitMode ? `In the species ${item.name}, what does \'${epithet}\' mean?` : `In the species ${item.name}, what is the meaning of the epithet ${epithet}?`;

        const number = config.isPortraitMode ? 6 : 6;
        
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(epithets)).filter(e => !R.contains(e.en, layout.epithet.en))).map(e => e.en.join(', '));
        const questionText = config.isPortraitMode 
            ? `Tap to match the epithet`
            : `Click to match the epithet`
        const question = layout.epithet.en[0];
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
    }

    if(layout.screens.find(screen => screen.name === 'definition')) {
        
        if(!layout.definition) return;

        const { term, definition } = layout.definition;

        description = config.isPortraitMode ? `What does ${term} mean?` : `What is the meaning of the word \'${term}?\'`;

        const number = config.isPortraitMode ? 4 : 5;
        
        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(definitions)).filter(d => !R.contains(d.term, term))).map(d => d.definition);
        const questionText = config.isPortraitMode 
            ? `Tap the correct definition`
            : `Click the correct definition`
        const question = definition;
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(questionText, question, answers);
    }
};
