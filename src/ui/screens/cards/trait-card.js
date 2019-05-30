import * as R from 'ramda';

import { renderTemplate } from 'ui/helpers/templating';
import { store } from 'redux/store';
import { getTypedTraitsForSpecies } from 'api/traits/species-typed-traits';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';
import { iconicTaxa, matchTaxon } from 'api/snapdragon/iconic-taxa';
import { returnTaxonIcon } from 'ui/helpers/icon-handler';

import summaryTemplate from 'ui/screens/cards/trait-card-summary-template.html';

export const getBonusQuestion = (item, alreadyAskedQuestions) => {

    const enums = store.getState().enums;

    let bonus = null;

    while (true) {
        
        bonus = getTypedTraitsForSpecies(enums, item);

        if(bonus.overrides) {
            if (!R.contains(bonus.overrides.trait.type, alreadyAskedQuestions) || alreadyAskedQuestions.length === bonus.typedItemTraits.length) {            
                break;
            } 
        } else {
            bonus.typedItemTraits = [];
            break;
        }
    }

    return { bonus };
};

export const renderTraitCard = item => {

    const alreadyAskedQuestions = [];

    const collection = R.clone(store.getState().collection);
    
    const guid = new Date().getTime();

    const getNextTrait = () => {
        
        const { bonus } = getBonusQuestion(item, alreadyAskedQuestions);

        let numberOfQuestions = bonus.typedItemTraits.length === 0 ? '' : bonus.typedItemTraits.length;
            numberOfQuestions = (numberOfQuestions - alreadyAskedQuestions.length);
            numberOfQuestions = numberOfQuestions === 0 ? '' : numberOfQuestions;

        setTimeout(() => {
            document.querySelector('.js-traits-count-badge').innerHTML = numberOfQuestions;
        });

        if(alreadyAskedQuestions.length === bonus.typedItemTraits.length) {

            const scores = store.getState().score;
            const score = scores.bonusScores.filter(s => s.id === item.id && s.guid === guid) || [];
            const total = score.length;
            const correct = score.filter(s => s.success).length;

            const template = document.createElement('template');

            template.innerHTML = summaryTemplate;
        
            const parent = document.querySelector('.js-test-card-content');
            parent.innerHTML = '';
            
            const context = { correct, total, name: item.vernacularName || item.name };
            
            renderTemplate(context, template.content, parent);
            
            // const iconicTaxon = matchTaxon(item.taxonomy, iconicTaxa).value;
            // const icon = returnTaxonIcon(iconicTaxon);

            // document.querySelector('.js-trait-icon').innerHTML = icon;

            document.querySelector('.js-try-again').addEventListener('click', () => {
                renderTraitCard(item);
            });

            document.querySelector('.js-test-card-content').classList.add('trait-line');            
            document.querySelector('.js-question-question').innerHTML = 'Section complete';
            document.querySelector('.js-question-help').innerHTML = '(Bonus questions.)';
            document.querySelector('.js-txt-question').classList.add('hide-important');
            document.querySelector('.js-continue-lesson-btn').classList.add('hide-important');

            return;
        }
        
        bonus.screen = { name: 'trait-property'};
        bonus.overrides.binomial = 'TRAITS & ECOLOGY';
        bonus.type = 'trait';
        bonus.guid = guid;
        bonus.callback = score => {
            getNextTrait();
        };

        alreadyAskedQuestions.push(bonus.overrides.trait.type);

        renderMultiStrips(collection, bonus);

        const returnLink = document.querySelector('.js-traits-icon');
        const returnTxt = returnLink.querySelector('span:nth-child(1)');
              returnTxt.innerHTML = 'Main';
    
        const returnTxt2 = returnLink.querySelector('span:nth-child(2)');
              returnTxt2.innerHTML = 'lesson';
    };

    getNextTrait();
};