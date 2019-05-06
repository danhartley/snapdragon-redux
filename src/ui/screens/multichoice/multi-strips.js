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
import { familyProps } from 'redux/reducers/initial-state/species-state/species-taxa';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { rebindLayoutState } from 'ui/screens/multichoice/missing-data-helper';
import { getTraits } from 'api/traits/traits';

import stripTemplate from 'ui/screens/multichoice/multi-strips-template.html';
import audioMediaTemplate from 'ui/screens/common/audio-media-template.html';

export const renderMultiStrips = (collection, bonus) => {

    const { config, lesson, layout } = store.getState();

    const item = collection.nextItem;

    const taxon = matchTaxon(item.taxonomy, iconicTaxa);
    const iconicTaxonFamilies = familyProps.getUniqueFamiliesByIconicTaxon(species, taxon.rank, taxon.value);
    const families = taxa.filter(taxon => taxon.taxon === 'family').filter(family => R.contains(family.name, iconicTaxonFamilies));

    screen = layout.screens[1];

    try {

    const render = (questionValue, answers, overrides) => {

        const vernacularName = (overrides && overrides.vernacularName !== undefined) ? overrides.vernacularName : item.vernacularName;
        const binomial = (overrides && overrides.binomial !== undefined) ? overrides.binomial : item.name;
        const question = (overrides && overrides.question) ? overrides.question : 'Match the name';
        const helpDefault = config.isLandscapeMode ? '(Click on the name below.)' : '(Tap on the name below.)';
        const help = (overrides && overrides.help !== undefined) ? overrides.help : helpDefault;
        const term = (overrides && overrides.term !== undefined) ? overrides.term: '';
        const className = (overrides && overrides.className !== undefined) ? overrides.className: '';
        
        const parent = renderTestCardTemplate(collection, { vernacularName, binomial, question, help, term, className });

        const icon = renderIcon(item, document);

        const template = document.createElement('template');
        
        template.innerHTML = stripTemplate;

        renderTemplate({ answers }, template.content, parent);

        const strips = document.querySelectorAll('.js-rptr-strips .strip');

        if(overrides.italicise) strips.forEach(strip => strip.classList.add('binomial'));

        const wordyAnswers = [ 'family-strips', 'definition' ];

        if(R.contains(screen.name, wordyAnswers)) {
            strips.forEach(strip => strip.classList.add('extra-small-text'));
        }
        
        if(R.contains(screen.name, ['epithet', 'trait-property', 'species-scientifics', 'species-vernaculars'])) {
            strips.forEach(strip => strip.classList.add('big-padding'));
        }

        const taxon = { name: item.family, binomial: item.name, question: questionValue };

        const test = { itemId: item.id, items: strips, taxon: taxon, binomial: item.name, questionCount: lesson.questionCount, layoutCount: lesson.layoutCount, points: layout.points};
        
        const callback = (score, scoreUpdateTimer) => {
        
            const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
    
            continueLessonBtn.disabled = false;
    
            continueLessonBtn.addEventListener('click', event => {
                window.clearTimeout(scoreUpdateTimer);
                actions.boundUpdateScore(score);
            });

            score.success ? icon.classList.add('answer-success') : icon.classList.add('answer-alert');

            if(screen.name === 'family-strips') {
                document.querySelector('.js-question-question').innerHTML = item.family;
                document.querySelector('.js-question-help').classList.add('hide');
            }
        };

        scoreHandler('strip', test, callback, config);
    }

    if(screen.name === 'species-scientifics') {

        let question = item.name;
        let answers = species.filter(s => s.taxonomy).filter(s => s.taxonomy[taxon.rank].toLowerCase() === taxon.value);
            answers = R.take(8, answers).filter(s => s.name !== item.name).map(s => s.name);
            answers = R.take(5, answers);
            answers.push(item.name);
            answers = utils.shuffleArray(answers);
            
        const help = config.isLandscapeMode ? '(Click on the answer.)' : '(Tap on the answer.)';

        render(question, answers, { binomial: 'Latin name', question: 'What is the latin name?', help, italicise: true });
    }

    if(screen.name === 'species-vernaculars') {

        let question = item.vernacularName;   
        let filteredAnswers = species.filter(s => s.taxonomy).filter(s => s.taxonomy[taxon.rank].toLowerCase() === taxon.value);
            filteredAnswers = R.take(8, filteredAnswers).filter(s => !R.contains(item.vernacularName, s.names.map(n => n.vernacularName)));
        let answers = filteredAnswers.map(s => s.names.filter(n => n.language === config.language)).filter(a => a.length > 0);
            const noOfAnswers = 8 - answers.length;
            if(noOfAnswers > 0) {
                const englishAnswers = R.take(noOfAnswers, filteredAnswers.map(s => s.names.filter(n => n.language === 'en')));
                answers = [ ...answers, ...englishAnswers ];
            }
            answers = answers.filter(a => a.length).map(answer => utils.capitaliseFirst(answer[0].vernacularName));
            answers = R.take(5, answers);
            answers.push(item.vernacularName);
            answers = utils.shuffleArray(answers);

        const help = config.isLandscapeMode ? '(Click on the answer.)' : '(Tap on the answer.)';

        render(question, answers, { vernacularName: 'Common name', question: 'What is the common name?', help });
    }

    if(screen.name === 'family-strips') {

        const random = utils.getRandomInt(2);
    
        // 'match-family-to-quick-id'
        if(random === 0) {

            const ffs = species.filter(s => s.kingdom === item.kingdom).map(s => s.family);
            const ns = taxa.map(t => t.name);
            const missing = ffs.filter(f => !R.contains(f,ns));
            console.log(missing.filter(utils.onlyUnique));
        
            const number = config.isPortraitMode ? 4 : 4;

            const question = families.length > 0 ? families.find(f => f.name === item.family).descriptions[0].identification : 'no families available';
            const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(families)).filter(f => f.name !== item.family && f.descriptions && f.descriptions[0].identification && f.descriptions[0].identification !== undefined && f.descriptions[0].identification !== '')).map(f => f.descriptions[0].identification);
            const answers = utils.shuffleArray([question, ...alternatives]);

            const help = config.isLandscapeMode ? '(Click on the description below.)' : '(Tap on the description.)';

            render(question, answers, { question: 'Match species family', help });
        }

        // 'match-family-to-summary'
        if(random === 1) {
            
            const number = config.isPortraitMode ? 4 : 4;
            const itemFamily = families.find(f => f.name === item.family);
            const question = itemFamily.descriptions[0].summary;
            const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(families)).filter(f => f.name !== item.family && f.descriptions && f.descriptions[0].summary && f.descriptions[0].summary !== undefined && f.descriptions[0].summary !== '')).map(f => f.descriptions[0].summary);
            const answers = utils.shuffleArray([question, ...alternatives]);

            const help = config.isLandscapeMode ? '(Click on the description below.)' : '(Tap on the description.)';

            render(question, answers, { question: 'Match species family', help });
        }
    }

    if(screen.name === 'epithet') {
        
        const epithet = layout.epithet.latin.join(', ');
        const number = config.isPortraitMode ? 6 : 6;
        
        let alternatives = R.take(number-1, utils.shuffleArray(epithets)).filter(e => !R.contains(e.latin, epithet));
        alternatives = alternatives.map(e => e.en.join(', '));
        let question = epithets.find(e => e.latin.join(', ').toUpperCase() === epithet.toUpperCase());
        question = question ? question[config.language][0] : epithet;
        
        const answers = utils.shuffleArray([question, ...alternatives]);

        
        if(config.isLandscapeMode) {            
            render(question, answers, { question: layout.epithet.latin.join(', '), help: '(Match the latin term)' });
        } else {
            render(question, answers, { question: 'Match latin word', help: '', vernacularName: '', binomial: '', term: layout.epithet.latin.join(', ') });
        }
    }

    if(screen.name === 'definition') {

        const { term, definition } = layout.definition;

        const number = config.isPortraitMode ? 4 : 4;

        const definitions = utils.shuffleArray(getGlossary([ matchTaxon(item.taxonomy, iconicTaxa).value, 'common' ]));

        const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(definitions)).filter(d => !R.contains(d.term, term))).map(d => d.definition);
        
        const question = definition;
        const answers = utils.shuffleArray([question, ...alternatives]);

        if(config.isLandscapeMode) {            
            render(question, answers, { question: layout.definition.term, help: '(Match the definition)' });
        } else {
            render(question, answers, { question: 'Match definition', help: '', vernacularName: '', binomial: '', term: layout.definition.term });
        }
    }

    if(screen.name === 'family') {

        const indices = config.isPortraitMode ? [5,6] : [5,6];

        const family = item.family;
        const otherFamilies = R.take(indices[0], R.take(indices[1], utils.shuffleArray(families)).filter(family => family.name !== item.family));
        const otherFamiliesLatinNames = otherFamilies.map(family => family.name);
        const otherFamiliesCommonNames = otherFamilies.filter(family => family.names.find(name => name.language === config.language)).map(family => family.names[0].names[0]).filter(name => name !== '');
        const familyTaxon = families.find(family => family.name === item.family); 
        let commonFamilyName = familyTaxon ? itemProperties.getTaxonProp(familyTaxon, config.language, 'names', 'names', '0').names[0] : family;
            commonFamilyName = commonFamilyName === '' ? family : commonFamilyName;

        let question, answers;

        const random = utils.getRandomInt(2);

        switch(random) {            
            case 0: //'match-common-family-name-to-latin-family-name':
                question = commonFamilyName;
                answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
                if(question === undefined) console.log(item.name);
                render(question, answers, { question: 'Match family name' });
            break;
            case 1:  //'match-latin-family-name-to-common-family-name':
                question = family;
                answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);
                if(question === undefined) console.log(item.name);
                render(question, answers, { question: 'Match family name', italicise: true });
            break;
        } 
    }

    if(screen.name === 'trait-property') {
        render(bonus.question, bonus.answers, bonus.overrides);

        if(bonus.overrides.trait && bonus.overrides.trait.name === 'song') {

            const parent = document.querySelector('.js-question-help');
                  parent.innerHTML = '';

            const template = document.createElement('template');
                  template.innerHTML = audioMediaTemplate;

            const xcID = bonus.overrides.trait.value;

            const mp3 = `./songs/${xcID}.mp3`;
            
            renderTemplate({ mp3, title: item.name }, template.content, parent);
        }
    }
} catch(e) {
   
    rebindLayoutState(layout, item);

    renderMultiStrips(collection);
    
  }
};
