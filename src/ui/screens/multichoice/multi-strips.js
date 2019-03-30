import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderIcon } from 'ui/helpers/icon-handler';
import { species } from 'api/species';
import { taxa } from 'api/snapdragon/taxa';
import { epithets } from 'api/botanical-latin';
import { getGlossary } from 'api/glossary/glossary';
import { itemProperties } from 'ui/helpers/data-checking';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { syndromes } from 'api/snapdragon/syndromes';
import { renderTestCardTemplate } from 'ui/screens/common/test-card';
import stripTemplate from 'ui/screens/multichoice/multi-strips-template.html';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { rebindLayoutState } from 'ui/screens/multichoice/missing-data-helper';
import { getTraits } from 'api/traits/traits';
import * as traitTypes from 'api/traits/trait-types';
import * as SD from 'api/traits/trait-types';

export const renderMultiStrips = (collection) => {

    const item = collection.nextItem;
    const items = collection.allItems || collection.items;

    const { config, lessonPlan, layout } = store.getState();

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
        layout.screens.find(screen => screen.name === 'family') || 
        layout.screens.find(screen => screen.name === 'trait-property') || 
        layout.screens.find(screen => screen.name === 'wildcard-match')
    }

    try {

    const render = (questionValue, answers, overrides) => {

        const vernacularName = (overrides && overrides.vernacularName) ? overrides.vernacularName : item.vernacularName;
        const binomial = (overrides && overrides.binomial) ? overrides.binomial : item.name;
        const question = (overrides && overrides.question) ? overrides.question : 'Match the name';
        const help = (overrides && overrides.help !== undefined) ? overrides.help : '(Click on the name below.)';
        
        const parent = renderTestCardTemplate(collection, { vernacularName, binomial, question, help });

        const icon = renderIcon(item, document);

        const template = document.createElement('template');
        
        template.innerHTML = stripTemplate;

        renderTemplate({ answers }, template.content, parent);

        const strips = document.querySelectorAll('.js-rptr-strips .strip div');

        if(screen.name === 'definition') {
            strips.forEach(strip => strip.classList.add('extra-small-text'));
        }

        const taxon = { name: item.family, binomial: item.name, question: questionValue };

        const test = { itemId: item.id, items: strips, taxon: taxon, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: layout.points};
        
        const callback = (score, scoreUpdateTimer) => {
        
            const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
    
            continueLessonBtn.disabled = false;
    
            continueLessonBtn.addEventListener('click', event => {
                window.clearTimeout(scoreUpdateTimer);
                actions.boundUpdateScore(score);
            });

            score.success ? icon.classList.add('answer-success') : icon.classList.add('answer-alert');
        };

        scoreHandler('strip', test, callback, config);
    }

    if(screen.name === 'species-scientifics') {

        const number = config.isPortraitMode ? 6 : config.isLandscapeMode ? 6 : 6;
        const question = item.name;
        const answers = itemProperties.answersFromList(itemProperties.itemNamesForGroups(items), question, number);

        render(question, answers, { binomial: '--- ---', question: 'What is the latin name?' });
    }

    if(screen.name === 'species-vernaculars') {

        const number = config.isPortraitMode ? 6 : config.isLandscapeMode ? 6 : 6;
        const question = item.vernacularName;   
        const answers = itemProperties.answersFromList(itemProperties.vernacularNamesForGroups(items, config), question, number);

        const help = config.isLandscapeMode ? '(Click on the name below.)' : '';

        render(question, answers, { vernacularName: '--- ---', question: 'What is the common name?', help });
    }

    if(layout.screens.find(screen => screen.flavour === 'match-family-to-quick-id')) {

        const number = config.isPortraitMode ? 3 : 4;

        const questionText = config.isPortraitMode ? 'Tap to match Quick ID' : `Click to match the Quick ID`;
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
        
        // if(!layout.epithet) return;

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

        const { term, definition } = layout.definition;

        const number = config.isPortraitMode ? 4 : 4;

        const definitions = utils.shuffleArray(getGlossary([ matchTaxon(item.taxonomy, iconicTaxa), 'common' ]));

        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(definitions)).filter(d => !R.contains(d.term, term))).map(d => d.definition);
        
        const question = definition;
        const answers = utils.shuffleArray([question, ...alternatives]);

        render(question, answers);
        render(question, answers, { question: layout.definition.term, help: '(Match the definition)' });
    }

    if(screen.name === 'family') {

        const indices = config.isPortraitMode ? [5,6] : [5,6];

        const family = item.family;
        const speciesFamilies = species.map(item => item.family).filter(utils.onlyUnique);
        const families = taxa.filter(taxon => taxon.taxon === 'family').filter(family => R.contains(family.name, speciesFamilies));
        const otherFamilies = R.take(indices[0], R.take(indices[1], utils.shuffleArray(families)).filter(family => family.name !== item.family));
        const otherFamiliesLatinNames = otherFamilies.map(family => family.name);
        const otherFamiliesCommonNames = otherFamilies.filter(family => family.names.find(name => name.language === config.language)).map(family => family.names[0].names[0]);
        const familyTaxon = families.find(family => family.name === item.family); 
        const commonFamilyName = familyTaxon ? itemProperties.getTaxonProp(familyTaxon, config.language, 'names', 'names', '0').names[0] : '';

        let question, answers;

        switch(screen.flavour) {            
            case 'match-common-family-name-to-latin-family-name':
                question = commonFamilyName;
                answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
                render(question, answers, { question: 'Match the family name' });
            break;
            case 'match-latin-family-name-to-common-family-name':
                question = family;
                answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);
                render(question, answers, { question: 'Match the family name' });
            break;
        } 
    }

    if(screen.name === 'trait-property') {

        const { enums } = store.getState();

        let help;
        
        const speciesTraits = getTraits(enums).find(trait => trait.name === item.name);

        const typedSpeciesTraits = traitTypes.typedSpecies(enums, speciesTraits);

        const trait = R.take(1, utils.shuffleArray(typedSpeciesTraits))[0];

        switch(trait.type) {
            case 'howEdible':                
                help = 'How edible is this species?';
                break;
            case 'capShape':
                help = config.isLandscapeMode ? 'How would you describe the pileus (cap) of this mushroom?' : 'How would you describe this pileus (cap)?';
                break;
            case 'hymeniumType':
                help = 'What is the hymenium type of this mushroom?';
                break;
            case 'ecoType':
                help = 'What is the ecological type of this mushroom?';
                break;
            case 'habitat':
                help = 'Where would you expect to find this species?';
                break;
            case 'thallusType':
                help = 'What is this lichen\'s thallus type?';
                break;
            default:
                help = config.isLandscapeMode ? `${trait.name}` : `${trait.name}`;
        }

        help = `(${help})`;
        
        let traits = [ ];

        if(trait.type) {
            Object.keys(SD[trait.type]).forEach(key => {
                let value = SD[trait.type][key];
                if(key !== 'type' && key !== 'name') {
                    traits.push(value);
                }            
            });
        }

        const question = trait.value.value 
                            ? trait.value.value
                            : trait.value.key
                                ? trait.value.key
                                : trait.value;
                                
        // const help = `(Select the ${trait.name} below.)`;

        traits = R.take(5, traits.filter(t => t !== trait.value));
        traits = [ ...traits, trait.value ];

        const answers = traits.map(trait => {
            const t = trait.value 
                        ? trait.value 
                        : trait.key
                            ? trait.value 
                            : trait;
            return t;
        });
          
        render(question, answers, { question: 'Match the trait', help });
    }
} catch(e) {

    console.log('Caught exception in render function:');
    console.log(e);    
    // console.log(`SCREEN NAME: ${screen.name}`);

    rebindLayoutState(layout, config, item);

    renderMultiStrips(collection);
    
}
};
