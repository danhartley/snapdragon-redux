import * as R from 'ramda';

import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';

const renderResponse = (isCorrect, term) => {
    return isCorrect
    ? `<span class="centred-block icon"><i class="fas fa-check extra-large-text correct-answer-color margin-right"></i>That is correct.</span>`
    : `<span class="centred-block icon"><i class="fas fa-times extra-large-text incorrect-answer-color margin-right"></i>The correct answer is <span class="answer-response half-margin-left">'${term}'.</span></span>`;

};

const updateBranchCounts = (quickFire, branchOptions) => {

    const items = quickFire.terms ? quickFire.items.filter(item => R.contains(item.id, quickFire.terms)) : quickFire.items;

    branchOptions.forEach(branchBadge => {
    branchBadge.innerHTML = items.filter(item => item.branch === branchBadge.dataset.name).length;
    });
};

const updateTaxonCounters = (quickFire, taxonCounters, includeTechnicalTerms) => {

    const items = quickFire.terms ? quickFire.items.filter(item => R.contains(item.id, quickFire.terms)) : quickFire.items;

    taxonCounters.forEach(taxonBadge => {
        taxonBadge.innerHTML = includeTechnicalTerms
            ? items.filter(item => item.taxon === taxonBadge.dataset.taxon).length
            : items.filter(item => item.taxon === taxonBadge.dataset.taxon && !item.technical).length;
    });

    return includeTechnicalTerms
        ? items
        : items.filter(item => !item.technical);
};

const updateTotalCounts = (quickFire, input, counters, branchCounters, taxonCounters, includeTechnicalTerms = false) => {

    updateBranchCounts(quickFire, branchCounters);
    const terms = updateTaxonCounters(quickFire, taxonCounters, includeTechnicalTerms);

    quickFire.count = terms.length;

    counters.forEach(counter => {
        counter.innerHTML = quickFire.count;
    });
    
    input.value = quickFire.count;
    quickFire.poolSize = parseInt(input.value);
};

const scoreMultipleChoice = (quickFire, answer, quickFireMessage) => {

    const isCorrect = answer === quickFire.question.term;

    quickFire.question.answer = answer;
        
    quickFire.termScore.total++;

    if(isCorrect) {
        quickFire.termScore.correct++;
        quickFire.termScore.isCorrect = true;
        quickFire.termScore.isIncorrect = false;
        quickFire.termScore.passes.push(quickFire.question);
    } else {
        quickFire.termScore.incorrect++;
        quickFire.termScore.isCorrect = false;
        quickFire.termScore.isIncorrect = true;
        quickFire.termScore.fails.push(quickFire.question);
    }

    quickFireMessage.innerHTML = renderResponse(isCorrect, quickFire.question.term.toLowerCase());
};

const scoreTextEntry = (quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn) => {

    if (quickFire.filter.option.key === '1') {

        const brackets = /\(.+?\)/;

        const term = quickFire.question.term;

        const acceptableAnswers = term.split(',').map(answer => {
            
            let acceptable = answer;
                acceptable = acceptable.replace(brackets, '');
                acceptable = acceptable.trim();
                acceptable = acceptable.toLowerCase();

            return acceptable;
        });
        
        const isCorrect = R.contains(quickFireInput.value.trim().toLowerCase(), acceptableAnswers);
        
        quickFire.termScore.total++;
        
        if (isCorrect) {
            quickFire.termScore.correct++;
            quickFire.termScore.passes.push(quickFire.question);
        }
        else {
            quickFire.termScore.incorrect++;
            quickFire.termScore.fails.push(quickFire.question);
        }
        
        quickFireMessage.innerHTML = renderResponse(isCorrect, quickFire.question.term.toLowerCase());
        // quickFireMessage.innerHTML = isCorrect
        //     ? `<span class="centred-block icon"><i class="fas fa-check extra-large-text correct-answer-color margin-right"></i>That is correct.</span>`
        //     : `<span class="centred-block icon"><i class="fas fa-times extra-large-text incorrect-answer-color margin-right"></i>The correct answer is <span class="answer-response half-margin-left">'${quickFire.question.term.toLowerCase()}'.</span></span>`;

        timer = setTimeout(() => {
            continueQuickFireBtn.click();
        }, store.getState().config.callbackTime + 500);
    }

    return timer;
};

const readyTemplate = headerTemplate => {

    const template = document.createElement('template');
          template.innerHTML = headerTemplate;

    const modal = document.querySelector('#glossaryModal');

    const parent = modal.querySelector('.js-modal-text');
          parent.innerHTML = '';   

    return { template, modal, parent };
};

const updateHeaders = (screen, links, getQuickFire, quickFireActions) => {

    const { glossary, filters, questions } = links;

    const underline = 'underline-link';
    const hide = 'hide-important';

    const quickFire = getQuickFire();

    const loadGlossary = e => {
        quickFireActions.quickFireGlossary(quickFire.items);
        if(quickFire.linkFromLesson) {
            questions.classList.remove(hide);
            filters.classList.add(hide);
        } else {
            glossary.classList.remove(underline);
            filters.classList.remove(hide);
            filters.classList.add(underline);
        }
    };

    const loadFilters = e => {
        quickFireActions.quickFireFilters(quickFire.linkFromLesson);
    };

    const handleGlossaryLink = () => {

        quickFire.onClickGlossaryLinkListeners = quickFire.onClickGlossaryLinkListeners || [];

        if(quickFire.onClickGlossaryLinkListeners.length < 1) {
            glossary.addEventListener('click', loadGlossary, { once: true });
            quickFire.onClickGlossaryLinkListeners.push('filters');
        }
    };

    const handleFiltersLink = () => {

        quickFire.onClickFiltersLinkListeners = quickFire.onClickFiltersLinkListeners || [];

        if(quickFire.onClickFiltersLinkListeners.length < 1) {
            filters.addEventListener('click', loadFilters, { once: true }, true);
            quickFire.onClickFiltersLinkListeners.push('filters');
        }
    };
    
    switch(screen) {        
        case enums.quickFireStep.FILTERS:
            filters.classList.add(hide);
            glossary.classList.remove(hide);
            glossary.classList.add(underline);
            handleGlossaryLink();
        break;
            
        case enums.quickFireStep.QUESTIONS:
            filters.classList.add(underline);
            filters.classList.remove(hide);
            filters.innerHTML = 'Vocab options';
            handleGlossaryLink();
            handleFiltersLink();
        break;

        case enums.quickFireStep.GLOSSARY:
            filters.classList.add(underline);
            filters.classList.remove(hide);
            filters.innerHTML = 'Vocab options';
            questions.classList.add(hide);
            handleFiltersLink();
        break;
    }
};

export const quickFireUI = {
    updateTotalCounts,
    updateHeaders,
    scoreMultipleChoice,
    scoreTextEntry,
    readyTemplate
};