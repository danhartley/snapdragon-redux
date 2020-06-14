import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { scoreHandler, continueLessonHandler } from 'ui/helpers//score-handler';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';

import completeTemplate from 'ui/screens/text-entry/text-complete-template.html';

export const renderCompleteText = (collection) => {

    const item = collection.nextItem;

    const { layout, config, lessonPlan } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-complete')[0];
    
    if(!screen) return;

    let question, genus, species, givenTaxon, vernacularName, binomial, questionTxt;

    vernacularName = item.vernacularName;
    binomial = item.name;
    questionTxt = 'Complete the latin name';

    switch(screen.type) {
        case 'text-complete-genus':
            question = item.taxonomy.genus;
            genus = '---';
            species = item.taxonomy.species;
            binomial = `--- ${item.taxonomy.species}`;
            givenTaxon = 'genus';
            questionTxt = 'Select genus name';
            break;
        case 'text-complete-species':
            question = item.taxonomy.species;
            genus = item.taxonomy.genus;
            species = '---';
            binomial = `${item.taxonomy.genus} ---`;
            givenTaxon = 'species';
            questionTxt = 'Select species name';
            break;
    }

    const parent = renderTestCardTemplate(collection, { vernacularName, binomial, question: questionTxt, help: '(Select the name below.)', term: '' });

    const template = document.createElement('template');

    template.innerHTML = completeTemplate;

    const numerOfItems = config.isPortraitMode ? 4 : 5;

    // broaden pool to species matching iconic taxon
    const itemTaxons = collection.items.map(item => {
        switch(givenTaxon) {
            case 'genus':
                return item.taxonomy.genus;
            case 'species':
                return item.taxonomy.species;
            default:
                return item.name;
        }
    });
    const pool = R.take(numerOfItems, utils.shuffleArray(itemTaxons).filter(utils.onlyUnique).filter(itemTaxon => itemTaxon !== item.taxonomy[givenTaxon])).filter(item => item !== undefined);
    pool.push(item.taxonomy[givenTaxon]);

    let answers = utils.shuffleArray(pool);

    answers = answers.map((answer, index) => {
      return {
        index,
        value: answer
      }
    });

    renderTemplate({ genus, species, answers }, template.content, parent);

    setTimeout(() => {
      const block = document.querySelectorAll('.pool .block')[0];
            block.focus(); 
    },1000);

    const score = { itemId: item.id, binomial: item.name, question: item.taxonomy[givenTaxon], callbackTime: config.callbackTime, layoutCount: lessonPlan.layouts.length, points: layout.points };

    const callback = (score, scoreUpdateTimer, config) => {

        const iconColour  = score.success ? 'answer-box-success' : 'answer-box-alert';

        const answerIcon = score.success
            ? `<span class="icon"><i class="fas fa-check"></i></span>`
            : `<span class="icon"><i class="fas fa-times"></i></span>`;

        const response = score.success ? `Correct` : `Incorrect`;
        
        document.querySelector('.js-txt-question').innerHTML = `<div class="${iconColour}"><span>${answerIcon}</span><span>${ response }</span</div>`;        

        document.querySelectorAll('.block span').forEach(block => {
            if(block.innerText === score.answer) {
                score.success
                    ? block.parentElement.classList.add('snap-success')
                    : block.parentElement.classList.add('snap-alert');
            }
            if(block.innerText === score.question) {
                block.parentElement.classList.add('snap-success');
            }
        });

        continueLessonHandler(document.querySelector('.js-continue-lesson-btn'), score, scoreUpdateTimer);
    };

    document.querySelectorAll('.js-pool button').forEach(answer => {
        answer.addEventListener('click', e => {
          e.preventDefault();
          const button = e.target;
          const answer = button.innerText;
          if(question === item.taxonomy.species) {
              document.querySelector('.species').innerText = answer;                
          } else {
              document.querySelector('.genus').innerText = answer;
          }
          score.answer = answer;
          score.answers = answers;
          score.questionText = questionTxt;
          scoreHandler('block', score, callback, config);
        });
    });    
};
