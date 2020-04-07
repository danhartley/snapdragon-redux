import * as R from 'ramda';

import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { renderGlossary } from 'ui/fixtures/glossary';

const updateBranchCounts = (items, branchOptions) => {

    branchOptions.forEach(branchBadge => {
    branchBadge.innerHTML = items.filter(item => item.branch === branchBadge.dataset.name).length;
    });
};

const updateTaxonCounters = (items, taxonCounters, includeTechnicalTerms) => {

    taxonCounters.forEach(taxonBadge => {
        taxonBadge.innerHTML = includeTechnicalTerms
            ? items.filter(item => item.taxon === taxonBadge.dataset.taxon).length
            : items.filter(item => item.taxon === taxonBadge.dataset.taxon && !item.technical).length;
    });
};

const updateTotalCounts = (quickFire, input, counters, branchCounters, taxonCounters, includeTechnicalTerms = false) => {

    quickFire.count = quickFire.score.total > 0 ? quickFire.count : quickFire.items.length;

    counters.forEach(counter => {
        counter.innerHTML = quickFire.count;
    });
    
    input.value = quickFire.count;
    quickFire.poolSize = parseInt(input.value);

    updateBranchCounts(quickFire.items, branchCounters);
    updateTaxonCounters(quickFire.items, taxonCounters, includeTechnicalTerms);
};

const scoreMultipleChoice = (quickFire, answer) => {

    const isCorrect = answer === quickFire.question.term;
    
    quickFire.score.total++;

    if(isCorrect) {
        quickFire.score.correct++;
        quickFire.score.isCorrect = true;
        quickFire.score.isIncorrect = false;
        quickFire.score.passes.push(quickFire.question);
    } else {
        quickFire.score.incorrect++;
        quickFire.score.isCorrect = false;
        quickFire.score.isIncorrect = true;
        quickFire.score.fails.push(quickFire.question);
    }
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

            return acceptable
        });
        
        const isCorrect = R.contains(quickFireInput.value.toLowerCase(), acceptableAnswers);
        
        quickFire.score.total++;
        
        if (isCorrect) {
            quickFire.score.correct++;
            quickFire.score.passes.push(quickFire.question);
        }
        else {
            quickFire.score.incorrect++;
            quickFire.score.fails.push(quickFire.question);
        }
        
        quickFireMessage.innerHTML = isCorrect
            ? 'That is correct.'
            : `That is incorrect. The correct answer is <span class="uppercase half-margin-left">'${quickFire.question.term.toLowerCase()}'</span>.`;

        timer = setTimeout(() => {
            continueQuickFireBtn.click();
        }, store.getState().config.callbackTime + 500);
    }

    return timer;
};

const initGlossaryHeader = link => {
    link.classList.remove('hide-important');
    link.innerHTML = 'Glossary test';
};

const readyTemplate = headerTemplate => {

    const template = document.createElement('template');
          template.innerHTML = headerTemplate;

    const modal = document.querySelector('#glossaryModal');
    const parent = modal.querySelector('.js-modal-text');
          parent.innerHTML = '';

    return { template, modal, parent };
};

const updateHeaders = (screen, links, getQuickFire) => {

    const { glossary, filters, questions } = links;

    const underline = 'underline-link';
    const hide = 'hide-important';

    const quickFire = getQuickFire();

    const loadGlossary = e => {
        renderGlossary(quickFire.items);
        if(quickFire.linkFromLesson) {
            questions.classList.remove(hide);
            filters.classList.add(hide);
        } else {
            glossary.classList.remove(underline);
            filters.classList.remove(hide);
            filters.classList.add(underline);
        }
    };    
    
    switch(screen) {        
        case enums.quickFireStep.FILTERS:
            filters.classList.add(hide);
            glossary.classList.remove(hide);
            glossary.classList.add(underline);
            glossary.addEventListener('click', loadGlossary, { once: true });            
        break;
            
        case enums.quickFireStep.QUESTIONS:
            if(quickFire.linkFromLesson) {
                glossary.classList.remove(hide);
                glossary.classList.add(underline);
                filters.innerHTML = 'Review options';
                questions.classList.add(hide);
            }
            else {
                filters.classList.add(underline);
                filters.classList.remove(hide);
                filters.innerHTML = 'Review options';
            }
            glossary.addEventListener('click', loadGlossary, { once: true });
        break;
    }
};

export const quickFireUI = {
    updateTotalCounts,
    updateHeaders,
    initGlossaryHeader,
    scoreMultipleChoice,
    scoreTextEntry,
    readyTemplate
};