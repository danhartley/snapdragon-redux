import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
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

    item.genus = itemProperties.genusName(item.name);
    item.species = itemProperties.speciesName(item.name);

    const vernacular = itemProperties.vernacularName(item, config).toUpperCase();

    if(screen.type === 'text-complete-genus') {

        question = item.genus;
        genus = '---';
        species = item.species;
        givenTaxon = 'genus';
        if(config.isPortraitMode) {
            description = `Complete the latin name for ${vernacular}.`            
        } else {
            description = `Complete the latin name by selecting the correct GENUS name from the options below.`;
            description2 = `Common name: ${vernacular}.`
        }
    } else if(screen.type === 'text-complete-species') {

        question = item.species;
        genus = item.genus;
        species = '---';        
        givenTaxon = 'species';
        if(config.isPortraitMode) {
            description = `Complete the latin name for ${vernacular}.`
        } else {
            description = `Complete the latin name by selecting the correct SPECIES name from the options below.`;
            description2 = `Common name: ${vernacular}.`
        }
    }

    const numerOfItems = config.isPortraitMode ? 4 : 5;

    const itemTaxons = [ ...collection.speciesNames ].map(item => {
        switch(givenTaxon) {
            case 'genus':
                return itemProperties.genusName(item);
            case 'species':
                return itemProperties.speciesName(item);
            default:
                return item
        }
    });
    const pool = R.take(numerOfItems, utils.shuffleArray(itemTaxons).filter(utils.onlyUnique).filter(itemTaxon => itemTaxon !== item[givenTaxon]));
    pool.push(item[givenTaxon]);

    const answers = utils.shuffleArray(pool);

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ description, description2, vernacular, answers, genus, species }, template.content, parent);

    const score = { itemId: item.id, binomial: item.name, question: item[givenTaxon], callbackTime: config.callbackTime, layoutCount: lessonPlan.layouts.length, points: layout.points };

    const updateScreen = (score, scoreUpdateTimer, config) => {

        const iconContainer = document.querySelector('.js-icon-response');

        iconContainer.innerHTML = score.success
            ? `<span class="icon"><i class="fas fa-check-circle"></i></span>`
            : `<span class="icon"><i class="fas fa-times-circle"></i></span>`;

        const iconColour  = score.success ? 'answer-box-success' : 'answer-box-alert';

        iconContainer.classList.add(iconColour);

        const txtCorrect = 
            config.isPortraitMode 
                ? `<span class="icon-text"><span class="binomial">${score.binomial}</span> is correct.</span>`
                : `<span class="icon-text">Correct. The complete latin name is <span class="binomial">${score.binomial}</span>.</span>`;

        const txtIncorrect = 
            config.isPortraitMode
                ? `<span class="icon-text">The correct name is <span class="binomial">${score.binomial}</span>.</span>`
                : `<span class="icon-text">Incorrect. The complete latin name is <span class="binomial">${score.binomial}</span>.</span>`;

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

        const txtBtn = document.querySelector('.js-text-btn');

        txtBtn.innerHTML = 'Continue';

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
};
