import * as R from 'ramda';

import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { iconicTaxa  } from 'api/snapdragon/iconic-taxa';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';
import { quickFireAPI } from 'ui/quick-fire-modal/quick-fire-api';
import { quickFireUI } from 'ui/quick-fire-modal/quick-fire-ui';

import templateCreateQuickFire from 'ui/quick-fire-modal/quick-fire-create-template.html';
import templateQuestionQuickFire from 'ui/quick-fire-modal/quick-fire-question-template.html';
import templateSummaryQuickFire from 'ui/quick-fire-modal/quick-fire-summary-template.html';

const headers = (step, quickFire, linkFromLesson = false) => {

    const getQuickFire = () => quickFire;

    const modal = document.querySelector('#glossaryModal');

    const links = { 
        glossary: modal.querySelector('.js-modal-text-title'),
        filters: modal.querySelector('.js-quick-fire-filters'),
        questions: modal.querySelector('.js-quick-fire-questions')
    };

    quickFireUI.updateHeaders(step, links, getQuickFire, linkFromLesson, );
};

const filters = async () => {

    const args = await init();

    const template = document.createElement('template');
          template.innerHTML = templateCreateQuickFire;

    const modal = document.querySelector('#glossaryModal');
    const parent = modal.querySelector('.js-modal-text');
          parent.innerHTML = '';

    headers(enums.quickFireStep.FILTERS, { items: args.items });

    let { items, type, filter } = args;

    const quickFire = store.getState().quickFire || quickFireAPI.getQuickFire(items, filter, type);

    const options = [
        { key: 0, value: 'multiple choice' },
        { key: 1, value: 'text entry' },
        // { key: 2, value: 'multiple choice followed by text entry' },
        // { key: 3, value: 'mixed multiple choice and text entry' },
    ];

    const branches = quickFireAPI.getBranches(items);

    parent.innerHTML = '';

    renderTemplate({ quickFire, options, branches }, template.content, parent);

    const counters = document.querySelectorAll('.js-quick-fire-count');
    const branchCounters = document.querySelectorAll('.js-quick-fire-branches label > span');

    const input = document.querySelector('.js-input-quick-fire');
          input.addEventListener('input', e => {
            quickFire.poolSize = parseInt(e.target.value);          
          });

    quickFire.poolSize = parseInt(input.value);

    const updateArray = (arr, elem) => {
        if(arr.find(e => e === elem)) {
            return arr.filter(iconicTaxon => iconicTaxon !== elem); 
        } else {
            arr.push(elem);
            return arr;
        }
    };

    const getFiltertaxa = () => quickFire.filter.iconicTaxa;

    const taxa = document.querySelectorAll('.js-quick-fire-taxa li');

          taxa.forEach(taxon => {

              const chkBox = taxon.querySelector('input');

              if(!R.contains(taxon.dataset.name, quickFire.filter.iconicTaxa)) {
                  chkBox.click();
              }

              taxon.addEventListener('change', async e => {
                const selectedTaxon = e.target.id;
                const updatedTaxa = updateArray(getFiltertaxa(), selectedTaxon);
                quickFire.filter.iconicTaxa = updatedTaxa;
                quickFire.items = quickFireAPI.getItems(updatedTaxa);
                quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters);
              });
          });

    quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters);

    const createQuickFireBtn = document.querySelector('.js-create-quick-fire');
          createQuickFireBtn.addEventListener('click', e => {      
            questions(quickFire);
          });

    const quickFireOptions = document.querySelectorAll('.js-quick-fire-options .btn');
    
          quickFire.filter.option.key === "0"
            ? quickFireOptions[0].click()
            : quickFireOptions[1].click();
    
          Array.from(quickFireOptions).forEach(option => {
              option.addEventListener('click', e => {
                  quickFire.filter.option = {
                      key: e.target.dataset.key,
                      value: e.target.dataset.value
                  };
              });
          });        

    const branchOptions = document.querySelectorAll('.js-quick-fire-branches label');

    if(quickFire.filter.branches) {

        branchOptions.forEach(branch => {
            if(!R.contains(branch.dataset.key, quickFire.filter.branches)) {
                branch.click();
            }
        });    
    }

    branchOptions.forEach(branch => {
        branch.addEventListener('click', e => {
        setTimeout(async() => {
            let checkedBranches = Array.from(branchOptions).filter(b => elem.hasClass(b, 'active'));
                checkedBranches = checkedBranches.map(b => b.dataset.key);
            quickFire.filter.branches = checkedBranches;
            quickFire.items = await quickFireAPI.getItems(quickFire.filter.iconicTaxa);
            quickFire.items = quickFire.items.filter(item => R.contains(item.branch, checkedBranches));
            quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters);
        });
        });
    });

    const technical = document.querySelector('.js-quick-fire-technical');
          technical.addEventListener('change', async e => {
            const includeTechnicalTerms = e.target.checked;
            quickFire.items = await quickFireAPI.getItems(quickFire.filter.iconicTaxa, includeTechnicalTerms);
            quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters);
          });
};

