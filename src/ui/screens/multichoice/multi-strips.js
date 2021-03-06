import { take, contains, flatten } from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { getPoolItems } from 'snapdragon-engine/pool-handler';
import { scoreHandler } from 'ui/helpers//score-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { firestore } from 'api/firebase/firestore';
import { lessonStateHelper } from 'ui/screens/lists/lesson-state-helper';

import stripTemplate from 'ui/screens/multichoice/multi-strips-template.html';
import stripWithImageTemplate from 'ui/screens/multichoice/multi-strips-with-images.html';

import audioMediaTemplate from 'ui/screens/common/audio-media-template.html';

export const renderMultiStrips = (collection, bonus, args) => {

    try {

        const { config, lesson, layout, userAction } = store.getState();

        if(lessonStateHelper.overrideLesson(userAction, config)) { return; }

        const item = collection.nextItem || collection.items[collection.itemIndex];

        const taxon = matchTaxon(item.taxonomy, iconicTaxa);                        
    
        const screen = bonus ? bonus.screen || layout.screens[1] : layout.screens[1];

        let defaultQueryLimit = 6, defaultLanguage = 'en';

        defaultLanguage = config.language;

        const init = async () => {

            const render = (answer, answers, overrides) => {

                const vernacularName = (overrides && overrides.vernacularName !== undefined) ? overrides.vernacularName : item.vernacularName;
                const binomial = (overrides && overrides.binomial !== undefined) ? overrides.binomial : item.name;
                const question = (overrides && overrides.question) ? overrides.question : 'Match the name';
                const helpDefault = config.isLandscapeMode ? '(Select the name below.)' : '(Tap on the name below.)';
                const help = (overrides && overrides.help !== undefined) ? overrides.help : helpDefault;
                const term = (overrides && overrides.term !== undefined) ? overrides.term : '';
                const className = (overrides && overrides.className !== undefined) ? overrides.className : '';
                const headerClassName = (overrides && overrides.headerClassName !== undefined) ? overrides.headerClassName : '';
                const clue = (overrides && overrides.clue !== undefined) ? overrides.clue : null;
                
                const parent = renderTestCardTemplate(collection, { vernacularName, binomial, question, help, term, className, headerClassName, bonus });

                const template = document.createElement('template');
                      template.innerHTML = answer.img ? stripWithImageTemplate : stripTemplate;

                answers.forEach((answer, index) => {
                    answer.index = index;
                    answer.name = answer.name || '';
                    answer.names = answer.names ? answer.names.join(', ') : '';
                });

                renderTemplate({ answers }, template.content, parent);

                const strips = document.querySelectorAll('.js-rptr-strips .strip');

                if(overrides.italicise) strips.forEach(strip => strip.classList.add('binomial'));

                const taxon = { name: item.taxonomy.family, binomial: item.name, question: answer.term };

                const test = { 
                    itemId: item.id, 
                    items: strips, 
                    taxon, binomial: 
                    item.name, 
                    questionCount: lesson.questionCount, 
                    layoutCount: lesson.layoutCount, 
                    points: layout.points, 
                    clue, 
                    answerIndex: answers.findIndex(a => a.term === answer.term),
                    questionText: question
                };
                        
                scoreHandler('strip', test, null, config);
            }

            if(screen.name === 'species-scientifics') {

                const renderBinomialQuestions = async () => {

                    let answer, answers, help;

                    const buildQuestion = async () => {

                        answer = { term: item.name };
                        answers = await getPoolItems(collection, 6);
                        answers = take(8, answers).filter(s => s.name.toLowerCase() !== item.name.toLowerCase()).map(s => s.name);
                        answers = take(5, answers);
                        answers.push(item.name);
                        answers = answers.map(a => { return { term: a } });
                        answers = utils.shuffleArray(answers);
                        
                        help = config.isLandscapeMode ? '(Select the answer)' : '(Tap on the answer)';
                    }

                    await buildQuestion();

                    render( answer, answers, { binomial: 'Latin name', question: 'What\'s the latin name?', help, italicise: true });
                };

                renderBinomialQuestions();
            }

            if(screen.name === 'species-vernaculars') {

                const renderVernacularQuestions = async () => {

                    let answer, answers, help;

                    const buildQuestion = async () => {

                        answer = { term: item.vernacularName };   
                        answers = await getPoolItems(collection, 6);
                        answers = answers.map(a => itemProperties.getVernacularName(a, config, false, 'vernacularName', defaultLanguage));
                        answers = take(5, answers.filter(a => a !== item.vernacularName));
                        answers = utils.shuffleArray([item.vernacularName, ...answers]);
                        answers = answers.map(a => { return { term: a } });
                
                        help = config.isLandscapeMode ? '(Select the answer)' : '(Tap on the answer)';
                    };

                    await buildQuestion();

                    render(answer, answers, { vernacularName: 'Common name', question: `What's the common name?`, help });
                };

                renderVernacularQuestions();
            }

            if(screen.name === 'species-identification') {

                const renderIdQuestions = async () => {

                    let answer, answers, help;

                    const buildQuestion = async () => {

                        answer = { term: item.quickId };   
                        answers = await getPoolItems(collection, 6);
                        answers = answers.map(a => a.quickId);
                        answers = take(5, answers.filter(a => a !== item.quickId));
                        answers = utils.shuffleArray([item.quickId, ...answers]);
                        answers = answers.map(a => { return { term: a } });
                
                        help = config.isLandscapeMode ? '(Select the answer)' : '(Tap on the answer)';
                    };

                    await buildQuestion();

                    render(answer, answers, { vernacularName: item.vernacularName, question: 'Which description fits?', help });
                };

                renderIdQuestions();
            }

            if(screen.name === 'family-strips') {

                const random = utils.getRandomInt(2);

                const type = random === 0 ? 'identification' : 'summary';

                const number = config.isPortraitMode ? 4 : 4;

                const families = await firestore.getFamiliesByIconicTaxon(taxon.rank, taxon.value, item.lichen, config);
                const term = item.family[type] || item.family.descriptions[0][type];
                const answer = { term, name: item.family.name } || { type: { term: `Missing ${type}`}, name: item.family.name };
                const alternativeFamilies = take(number-1, take(number, utils.shuffleArray(families))).filter(f => f.name.toLowerCase() !== item.taxonomy.family.toLowerCase());
                let alternatives = alternativeFamilies.filter(f => f[type] && f[type] !== undefined && f[type] !== '').map(f => { return { type: f[type], name: f.name, names: f.names } });
                    alternatives = alternatives.map(a => { return { term: a.type, name: a.name, names: a.names } });
                let answers = utils.shuffleArray([answer, ...alternatives]);                    
                
                const help = config.isLandscapeMode ? '(Select the description below.)' : '(Tap on the description.)';

                render(answer, answers, { question: 'Match species family', help, clue: item.taxonomy.family });
            }

            if(screen.name === 'epithet') {
                
                const epithet = layout.epithet.latin.join(', ');
                const number = config.isPortraitMode ? 6 : 6;
                
                const epithets = await firestore.getEpithets();

                let alternatives = take(number-1, utils.shuffleArray(epithets)).filter(e => !contains(e.latin, epithet));
                    alternatives = alternatives.map(e => e.en.join(', '));
                    alternatives = alternatives.map(a => { return { term: a } });
                let answer = epithets.find(e => e.latin.join(', ').toUpperCase() === epithet.toUpperCase());
                    answer = answer ? answer[config.language][0] : epithet;
                    answer = { term: answer };
                
                const answers = utils.shuffleArray([answer, ...alternatives]);
                
                if(config.isLandscapeMode) {            
                    render(answer, answers, { question: layout.epithet.latin.join(', '), help: '(Match the latin term)' });
                } else {
                    render(answer, answers, { question: 'Match latin word', help: '', vernacularName: '', binomial: '', term: layout.epithet.latin.join(', ') });
                }
            }

            if(screen.name === 'definition') {
                render({ term: bonus.question }, bonus.answers.map(a => { return { term: a } }), bonus.overrides);
            }

            if(screen.name === 'family') {

                const indices = config.isPortraitMode ? [5,6] : [5,6];

                let families = await firestore.getFamiliesByIconicTaxon(taxon.rank, taxon.value, item.lichen, config);
                let family = item.taxonomy.family;
                let otherFamilies = take(indices[0], take(indices[1], utils.shuffleArray(families)).filter(family => family.name.toLowerCase() !== item.taxonomy.family.toLowerCase()));
                let otherFamiliesLatinNames = otherFamilies.map(family => family.name);
                let otherFamiliesCommonNames = otherFamilies.map(of => of.names[0]);
                
                let answer, answers;

                const random = utils.getRandomInt(2);

                switch(random) {            
                    case 0:
                        answer = { term: item.family.vernacularName };
                        otherFamiliesCommonNames = otherFamiliesCommonNames.map(a => { return { term: a } });
                        answers = utils.shuffleArray([answer, ...otherFamiliesCommonNames]);
                        if(answer === undefined) console.log('Missing question - case 0 - in multi-strips for: ', item.name);
                        render(answer, answers, { question: 'Match family name' });
                    break;
                    case 1:
                        answer = { term: family };
                        otherFamiliesLatinNames = otherFamiliesLatinNames.map(a => { return { term: a } });
                        answers = utils.shuffleArray([answer, ...otherFamiliesLatinNames]);
                        if(answer === undefined) console.log('Missing question - case 1 - in multi-strips for: ', item.name);
                        render(answer, answers, { question: 'Match family name', italicise: true });
                    break;
                } 
            }

            if(screen.name === 'trait-property') {

                render({ term: bonus.question }, bonus.answers.map(a => { return { term: a } }), bonus.overrides);

                if(bonus.overrides.trait && bonus.overrides.trait.name === 'song') {

                        const renderBirdsong = async () => {

                            const parent = document.querySelector('.js-question-help');
                                  parent.innerHTML = '';

                            const template = document.createElement('template');
                                  template.innerHTML = audioMediaTemplate;

                            const xcID = bonus.overrides.trait.value[0];

                            const mp3 = await firestore.getBirdsong(xcID);
                            
                            renderTemplate({ mp3, title: item.name }, template.content, parent);

                            const header = document.querySelector('.js-test-card-question');
                                  header.classList.remove('standard-block');
                                  header.classList.add('double-standard-block');

                            const content = document.querySelector('.js-test-card-content');
                                  content.classList.add('test-card-content-less-standard-block');
                        };

                        renderBirdsong();
                }
            }

            if(layout.name === 'mixed-trait-images') {

                // portrait only - redirect from renderMixedTraitImages

                const { traits, requiredTraits, item, question, help } = args;

                const answers = flatten(traits);
                const answer = requiredTraits[0];

                render(answer, answers, { binomial: item.name, question, help, italicise: true});

            }
        }

        init();

    } catch(e) {
        console.error('Crashed out somwhere on multi-strips with this error: ', e);        
    }
};