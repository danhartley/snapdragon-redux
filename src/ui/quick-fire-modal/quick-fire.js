import * as R from 'ramda';

import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { firestore } from 'api/firebase/firestore';
import { iconicTaxa  } from 'api/snapdragon/iconic-taxa';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';

import templateCreateQuickFire from 'ui/quick-fire-modal/quick-fire-create-template.html';
import templateQuestionQuickFire from 'ui/quick-fire-modal/quick-fire-question-template.html';

const review = async () => {

    let taxa = [];

    let iconicTaxaKeys = Object.keys(iconicTaxa).map(key => key.toLowerCase());
    
    iconicTaxaKeys.forEach(taxon => {
        taxa.push(taxon);
    });

    const items = await firestore.getDefinitions(taxa);

    const args = {
        items,
        type: enums.quickFireType.DEFINITION,
        filter: {
            iconicTaxa: taxa
        }
    };

    create(args);

};

const create = args => {

    const template = document.createElement('template');
          template.innerHTML = templateCreateQuickFire;

    const parent = document.querySelector('.snapdragon-container');
          parent.innerHTML = '';

    const { items, type, filter } = args;

    const quickFire = {
        index: 0,
        isComplete: false,
        items,
        count: items.length,
        filter,
        type,
        score: {
            total: 0,
            correct: 0,
            incorrect: 0,
            isCorrect: null,
            isIncorrect: null,
            rounds: [
            ]
        },
    };

    renderTemplate({ quickFire }, template.content, parent);

    const updateArray = (arr, elem) => {
        if(arr.find(e => e === elem)) {
            return arr.filter(iconicTaxon => iconicTaxon !== elem); 
        } else {
            arr.push(elem);
            return arr;
        }
    };

    const taxa = document.querySelectorAll('.js-quick-fire-taxa li');
          taxa.forEach(taxon => {
              taxon.addEventListener('change', async e => {
                const selectedTaxon = e.target.id;
                const updatedTaxa = updateArray(filter.iconicTaxa, selectedTaxon);
                quickFire.filter.iconicTaxa = updatedTaxa;
                quickFire.items = await firestore.getDefinitions(updatedTaxa);
                quickFire.count = quickFire.items.length;
                document.querySelectorAll('.js-quick-fire-count').forEach(counter => {
                    counter.innerHTML = quickFire.count;
                }); 
              });
          });

    const createQuickFireBtn = document.querySelector('.js-create-quick-fire');
          createQuickFireBtn.addEventListener('click', e => {
            subscription.add(question, 'quickFire', 'modal');
            question(quickFire);
          });
    
};

const question = (state = quickFire) => {

    const quickFire = R.clone(state);

    if(!quickFire) return;    

    const template = document.createElement('template');
          template.innerHTML = templateQuestionQuickFire;

    const parent = document.querySelector('.snapdragon-container');
          parent.innerHTML = '';

    const items = utils.shuffleArray(quickFire.items);

    quickFire.question = items[0];

    let answers = R.take(3, items.splice(1));
        answers.push(quickFire.question);
        answers = utils.shuffleArray(answers);
        answers = answers.map((item, index) => {
            return {
                term: item.term,
                index
            }
        });

    renderTemplate({ question: quickFire.question, answers }, template.content, parent);

    const options = Array.from(document.querySelectorAll('.js-quick-fire-options > div'));
          options.forEach(option => {
              option.addEventListener('click', e => {
                const answer = e.target.id;
                const isCorrect = answer === quickFire.question.term;
                quickFire.score.total++;
                if(isCorrect) {
                    quickFire.score.correct++; 
                    quickFire.score.isCorrect = true;
                    quickFire.score.isIncorrect = false;
                } else {
                    quickFire.score.incorrect++; 
                    quickFire.score.isCorrect = false;
                    quickFire.score.isIncorrect = true;
                }                
                continueQuickFireBtn.disabled = false;
                if(quickFire.score.isIncorrect) {
                    option.classList.add('snap-alert');
                }
                options.forEach(option => {
                    if(option.id === quickFire.question.term) {
                        option.classList.add('snap-success');
                    }
                });
                setTimeout(() => {
                    continueQuickFireBtn.click();
                }, 1500);
              });
          });

    const continueQuickFireBtn = document.querySelector('.js-continue-quick-fire-btn');
          continueQuickFireBtn.addEventListener('click', e => {
                clear();
                actions.boundCreateQuickFire(quickFire);
          });

};

const clear = () => {
    // subscription.add(question, 'quickFire', 'modal');
    const parent = document.querySelector('.snapdragon-container');
          parent.innerHTML = '';
}

export const quickFire = {
    review,
    create,
    question
};