import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderQuestionHeader } from 'ui/screens/common/question-header';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import { scoreHandler } from 'ui/helpers/handlers';

import completeTemplate from 'ui/screens/text-entry/text-complete-template.html';

export const renderCompleteText = (collection) => {

    const item = collection.nextItem;

    const { layout, config, lessonPlan } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-complete')[0];
    
    if(!screen) return;

    const template = document.createElement('template');

    template.innerHTML = completeTemplate;

    let question, givenTaxon, description, description2, genus, species;

    const vernacularName = item.vernacularName;

    if(screen.type === 'text-complete-genus') {

        question = item.genus;
        genus = '---';
        species = item.species;
        givenTaxon = 'genus';
        if(config.isPortraitMode) {
            description = `Complete the latin name for a ${vernacularName}.`            
        } else {
            description = `What is the genus of a ${vernacularName}?`;
            description2 = 'Select generic name'
        }
    } else if(screen.type === 'text-complete-species') {

        question = item.species;
        genus = item.genus;
        species = '---';        
        givenTaxon = 'species';
        if(config.isPortraitMode) {
            description = `Complete the latin name for a ${vernacularName}.`
        } else {
            description = `What is the species of a ${vernacularName}?`;
            description2 = 'Complete the latin name below by selecting the approprite species.'
        }
    }

    const numerOfItems = config.isPortraitMode ? 4 : 5;

    const itemTaxons = [ ...collection.speciesNames ].map(item => {
        switch(givenTaxon) {
            case 'genus':
                return itemProperties.getGenusName(item);
            case 'species':
                return itemProperties.getSpeciesName(item);
            default:
                return item
        }
    });
    const pool = R.take(numerOfItems, utils.shuffleArray(itemTaxons).filter(utils.onlyUnique).filter(itemTaxon => itemTaxon !== item[givenTaxon]));
    pool.push(item[givenTaxon]);

    const answers = utils.shuffleArray(pool);

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ description, description2, vernacularName, answers, genus, species }, template.content, parent);

    const score = { itemId: item.id, binomial: item.name, question: item[givenTaxon], callbackTime: config.callbackTime, layoutCount: lessonPlan.layouts.length, points: layout.points };

    const updateScreen = (score, scoreUpdateTimer, config) => {

        const iconColour  = score.success ? 'answer-box-success' : 'answer-box-alert';

        const icon = score.success
            ? `<span class="icon"><i class="fas fa-check-circle"></i></span>`
            : `<span class="icon"><i class="fas fa-times-circle"></i></span>`;


        const txtCorrect = `<span class="icon-text"><span class="icon-container ${iconColour}">${icon}</span><span class="binomial">${score.binomial}</span><span> is correct.</span</span>`;

        const txtIncorrect = `<span class="icon-text"><span class="icon-container ${iconColour}">${icon}</span><span>The correct name is </span<span class="binomial">${score.binomial}.</span></span>`;
        
        document.querySelector('.js-txt-response').innerHTML = score.success ? txtCorrect : txtIncorrect;

        if(question === item.species) {
            const species = document.querySelector('.species');
            species.style.color = 'white';
            species.style.borderColor = 'white';
            species.classList.add(score.colour);
        } else {
            const genus = document.querySelector('.genus');
            genus.style.color = 'white';
            genus.style.borderColor = 'white';
            genus.classList.add(score.colour);
        }

        if(!score.success) {
            document.querySelectorAll('.block span').forEach(block => {
                if(block.innerHTML === score.question) {
                    block.parentElement.classList.add('snap-success');
                }
            });
        }

        const txtBtn = document.querySelector('.js-continue-lesson-btn');

        txtBtn.innerHTML = 'Continue lesson';

        txtBtn.style.cursor = 'pointer';
        txtBtn.disabled = false;
        txtBtn.addEventListener('click', () => {
            window.clearTimeout(scoreUpdateTimer);
            actions.boundUpdateScore(score);
        });
    };

    document.querySelectorAll('.pool .block span').forEach(answer => {
        answer.addEventListener('click', event => {
            const answer = event.target.innerHTML;
            if(question === item.species) {
                document.querySelector('.species').innerHTML = answer;                
            } else {
                document.querySelector('.genus').innerHTML = answer;
            }
            score.answer = answer;
            scoreHandler('block', score, updateScreen, config);
        });
    });

    renderQuestionHeader(document.querySelector('.js-question-container'), item, vernacularName);
};