const questions = (quickFire, linkFromLesson = false) => {

    if(!quickFire) return;

    actions.boundCreateQuickFire(quickFire);

    headers(enums.quickFireStep.QUESTIONS, quickFire, linkFromLesson, );

    const modal = document.querySelector('#glossaryModal');
    const parent = modal.querySelector('.js-modal-text'); 
          parent.innerHTML = '';

    const template = document.createElement('template');

    let timer;    

    if(quickFire.items.length > 0) {

        template.innerHTML = templateQuestionQuickFire;

        quickFire.spareItems = quickFire.spareItems || R.take(4, utils.shuffleArray(quickFire.items));
        
        const items = R.take(quickFire.poolSize, utils.shuffleArray(quickFire.items));

        quickFire.question = items[0];

        if(quickFire.items.length < 4) {
            const itemsToAdd = R.take((4-quickFire.items.length), quickFire.spareItems.filter(sp => !R.contains(sp.term, items.map(i => i.term))));
                  itemsToAdd.forEach(item => items.push(item));
        }

        let answers = R.take(3, items.splice(1));
            answers.push(quickFire.question);
            answers = utils.shuffleArray(answers);
            answers = answers.map((item, index) => {
                return {
                    term: item.term,
                    index
                }
            });

        renderTemplate({ question: quickFire.question, 
                answers, total: quickFire.score.total + 1, 
                count: quickFire.poolSize,
                correct: quickFire.score.correct, 
                answered: quickFire.score.total 
            }, template.content, parent);

        const layouts = document.querySelectorAll('.js-quick-layouts');
              layouts.forEach(layout => {
                  layout.classList.add('hide');
                  if(layout.id === quickFire.filter.option.key) layout.classList.remove('hide');                  
              });

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
                    timer = setTimeout(() => {
                        continueQuickFireBtn.click();
                    }, 1500);
                });
            });

        const quickFireInput = document.querySelector('.js-quick-fire-text-entry input');
        if(quickFire.filter.option.key === '1') quickFireInput.focus();
        const quickFireMessage = document.querySelector('.js-quick-fire-message');

        const continueQuickFireBtn = document.querySelector('.js-continue-quick-fire-btn');
              continueQuickFireBtn.addEventListener('click', e => {
                    quickFire.items = quickFire.items.filter(item => item.term !== quickFire.question.term);
                    clearTimeout(timer);
                    actions.boundCreateQuickFire(quickFire);
                    subscription.add(quickFireQuestion, 'quickFire', 'modal');
              });

        quickFireInput.addEventListener('keydown', event => {
            if (event.keyCode == 9) {
              timer = quickFireUI.scoreTest(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
            }
        });

        quickFireInput.addEventListener('keypress', event => {
            if (event.keyCode == 13) {
              timer = quickFireUI.scoreTest(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
            }
        });

    } else {
        template.innerHTML = templateSummaryQuickFire;        
        renderTemplate({ correct: quickFire.score.correct, answered: quickFire.score.total }, template.content, parent);
    }
};

const init = async () => {

    let taxa = [];
    let iconicTaxaKeys = Object.keys(iconicTaxa).map(key => key.toLowerCase());
        iconicTaxaKeys.push('common');
        iconicTaxaKeys.forEach(taxon => {
            taxa.push(taxon);
        });

    const items = await quickFireAPI.getItems(taxa);
        
    const args = {
        items,
        type: enums.quickFireType.DEFINITION,
        filter: {
            iconicTaxa: taxa
        }
    };
    return args;
};

export const quickFire = {
    filters,
    questions,
    headers,
    init: quickFireAPI.getQuickFire
};

export const quickFireQuestion = state => {
    quickFire.questions(state);
};