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
import { quickFireLogic } from 'ui/quick-fire-modal/quick-fire-logic';

import templateCreateQuickFire from 'ui/quick-fire-modal/quick-fire-filters-template.html';
import templateQuestionQuickFire from 'ui/quick-fire-modal/quick-fire-questions-template.html';
import templateSummaryQuickFire from 'ui/quick-fire-modal/quick-fire-summary-template.html';

const headers = (step, quickFire) => {

    const getQuickFire = () => quickFire;

    const modal = document.querySelector('#glossaryModal');

    const links = { 
        glossary: modal.querySelector('.js-modal-text-title'),
        filters: modal.querySelector('.js-quick-fire-filters'),
        questions: modal.querySelector('.js-quick-fire-questions')
    };

    quickFireUI.updateHeaders(step, links, getQuickFire);
};

const filters = async linkFromLesson => {

    const args = await init();

    const { template, modal, parent } = quickFireUI.readyTemplate(templateCreateQuickFire);

    headers(enums.quickFireStep.FILTERS, { items: args.items });

    let { items, type, filter } = args;

    const quickFire = store.getState().quickFire || quickFireAPI.getQuickFire(items, filter, type);
          quickFire.linkFromLesson = linkFromLesson;

    const options = [
        { key: 0, value: 'multiple choice' },
        { key: 1, value: 'text entry' },
        // { key: 2, value: 'multiple choice followed by text entry' },
        // { key: 3, value: 'mixed multiple choice and text entry' },
    ];

    const branches = quickFireAPI.getBranches(items);

    renderTemplate({ quickFire, options, branches }, template.content, parent);

    const counters = document.querySelectorAll('.js-quick-fire-count');
    const branchCounters = document.querySelectorAll('.js-quick-fire-branches label > span');
    const taxonCounters = document.querySelectorAll('.js-quick-fire-taxa li > span');

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

    const getFilterTaxa = () => quickFire.filter.iconicTaxa;

    const taxa = document.querySelectorAll('.js-quick-fire-taxa li');

          taxa.forEach(taxon => {

              const chkBox = taxon.querySelector('input');

              if(!R.contains(taxon.dataset.name, quickFire.filter.iconicTaxa)) {
                  chkBox.click();
              }

              taxon.addEventListener('change', async e => {
                const selectedTaxon = e.target.id;
                const updatedTaxa = updateArray(getFilterTaxa(getIncludeTechnicalTerms), selectedTaxon);
                quickFire.filter.iconicTaxa = updatedTaxa;
                quickFire.items = quickFireAPI.getItems(updatedTaxa);
                quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());
              });
          });

    let includeTechnicalTerms = false;

    const getIncludeTechnicalTerms = () => includeTechnicalTerms;
      
    quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());

    const createQuickFireBtn = document.querySelector('.js-create-quick-fire');
          createQuickFireBtn.innerHTML = quickFire.score.total === 0 ? 'Start quick-fire review' : 'Continue your quick-fire review';
          createQuickFireBtn.addEventListener('click', e => {      
            questions(quickFire);
          });

    const quickFireOptions = document.querySelectorAll('.js-quick-fire-filter-options .btn');
    
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
            quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());
        });
        });
    });

    const technical = document.querySelector('.js-quick-fire-technical');
          technical.addEventListener('change', async e => {
            includeTechnicalTerms = e.target.checked;
            quickFire.items = await quickFireAPI.getItems(quickFire.filter.iconicTaxa, includeTechnicalTerms);
            quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());
          });

    const reset = document.querySelector('.js-quick-fire-reset');
          reset.addEventListener('change', e => {
              if(e.target.checked) {
                actions.boundCreateQuickFire(quickFireAPI.getQuickFire(store.getState().glossary, enums.quickFireType.DEFINITION, {}));
                quickFireFilters(quickFire.linkFromLesson);
              }
          });
};

const questions = quickFire => {

    if(!quickFire) return;

    actions.boundCreateQuickFire(quickFire);

    headers(enums.quickFireStep.QUESTIONS, quickFire);

    const { template, modal, parent } = quickFireUI.readyTemplate(templateQuestionQuickFire);

    let timer;    

    if(quickFire.items.length > 0) {

        let answers = quickFireLogic.selectAnswers(quickFire, utils.shuffleArray(quickFire.items));

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
                    quickFireUI.scoreMultipleChoice(quickFire, answer);
                    continueQuickFireBtn.disabled = false;
                    if(quickFire.score.isIncorrect) {
                        option.classList.add('snap-alert');
                    }
                    options.forEach(option => {
                        if(option.id === quickFire.question.term) {
                            option.classList.add('snap-success');
                        }
                    });
                    continueQuickFireBtn.disabled = false;
                    timer = setTimeout(() => {
                        continueQuickFireBtn.click();
                    }, store.getState().config.callbackTime);
                });
              });

        const quickFireInputContainer = modal.querySelector('.js-quick-fire-text-entry');
        const quickFireInput = modal.querySelector('.js-quick-fire-text-entry input');
        
        if(quickFire.filter.option.key === '1') {
            quickFireInputContainer.classList.remove('hide-important');
            quickFireInput.focus();
        }
        
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
              timer = quickFireUI.scoreTextEntry(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
              continueQuickFireBtn.disabled = false;
            }
        });

        quickFireInput.addEventListener('keypress', event => {
            if (event.keyCode == 13) {
              timer = quickFireUI.scoreTextEntry(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
              continueQuickFireBtn.disabled = false;
            }            
        });

        if((quickFire.question.term.split(' ').length > 1 || quickFire.question.term.indexOf('(') === 0) && quickFire.filter.option.key === '1') {
            const hint = modal.querySelector('.js-quick-fire-hint');
                  hint.classList.remove('hide');
        }

    } else {
        summary(quickFire);        
    }
    
    const review = modal.querySelector('.js-quick-review-progress');
    if(review) {
          review.addEventListener('click', e => {
            summary(quickFire);
          });
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

const quickFireFilters = linkFromLesson => {
    quickFire.filters(linkFromLesson);
};

const summary = quickFire => {

    const { template, modal, parent } = quickFireUI.readyTemplate(templateSummaryQuickFire);

    const passes = quickFire.score.passes;
          passes.forEach((pass, i) => {
            pass.index = i,
            pass.wiki = pass.wiki || ''
          });
    const fails = quickFire.score.fails;
          fails.forEach((fail, i) => {
            fail.index = i,
            fail.wiki = fail.wiki || ''
          });

    renderTemplate({ score: quickFire.score, passes, fails }, template.content, parent);

    const answers = modal.querySelectorAll('.js-quick-review-answers');
    const tabs = modal.querySelectorAll('.js-quick-review-tabs a');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', e => {
            const type = e.target.id;
            answers.forEach(t => {
                t.dataset.type === type
                    ? t.classList.remove('hide-important')
                    : t.classList.add('hide-important');
            });
        });
    });

    const summaryText = modal.querySelector('.js-quick-fire-summary div:nth-child(1) > span');
   
    summaryText.innerText = quickFire.items.length > 0 
        ? `You have answered ${quickFire.score.total} of ${quickFire.items.length} questions.`
        : 'You have answered all of the questions.';

    const continueReview = modal.querySelector('.js-quick-review-continue-review');
          continueReview.addEventListener('click', e => {
              questions(quickFire);
          });
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

