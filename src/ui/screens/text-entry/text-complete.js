import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import { scoreHandler } from 'ui/helpers/handlers';

import completeTemplate from 'ui/screens/text-entry/text-complete-template.html';

export const renderCompleteText = (collection) => {

    const item = collection.items[collection.itemIndex];

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

    const pool = R.take(6, utils.shuffleArray(collection.items).filter(i => i.name !== item.name)).map(i => i[givenTaxon]);
    pool.push(item[givenTaxon]);

    const answers = utils.shuffleArray(pool);

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ description, description2, vernacular, answers, genus, species }, template.content, parent);

    const score = { itemId: item.id, binomial: item.name, question: item[givenTaxon], callbackTime: config.callbackTime, layoutCount: lessonPlan.layouts.length, points: layout.points };

    const updateScreen = (colour, correct, answer) => {

        document.querySelector('.js-txt-response').innerHTML = correct
            ? `<div>
                <span class="icon"><i class="fas fa-check-circle"></i></span><span>Correct</span>
               </div>`
            : `<div>
                <span class="icon"><i class="fas fa-times-circle"></i></span><span>${ score.question }</span>
               </div>`;

        if(question === item.species) {
            const species = document.querySelector('.species');
            species.style.color = 'white';
            species.style.borderColor = 'white';
            species.classList.add(colour);
        } else {
            const genus = document.querySelector('.genus');
            genus.style.color = 'white';
            genus.style.borderColor = 'white';
            genus.classList.add(colour);
        }

        document.querySelector('.js-text-btn').innerHTML = correct
            ? 'Correct'
            : 'Incorrect';
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
            scoreHandler('block', score, updateScreen, config.callbackTime);
        });
    });
};
