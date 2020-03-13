import * as R from 'ramda';

import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { firestore } from 'api/firebase/firestore';
import { iconicTaxa  } from 'api/snapdragon/iconic-taxa';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';
import { renderGlossary } from 'ui/fixtures/glossary';

import templateCreateQuickFire from 'ui/quick-fire-modal/quick-fire-create-template.html';
import templateQuestionQuickFire from 'ui/quick-fire-modal/quick-fire-question-template.html';
import templateSummaryQuickFire from 'ui/quick-fire-modal/quick-fire-summary-template.html';

let allItems = null;

const headers = screen => {

    const glossaryLink = document.querySelector('.js-modal-text-title');
    const quickFireLink = document.querySelector('.js-quick-fire-review');
    const quickFireFilters = document.querySelector('.js-quick-fire-filters');

    switch(screen) {
        case 'REVIEW':
            quickFireFilters.classList.add('hide-important');
            glossaryLink.classList.add('underline-link');
        break;
        
        case 'CREATE':
            quickFireLink.classList.remove('hide-important');
            quickFireLink.classList.remove('underline-link');
            quickFireFilters.classList.add('hide-important');
            glossaryLink.addEventListener('click', e => {
                renderGlossary({ definitions: quickFire.items });
                glossaryLink.classList.remove('underline-link');
            });
            subscription.remove(subscription.getByName('question'));
        break;

        case 'QUESTION': 
            quickFireLink.classList.add('hide-important');
            quickFireFilters.classList.remove('hide-important');
            glossaryLink.addEventListener('click', e => {
                renderGlossary({ definitions: quickFire.items });
                glossaryLink.classList.remove('underline-link');
            });
        break;
    }
};

const review = async () => {

    quickFire.headers('REVIEW');

    const args = await init();

    create(args);

};

const create = async args => {

    headers('CREATE');

    const template = document.createElement('template');
          template.innerHTML = templateCreateQuickFire;

    const parent = document.querySelector('.snapdragon-container');
          parent.innerHTML = '';

    args = args || await init();

    let { items, type, filter } = args;

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

    quickFire.filter.taxa = filter.iconicTaxa.map(taxon => {
        const iconicTaxon = {
            name: taxon,
            count: items.filter(item => item.taxon === taxon).length
        }
        return iconicTaxon;
    });

    quickFire.filter.taxa = quickFire.filter.taxa.filter(taxon => taxon.count > 0);

    const options = [
        { key: 0, value: 'multiple choice' },
        { key: 1, value: 'text entry' },
        // { key: 2, value: 'multiple choice followed by text entry' },
        // { key: 3, value: 'mixed multiple choice and text entry' },
    ];

    const branches = initBranches(items);

    renderTemplate({ quickFire, options, branches }, template.content, parent);

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

    const taxa = document.querySelectorAll('.js-quick-fire-taxa li');
          taxa.forEach(taxon => {
              taxon.addEventListener('change', async e => {
                const selectedTaxon = e.target.id;
                const updatedTaxa = updateArray(filter.iconicTaxa, selectedTaxon);
                quickFire.filter.iconicTaxa = updatedTaxa;
                quickFire.items = await getItems(updatedTaxa);
                updateTotalCounts(quickFire, input);
              });
          });

    const createQuickFireBtn = document.querySelector('.js-create-quick-fire');
          createQuickFireBtn.addEventListener('click', e => {
            subscription.add(question, 'quickFire', 'modal');
            question(quickFire);
          });

    const quickFireOptions = document.querySelectorAll('.js-quick-fire-options .btn');          
          Array.from(quickFireOptions).forEach(option => {
              option.addEventListener('click', e => {
                  quickFire.filter.option = {
                      key: e.target.dataset.key,
                      value: e.target.dataset.value
                  };
              });
          });
        quickFireOptions[0].click();

    const branchOptions = document.querySelectorAll('.js-quick-fire-branches label');
          branchOptions.forEach(branch => {
              branch.addEventListener('click', e => {
                setTimeout(async() => {
                    let checkedBranches = Array.from(branchOptions).filter(b => elem.hasClass(b, 'active'));
                        checkedBranches = checkedBranches.map(b => b.dataset.key);
                    quickFire.items = await getItems(quickFire.filter.iconicTaxa);
                    quickFire.items = quickFire.items.filter(item => R.contains(item.branch, checkedBranches));
                    updateTotalCounts(quickFire, input);
                });
              });
          });

    const technical = document.querySelector('.js-quick-fire-technical');
          technical.addEventListener('change', async e => {
            const isSelected = e.target.checked;
            quickFire.items = await getItems(quickFire.filter.iconicTaxa, isSelected);
            updateTotalCounts(quickFire, input);
          });
};

