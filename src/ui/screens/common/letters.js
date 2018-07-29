import * as R from 'ramda';
import { utils } from 'utils/utils';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';
import lettersTemplate from 'ui/screens/common/letters-template.html';

export const renderLetters = (letters, item, callbackTime) => {

    const { lessonPlan, config } = store.getState();

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = lettersTemplate;

    const name = itemProperties.vernacularName(item, config);

    const blocks = utils.shuffleArray(R.flatten(letters));

    renderTemplate({ blocks, name }, template.content, parent);

    let selectedBlocks = [];
    let itemName = '';

    const tryAgainBtn = document.querySelector('.js-letters .js-try-again');
    const continueBtn = document.querySelector('.js-letters .js-continue');

    document.querySelectorAll('.block').forEach(block => {
        
        block.addEventListener('click', event => {

            let block = event.target;
        
            if(block.classList.contains('snap-inactive')) {
                block.classList.remove('snap-inactive');
                selectedBlocks = selectedBlocks.filter(selectedBlock => selectedBlock !== block);
                itemName = itemName.replace(block.innerHTML, '');
            }
            else {
                selectedBlocks.push(block);
                block.classList.add('snap-inactive');
                itemName += block.innerHTML;
                if(item.name.replace(' ', '') === itemName) {
                    selectedBlocks.forEach(block => {
                        block.classList.remove('snap-inactive');
                        block.classList.add('snap-success');
                    });
                    selectedBlocks = [];
                    const question = { binomial: item.name, taxon: 'name', question: item['name'] };
                    const answer = item.name;
                    const success = itemName === item.name.replace(' ', '');
                    const response = { ...question, answer, success };
                    const { text, colour, correct } = renderAnswerHeader(response);
                    DOM.rightHeaderTxt.innerHTML = text;
                    DOM.rightHeader.classList.add(colour);
                    response.questionCount = lessonPlan.layouts.filter(l => l.name === 'test').length;
                    response.layoutCount = lessonPlan.layouts.length;
                    setTimeout(()=>{
                        actions.boundUpdateScore(response);
                    }, callbackTime);
                } else if(itemName.length >= item.name.length) {
                    selectedBlocks.forEach(block => {
                        block.classList.remove('snap-inactive');
                        block.classList.add('snap-alert');
                        tryAgainBtn.attributes.removeNamedItem('disabled');
                    });
                    selectedBlocks = [];
                }
            }
                                                      
        });
    });


    tryAgainBtn.addEventListener('click', event => {
        itemName = '';
        selectedBlocks.forEach(block => {
            block.classList.remove('snap-alert');       
            block.classList.remove('snap-inactive');       
        });
    });

    continueBtn.addEventListener('click', event => {
        const question = { binomial: item.name, taxon: 'name', question: item['name'] };
        const answer = '';
        const success = false;
        const response = { ...question, answer, success };
        const { text, colour, correct } = renderAnswerHeader(response);
        DOM.rightHeaderTxt.innerHTML = text;
        DOM.rightHeader.classList.add(colour);
        response.questionCount = lessonPlan.questionCount;
        response.layoutCount = lessonPlan.layoutCount;
        setTimeout(()=>{
            actions.boundUpdateScore(response);
        }, callbackTime);
    });
};