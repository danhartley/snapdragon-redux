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

import glossaryTemplate from 'ui/fixtures/glossary-template.html';
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

    quickFireUI.updateHeaders(step, links, getQuickFire, quickFireActions);
};

const filters = async linkFromLesson => {

    const args = await init();

    const { template, modal, parent } = quickFireUI.readyTemplate(templateCreateQuickFire);

    headers(enums.quickFireStep.FILTERS, { items: args.items, onClickFiltersLinkListeners: [], onClickGlossaryLinkListeners: [] });

    let { items, type, filter } = args;

    const resetQuickFire = () => {
        actions.boundUpdateQuickFire(quickFireAPI.getQuickFire(store.getState().glossary, enums.quickFireType.DEFINITION, {}));
        quickFireFilters(quickFire.linkFromLesson);
    };

    let state = store.getState().quickFire || quickFireAPI.getQuickFire(items, filter, type);
    let quickFire = R.clone(state);
        quickFire = quickFire.isComplete ? resetQuickFire() : quickFire;
        quickFire.linkFromLesson = linkFromLesson || false;
        quickFire.onClickFiltersLinkListeners = [];
        quickFire.onClickGlossaryLinkListeners = [];

    actions.boundUpdateQuickFire(quickFire);

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
          setTimeout(() => {
            input.focus();
          }, 250);

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

    let includeTechnicalTerms = quickFire.lessonId ? true : false;

    const getIncludeTechnicalTerms = () => includeTechnicalTerms;
      
    quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());

    const createQuickFireBtn = document.querySelector('.js-create-quick-fire');
          createQuickFireBtn.innerHTML = quickFire.termScore.total === 0 ? 'Start vocab review' : 'Continue your vocab review';
          createQuickFireBtn.addEventListener('click', e => {
            questions(quickFire);
          }, { once: true });

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
        }, { once: true });
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
            quickFire.filter.includeTechnicalTerms = includeTechnicalTerms;
            quickFire.items = quickFire.items || await quickFireAPI.getItems(quickFire.filter.iconicTaxa, includeTechnicalTerms);
            quickFireUI.updateTotalCounts(quickFire, input, counters, branchCounters, taxonCounters, getIncludeTechnicalTerms());
          });

    if(includeTechnicalTerms) technical.click();

    const reset = document.querySelector('.js-quick-fire-reset');
          reset.addEventListener('click', e => {
            resetQuickFire();
          });
};

