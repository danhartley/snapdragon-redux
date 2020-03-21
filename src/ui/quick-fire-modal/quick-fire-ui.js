import * as R from 'ramda';

import { enums } from 'ui/helpers/enum-helper';
import { renderGlossary } from 'ui/fixtures/glossary';

const updateBranchCounts = (items, branchOptions) => {

    branchOptions.forEach(branchBadge => {
    branchBadge.innerHTML = items.filter(item => item.branch === branchBadge.dataset.name).length;
    });

};

const updateTotalCounts = (quickFire, input, counters, branchCounters) => {

    quickFire.count = quickFire.score.total > 0 ? quickFire.count : quickFire.items.length;

    counters.forEach(counter => {
        counter.innerHTML = quickFire.count;
    });
    
    input.value = quickFire.count;
    quickFire.poolSize = parseInt(input.value);

    updateBranchCounts(quickFire.items, branchCounters);
};

const scoreTest = (quickFire, quickFireInput, quickFireMessage, timer, continueQuickFireBtn) => {

    if (quickFire.filter.option.key === '1') {

        const acceptableAnswers = quickFire.question.term.split(',').map(answer => answer.toLowerCase());
        const isCorrect = R.contains(quickFireInput.value.toLowerCase(), acceptableAnswers);
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

const updateHeaders = (screen, links, getQuickFire, linkFromLesson = false) => {

    const { glossary, filters, questions } = links;

    const underline = 'underline-link';
    const hide = 'hide-important';

    const loadGlossary = e => {
        renderGlossary(getQuickFire().items);
        if(linkFromLesson) {
            questions.classList.remove(hide);
            filters.classList.add(hide);
        } else {
            glossary.classList.remove(underline);
            filters.classList.remove(hide);
            filters.classList.add(underline);
        }
    };
    
    glossary.removeEventListener('click', loadGlossary);
    
    switch(screen) {
        
        case enums.quickFireStep.FILTERS:
            filters.classList.add(hide);
            glossary.classList.remove(hide);
            glossary.classList.add(underline);
            glossary.addEventListener('click', loadGlossary);            
            break;
            
            case enums.quickFireStep.QUESTIONS:
                if(linkFromLesson) {
                    glossary.classList.remove(hide);
                    glossary.classList.add(underline);
                    filters.classList.add(hide);
                    questions.classList.add(hide);
                }
                else {
                    filters.classList.add(underline);
                    filters.classList.remove(hide);
            }
            glossary.addEventListener('click', loadGlossary);
        break;
    }
};

export const quickFireUI = {

    updateTotalCounts,
    updateHeaders,
    scoreTest

};