import * as R from 'ramda';
import { utils } from 'utils/utils';

import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const renderLetters = (config, screen, letters, item, callbackTime) => {

    const template = document.querySelector('.js-letters-template');

    const clone = document.importNode(template.content, true);
    DOM.rightBody.innerHTML = '';

    const blocks = utils.shuffleArray(R.flatten(letters));

    const data = { blocks };
    
    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, data);
    Stamp.appendChildren(DOM.rightBody, expanded);

    let selectedBlocks = [];
    let itemName = '';

    const tryAgainBtn = document.querySelector('.js-letters .js-try-again');
    const continueBtn = document.querySelector('.js-letters .js-continue');

    document.querySelectorAll('.block').forEach(block => {
        
        block.addEventListener('click', event => {

            let block = event.target;
        
            if(block.classList.contains('light-grey')) {
                block.classList.remove('light-grey');
                selectedBlocks = selectedBlocks.filter(selectedBlock => selectedBlock !== block);
                itemName = itemName.replace(block.innerHTML, '');
            }
            else {
                selectedBlocks.push(block);
                block.classList.add('light-grey');
                itemName += block.innerHTML;
                if(item.name.replace(' ', '') === itemName) {
                    selectedBlocks.forEach(block => {
                        block.classList.remove('light-grey');
                        block.classList.add('green');
                    });
                    selectedBlocks = [];
                    const question = { binomial: item.name, taxon: 'name', question: item['name'] };
                    const answer = item.name;
                    const success = itemName === item.name.replace(' ', '');
                    const response = { ...question, answer, success };
                    const { text, colour, correct } = renderAnswerHeader(response);
                    DOM.headerTxt.innerHTML = text;
                    DOM.rightHeader.style.backgroundColor = colour;
                    setTimeout(()=>{
                        actions.boundUpdateScore(response);
                    }, callbackTime);
                } else if(itemName.length >= item.name.length) {
                    selectedBlocks.forEach(block => {
                        block.classList.remove('light-grey');
                        block.classList.add('red');
                        tryAgainBtn.attributes.removeNamedItem('disabled')
                    });
                    selectedBlocks = [];
                }
            }
                                                      
        });
    });


    tryAgainBtn.addEventListener('click', event => {
        itemName = '';
        selectedBlocks.forEach(block => {
            block.classList.remove('red');       
            block.classList.remove('light-grey');       
        });
    });

    continueBtn.addEventListener('click', event => {
        const question = { binomial: item.name, taxon: 'name', question: item['name'] };
        const answer = '';
        const success = false;
        const response = { ...question, answer, success };
        const { text, colour, correct } = renderAnswerHeader(response);
        DOM.headerTxt.innerHTML = text;
        DOM.rightHeader.style.backgroundColor = colour;
        setTimeout(()=>{
            actions.boundUpdateScore(response);
        }, callbackTime);
    });

    DOM.headerTxt.innerHTML = config.isSmallDevice ? screen.headers.short : screen.headers.long;
};