import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { firestore } from 'api/firebase/firestore';
import { iconicTaxa  } from 'api/snapdragon/iconic-taxa';
import { enums } from 'ui/helpers/enum-helper';
import { renderTemplate } from 'ui/helpers/templating';

import templateCreateQuickFire from 'ui/quick-fire-modal/quick-fire-create-template.html';
import templateQuestionQuickFire from 'ui/quick-fire-modal/quick-fire-question-template.html';

const review = async modal => {

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
          parent.innerHTML = ''

    renderTemplate({ }, template.content, parent);

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

    const createQuickFireBtn = document.querySelector('.js-create-quick-fire');
          createQuickFireBtn.addEventListener('click', e => {

            subscription.add(question, 'quickFire', 'modal');
          });
    
};

const question = quickFire => {

    const template = document.createElement('template');
          template.innerHTML = templateQuestionQuickFire;

    const parent = document.querySelector('.snapdragon-container');
          parent.innerHTML = '';

    renderTemplate({ }, template.content, parent);

};

export const quickFire = {
    review,
    create,
    question
};