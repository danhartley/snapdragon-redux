import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { epithets } from 'api/botanical-latin';
import { itemProperties } from 'ui/helpers/data-checking';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { rebindLayoutState } from 'ui/screens/multichoice/missing-data-helper';
import { firestore } from 'api/firebase/firestore';

import stripTemplate from 'ui/screens/multichoice/multi-strips-template.html';
import audioMediaTemplate from 'ui/screens/common/audio-media-template.html';

export const renderMultiStrips = (collection, bonus) => {

    try {

        const init = async () => {

            const { config, lesson, layout } = store.getState();

            const item = collection.nextItem || collection.items[collection.itemIndex];

            const taxon = matchTaxon(item.taxonomy, iconicTaxa);
            
            const families = await firestore.getFamiliesByIconicTaxon(taxon.rank, taxon.value, item.lichen, config);
        
            screen = bonus ? bonus.screen || layout.screens[1] : layout.screens[1];

            const defaultQueryLimit = 6, defaultLanguage = 'en';

            const render = (questionValue, answers, overrides) => {

                const vernacularName = (overrides && overrides.vernacularName !== undefined) ? overrides.vernacularName : item.vernacularName;
                const binomial = (overrides && overrides.binomial !== undefined) ? overrides.binomial : item.name;
                const question = (overrides && overrides.question) ? overrides.question : 'Match the name';
                const helpDefault = config.isLandscapeMode ? '(Click on the name below.)' : '(Tap on the name below.)';
                const help = (overrides && overrides.help !== undefined) ? overrides.help : helpDefault;
                const term = (overrides && overrides.term !== undefined) ? overrides.term : '';
                const className = (overrides && overrides.className !== undefined) ? overrides.className : '';
                const headerClassName = (overrides && overrides.headerClassName !== undefined) ? overrides.headerClassName : '';
                const conceals = (overrides && overrides.conceals !== undefined) ? overrides.conceals : ['', '', '', '', '', ''];
                
                const parent = renderTestCardTemplate(collection, { vernacularName, binomial, question, help, term, className, headerClassName, bonus });

                const template = document.createElement('template');
                
                template.innerHTML = stripTemplate;

                const options = answers.map((answer, index) => {
                    return {
                        answer,
                        conceal: conceals[index]
                    }
                });

                renderTemplate({ options }, template.content, parent);

                const strips = document.querySelectorAll('.js-rptr-strips .strip');

                if(overrides.italicise) strips.forEach(strip => strip.classList.add('binomial'));

                const wordyAnswers = [ 'family-strips', 'definition' ];

                if(R.contains(screen.name, wordyAnswers)) {
                    strips.forEach(strip => strip.classList.add('extra-small-text'));
                }
                
                if(config.isLandscapeMode) {
                    if(R.contains(screen.name, ['epithet', 'trait-property', 'species-scientifics', 'species-vernaculars'])) {
                        strips.forEach(strip => strip.classList.add('big-padding'));
                    }
                }

                const taxon = { name: item.taxonomy.family, binomial: item.name, question: questionValue };

                const test = { itemId: item.id, items: strips, taxon, binomial: item.name, questionCount: lesson.questionCount, layoutCount: lesson.layoutCount, points: layout.points};
                        
                const callback = (score) => {

                    const updateScore = () => {
                        if(bonus && bonus.callback) {
                            score.guid = bonus.guid;
                            actions.boundUpdateTraitScore(score);
                            bonus.callback(score);
                        } else {
                            actions.boundUpdateScore(score);
                        }
                    };

                    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

                    const scoreUpdateTimer = setTimeout(()=>{
                        updateScore();
                    }, delay);
                
                    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
            
                    continueLessonBtn.disabled = false;
            
                    continueLessonBtn.addEventListener('click', event => {
                        window.clearTimeout(scoreUpdateTimer);
                        updateScore();
                    });

                    if(screen.name === 'family-strips') {
                        document.querySelector('.js-question-question').innerHTML = item.taxonomy.family;
                        document.querySelector('.js-question-help').classList.add('hide');
                    }
                };

                scoreHandler('strip', test, callback, config);
            }

            if(screen.name === 'species-scientifics') {

                const renderBinomialQuestions = async () => {

                    let question, answers, help;

                    const buildQuestion = async () => {

                        question = item.name;
                        answers = await firestore.getSpeciesByIconicTaxon(taxon, item.lichen, 8);
                        answers = R.take(8, answers).filter(s => s.name.toLowerCase() !== item.name.toLowerCase()).map(s => s.name);
                        answers = R.take(5, answers);
                        answers.push(item.name);
                        answers = utils.shuffleArray(answers);
                        
                        help = config.isLandscapeMode ? '(Click on the answer.)' : '(Tap on the answer.)';
                    }

                    await buildQuestion();

                    render(question, answers, { binomial: 'Latin name', question: 'What is the latin name?', help, italicise: true });
                };

                renderBinomialQuestions();
            }

            if(screen.name === 'species-vernaculars') {

                const renderVernacularQuestions = async () => {

                    let question, answers, help;

                    const buildQuestion = async () => {

                        question = item.vernacularName;   
                        answers = await firestore.getSpeciesByIconicTaxon(taxon, item.lichen, defaultQueryLimit)
                                    
                        answers = answers.filter(i => i.name.toLowerCase() !== item.name.toLowerCase()).map(i => itemProperties.getVernacularName(i, defaultLanguage));
                        answers = R.take(defaultQueryLimit - 1, answers);

                        answers.push(item.vernacularName);
                
                        help = config.isLandscapeMode ? '(Click on the answer.)' : '(Tap on the answer.)';
                    };

                    await buildQuestion();

                    render(question, answers, { vernacularName: 'Common name', question: 'What is the common name?', help });
                };

                renderVernacularQuestions();
            }

            if(screen.name === 'family-strips') {

                const random = utils.getRandomInt(2);

                const type = random === 0 ? 'identification' : 'summary';

                const number = config.isPortraitMode ? 4 : 4;

                const question = { type: item.family[type], name: item.family.name } || { type: `Missing ${type}`, name: item.family.name };
                const alternativeFamilies = R.take(number-1, R.take(number, utils.shuffleArray(families))).filter(f => f.name.toLowerCase() !== item.taxonomy.family.toLowerCase());
                const alternatives = alternativeFamilies.filter(f => f[type] && f[type] !== undefined && f[type] !== '').map(f => { return { type: f[type], name: f.name } });
                const answers = utils.shuffleArray([question, ...alternatives]);
                
                const help = config.isLandscapeMode ? '(Click on the description below.)' : '(Tap on the description.)';

                render(question.type, answers.map(a => a.type), { question: 'Match species family', help, conceals: answers.map(a => a.name) });
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
                bonus.overrides.headerClassName = 'names-container-large';
                render(bonus.question, bonus.answers, bonus.overrides);
            }

            if(screen.name === 'family') {

                const indices = config.isPortraitMode ? [5,6] : [5,6];

                const family = item.taxonomy.family;
                const otherFamilies = R.take(indices[0], R.take(indices[1], utils.shuffleArray(families)).filter(family => family.name.toLowerCase() !== item.taxonomy.family.toLowerCase()));
                const otherFamiliesLatinNames = otherFamilies.map(family => family.name);
                const otherFamiliesCommonNames = otherFamilies.map(of => of.names[0]);
                const commonFamilyName = item.family.names[0];

                let question, answers;

                const random = utils.getRandomInt(2);

                switch(random) {            
                    case 0:
                        question = commonFamilyName;
                        answers = utils.shuffleArray([commonFamilyName, ...otherFamiliesCommonNames]);
                        if(question === undefined) console.log('Missing question - case 0 - in multi-strips for: ', item.name);
                        render(question, answers, { question: 'Match family name' });
                    break;
                    case 1:
                        question = family;
                        answers = utils.shuffleArray([family, ...otherFamiliesLatinNames]);
                        if(question === undefined) console.log('Missing question - case 1 - in multi-strips for: ', item.name);
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

        }

        init();

    } catch(e) {

        console.error('Crashed out somwhere on multi-strips with this error: ', e);
        
        rebindLayoutState(layout, item);

        renderMultiStrips(collection);
        
    }
};
