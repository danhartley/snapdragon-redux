import { clone } from 'ramda';

import { renderTemplate } from 'ui/helpers/templating';
import { store } from 'redux/store';
import { getTraitsForTests } from 'api/traits/traits-for-tests';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';
import { renderTraitCardTest } from 'ui/screens/cards/trait-card-test';

import summaryTemplate from 'ui/screens/cards/trait-card-summary-template.html';

export const getBonusQuestion = (item, alreadyTestedTraits) => {

    const enums = store.getState().enums;

    let bonus = getTraitsForTests(enums, item, alreadyTestedTraits);

    return bonus;
};

export const renderTraitCard = item => {

    const traitIterator = (function() {
 
        const alreadyTestedTraits = [];

        const collection = clone(store.getState().collection);

        const guid = new Date().getTime();

        return {

            getTestTraits: function () {
                return alreadyTestedTraits;
            },

            getNextTrait: function() {
            
                const bonus = getBonusQuestion(item, this.getTestTraits());
    
                if(Object.keys(bonus).length === 0) {
    
                    const scores = store.getState().score;
                    const score = scores.bonusScores ? scores.bonusScores.filter(s => s.id === item.id && s.guid === guid) : [];
                    const total = score.length;
                    const correct = score.filter(s => s.success).length;
    
                    const template = document.createElement('template');
                          template.innerHTML = summaryTemplate;
                
                    const parent = document.querySelector('.js-test-card-content');
                          parent.innerHTML = '';
                    
                    const context = { correct, total, name: item.vernacularName || item.name };
                    
                    renderTemplate(context, template.content, parent);
    
                    document.querySelector('.js-try-again').addEventListener('click', () => {
                        renderTraitCard(item);
                    }); 
    
                    document.querySelector('.js-test-card-content').classList.add('trait-line');            
                    document.querySelector('.js-question-question').innerHTML = 'Section complete';
                    document.querySelector('.js-question-help').innerHTML = '(Bonus questions.)';
                    document.querySelector('.js-txt-question').classList.add('hide-important');
                    document.querySelector('.js-continue-lesson-btn').classList.add('hide-important');
    
                    return;
                } else {

                    let numberOfQuestions = Object.keys(bonus.typedItemTraits).length;
                        numberOfQuestions = (numberOfQuestions - alreadyTestedTraits.length);
                        numberOfQuestions = numberOfQuestions === 0 ? '' : numberOfQuestions;
                                    
                    bonus.screen = { name: 'trait-property'};
                    bonus.overrides.binomial = 'TRAITS & ECOLOGY';
                    bonus.type = 'trait';
                    bonus.guid = guid;
                    bonus.callback = score => {
                        this.getNextTrait();
                    };
        
                    alreadyTestedTraits.push(bonus.overrides.trait.key);

                    setTimeout(() => {
                        document.querySelector('.js-traits-count-badge').innerHTML = numberOfQuestions;
                    });

                    renderMultiStrips(collection, bonus);                                 

                    const returnLink = document.querySelector('.js-traits-link');
                    const returnTxt = returnLink.querySelector('span:nth-child(1)');
                          returnTxt.innerHTML = 'Main';
                
                    const returnTxt2 = returnLink.querySelector('span:nth-child(2)');
                          returnTxt2.innerHTML = 'lesson';
                }
            },

            getTraitTestCard: function () {
                renderTraitCardTest(item);
            }
        }
    })();

   traitIterator.getTraitTestCard(item);

};