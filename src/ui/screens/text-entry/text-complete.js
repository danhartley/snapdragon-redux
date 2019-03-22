import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderIcon } from 'ui/helpers/icon-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTestCardTemplate } from 'ui/screens/common/test-card';
import completeTemplate from 'ui/screens/text-entry/text-complete-template.html';

export const renderCompleteText = (collection) => {

    const item = collection.nextItem;

    const { layout, config, lessonPlan } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-complete')[0];
    
    if(!screen) return;

    let question, genus, species, givenTaxon, vernacularName, binomial;

    vernacularName = item.vernacularName;
    binomial = item.name;

    switch(screen.type) {
        case 'text-complete-genus':
            question = item.genus;
            genus = '---';
            species = item.species;
            binomial = `--- ${item.species}`;
            givenTaxon = 'genus';
            break;
        case 'text-complete-species':
            question = item.species;
            genus = item.genus;
            species = '---';
            binomial = `${item.genus} ---`;
            givenTaxon = 'species';
            break;
    }

    const parent = renderTestCardTemplate(collection, { vernacularName, binomial, question: 'Complete the latin name', help: '(Select the name below.)' });

    const icon = renderIcon(item, document);

    const template = document.createElement('template');

    template.innerHTML = completeTemplate;

    const numerOfItems = config.isPortraitMode ? 4 : 5;

    const itemTaxons = [ ...collection.speciesNames ].map(item => {
        switch(givenTaxon) {
            case 'genus':
                return itemProperties.getGenusName(item);
            case 'species':
                return itemProperties.getSpeciesName(item);
            default:
                return item;
        }
    });
    const pool = R.take(numerOfItems, utils.shuffleArray(itemTaxons).filter(utils.onlyUnique).filter(itemTaxon => itemTaxon !== item[givenTaxon]));
    pool.push(item[givenTaxon]);

    const answers = utils.shuffleArray(pool);

    renderTemplate({ genus, species, answers }, template.content, parent);

    const score = { itemId: item.id, binomial: item.name, question: item[givenTaxon], callbackTime: config.callbackTime, layoutCount: lessonPlan.layouts.length, points: layout.points };

    const updateScreen = (score, scoreUpdateTimer, config) => {

        const iconColour  = score.success ? 'answer-box-success' : 'answer-box-alert';

        const icon = score.success
            ? `<span class="icon"><i class="fas fa-check"></i></span>`
            : `<span class="icon"><i class="fas fa-times"></i></span>`;

        const response = score.success ? 'That is the correct answer.' : 'That is the wrong answer.';
        
        document.querySelector('.js-txt-question').innerHTML = `<div class="${iconColour}"><span>${icon}</span><span>${ response }</span</div>`;        

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
};