const questions = state => {

    let quickFire;

    if(!state) return;
    else quickFire = R.clone(state);

    quickFire.onClickGlossaryLinkListeners = [];

    headers(enums.quickFireStep.QUESTIONS, quickFire);

    const { template, modal, parent } = quickFireUI.readyTemplate(templateQuestionQuickFire);

    let timer;    

    if(quickFire.poolSize > quickFire.termScore.total) {

        let answers = quickFireLogic.selectAnswers(quickFire, utils.shuffleArray(quickFire.items));

        renderTemplate({ question: quickFire.question, 
                answers, total: quickFire.termScore.total + 1, 
                count: quickFire.poolSize,
                correct: quickFire.termScore.correct, 
                answered: quickFire.termScore.total 
        }, template.content, parent);

        const layouts = document.querySelectorAll('.js-quick-layouts');
              layouts.forEach(layout => {
                  layout.classList.add('hide-important');
                  if(layout.id === quickFire.filter.option.key) layout.classList.remove('hide-important');  
              });

        const quickFireMessage = document.querySelector('.js-quick-fire-message');

        const options = Array.from(document.querySelectorAll('.js-quick-fire-options > li'));
              options.forEach(option => {
                option.addEventListener('click', e => {
                    const answer = e.target.id;
                    quickFireUI.scoreMultipleChoice(quickFire, answer, quickFireMessage);
                    continueQuickFireBtn.disabled = false;
                    if(quickFire.termScore.isIncorrect) {
                        option.classList.add('snap-alert');
                    }
                    options.forEach(option => {
                        if(option.id === quickFire.question.term) {
                            option.classList.add('snap-success');
                        }
                    });
                    timer = setTimeout(() => {
                        continueQuickFireBtn.click();
                    }, store.getState().config.callbackTime);
                }, { once: true });
              });

        const quickFireInputContainer = modal.querySelector('.js-quick-fire-text-entry');
        const quickFireInput = modal.querySelector('.js-quick-fire-text-entry input');
        
        if(quickFire.filter.option.key === '1') {
            quickFireInputContainer.classList.remove('hide-important');
            quickFireInput.focus();
        }
        
        const continueQuickFireBtn = document.querySelector('.js-continue-quick-fire-btn');
              continueQuickFireBtn.addEventListener('click', e => {
                    quickFire.items = quickFire.items.filter(item => item.term !== quickFire.question.term);
                    subscription.add(quickFireQuestions, 'quickFire', 'modal');
                    actions.boundUpdateQuickFire(quickFire);
                    clearTimeout(timer);        
              });

        let check = true;

        quickFireInput.addEventListener('keydown', event => {
            if (event.keyCode == 9 && check) {
                check = false;
                timer = quickFireUI.scoreTextEntry(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
                continueQuickFireBtn.disabled = false;
            }
        });

        quickFireInput.addEventListener('keypress', event => {
            if (event.keyCode == 13 && check) {
                check = false;
                timer = quickFireUI.scoreTextEntry(quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
                continueQuickFireBtn.disabled = false;
            }            
        });

        quickFireInput.addEventListener('blur', e => {
            if(check && e.target.value.length > 2) {
                check = false;
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
          }, { once: true });
    }
};

const getTermsGlossary = (glossary, terms) => {

    if(!terms || terms.length === 0) return glossary;

    const definitions = [];

    terms.forEach(term => {
        const definition = glossary.find(def => def.id === term);
        definitions.push(definition);
    });

    return definitions.filter(term => term);
}

const definitions = async terms => {

    const { template, modal, parent } = quickFireUI.readyTemplate(glossaryTemplate);

    const quickFire = store.getState().quickFire || quickFireAPI.getQuickFire(terms, enums.quickFireType.DEFINITION, { collection: {} });

    headers(enums.quickFireStep.GLOSSARY, quickFire);

    parent.innerHTML = '';

    const glossary = getTermsGlossary(terms, quickFire.terms);

    renderTemplate({ glossary }, template.content, parent);
};

const init = async () => {

    let taxa = [];
    let iconicTaxaKeys = Object.keys(iconicTaxa).map(key => key.toLowerCase());
        iconicTaxaKeys.push('common');
        iconicTaxaKeys.forEach(taxon => {
            taxa.push(taxon);
        });

    const { quickFire } = store.getState();

    const items = quickFire.items || await quickFireAPI.getItems(taxa);
        
    const args = {
        items,
        type: enums.quickFireType.DEFINITION,
        filter: {
            iconicTaxa: taxa
        }
    };
    return args;
};

const summary = quickFire => {

    const { template, modal, parent } = quickFireUI.readyTemplate(templateSummaryQuickFire);

    const passes = quickFire.termScore.passes;
          passes.forEach((pass, i) => {
            pass.index = i;
            pass.wiki = pass.wiki || '';
            pass.showWikiClass = pass.wiki.length > 0 ? '' : 'hide-important'
          });
    const fails = quickFire.termScore.fails;
          fails.forEach((fail, i) => {
            fail.index = i;
            fail.wiki = fail.wiki || '';
            fail.showWikiClass = fail.wiki.length > 0 ? '' : 'hide-important';
          });

    renderTemplate({ score: quickFire.termScore, passes, fails }, template.content, parent);

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
    const scoreSummary = modal.querySelector('.js-score-text-summary');
    const continueReview = modal.querySelector('.js-quick-review-continue-review');

    quickFire.isComplete = quickFire.poolSize === quickFire.termScore.total;

    if(quickFire.isComplete) {
        summaryText.innerHTML = '<span class="emphasis">You have answered all of the questions correctly.</span>';
        scoreSummary.classList.add('modal-background-relief-emphasis');
        scoreSummary.innerHTML = `You scored ${quickFire.termScore.correct} out of ${quickFire.termScore.total}.`;        
        if(quickFire.termScore.incorrect > 0) {
            summaryText.innerHTML = `<span class="emphasis">You've answered the questions, but not all correctly.</span>`;
            continueReview.innerHTML = `<span>Continue</span>`;            
            continueReview.addEventListener('click', e => {
                const quickFireRevision = quickFireAPI.getQuickFire(quickFire.termScore.fails, enums.quickFireType.DEFINITION, {});
                quickFireQuestions(quickFireRevision);
            }, { once: true });            
        } else {
            continueReview.classList.add('hide-important');
            continueReview.addEventListener('click', e => {
                questions(quickFire);
            }, { once: true });
        }
    } else {
        summaryText.innerHTML = `<span>You have answered ${quickFire.termScore.total} of ${quickFire.poolSize} questions.</span>`;
        continueReview.addEventListener('click', e => {
            questions(quickFire);
        }, { once: true });
    }
};

export const quickFireHandlers = {
    filters,
    questions,
    headers,
    init: quickFireAPI.getQuickFire,
    definitions
};

const quickFireFilters = linkFromLesson => {
    quickFireHandlers.filters(linkFromLesson);
};

const quickFireQuestions = quickFire => {
    quickFireHandlers.questions(quickFire);
};

const quickFireGlossary = glossary => {
    quickFireHandlers.definitions(glossary);
};

const quickFireActions = {
    quickFireFilters,
    quickFireQuestions,
    quickFireGlossary
};