const question = (state = quickFire) => {

    const quickFire = R.clone(state);

    if(!quickFire) return;

    headers('QUESTION');

    const parent = document.querySelector('.snapdragon-container');          
          parent.innerHTML = '';

    const template = document.createElement('template');

    let timer;

    if(quickFire.items.length > 0) {        

        template.innerHTML = templateQuestionQuickFire;
        
        const items = R.take(quickFire.poolSize, utils.shuffleArray(quickFire.items));

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
              });

        quickFireInput.addEventListener('keydown', event => {
            if (event.keyCode == 9) {
              timer = handleKeyAction(event, quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
            }
        });

        quickFireInput.addEventListener('keypress', event => {
            if (event.keyCode == 13) {
              timer = handleKeyAction(event, quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn);
            }
        });

    } else {
        template.innerHTML = templateSummaryQuickFire;        
        renderTemplate({ correct: quickFire.score.correct, answered: quickFire.score.total }, template.content, parent);
    }
};

export const quickFire = {
    review,
    create,
    question,
    headers
};

const handleKeyAction = (event, quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn) => {    
    if (quickFire.filter.option.key === '1') {
        const isCorrect = quickFireInput.value.toLowerCase() === quickFire.question.term.toLowerCase();
        quickFire.score.total++;
        if (isCorrect) {
            quickFire.score.correct++;
        }
        else {
            quickFire.score.incorrect++;
        }
        quickFireMessage.innerHTML = isCorrect
            ? 'That is correct.'
            : `That is incorrect. The correct answer is <span class="uppercase half-margin-left">'${quickFire.question.term.toLowerCase()}'</span>.`;
        timer = setTimeout(() => {
            continueQuickFireBtn.click();
        }, 2000);
    }
    return timer;
};

const init = async () => {
    let taxa = [];
    let iconicTaxaKeys = Object.keys(iconicTaxa).map(key => key.toLowerCase());
    iconicTaxaKeys.push('common');
    iconicTaxaKeys.forEach(taxon => {
        taxa.push(taxon);
    });
    const items = await getItems(taxa);
    const args = {
        items,
        type: enums.quickFireType.DEFINITION,
        filter: {
            iconicTaxa: taxa
        }
    };
    return args;
};

const getItems = async (taxa, isSelected = false) => {
    
    const glossary = store.getState().glossary;

    allItems = allItems || !!glossary
                ? glossary.filter(definition => R.contains(definition.taxon, taxa))
                : await firestore.getDefinitionsByTaxa(taxa);

    let selectedItems = [];
    isSelected
        ? selectedItems = allItems
        : selectedItems= allItems.filter(item => item.technical !== 'true');

    return selectedItems.filter(item => R.contains(item.taxon, taxa));
};

const updateTotalCounts = (quickFire, input) => {

    quickFire.count = quickFire.items.length;
    document.querySelectorAll('.js-quick-fire-count').forEach(counter => {
        counter.innerHTML = quickFire.count;
    });
    input.value = quickFire.count;
    quickFire.poolSize = parseInt(input.value);

    updateBranchCounts(quickFire.items);
};

const initBranches = items => {
    let branches = [ ...new Set(items.map(item => item.branch)) ];
        branches = branches.map(branch => {
            return {
                name: branch,
                count: items.filter(item => item.branch == branch).length
            }
          });
    return branches;
};

const updateBranchCounts = items => {

    const branchOptions = document.querySelectorAll('.js-quick-fire-branches label > span');
          branchOptions.forEach(branchBadge => {
            branchBadge.innerHTML = items.filter(item => item.branch === branchBadge.dataset.name).length;
          });
};