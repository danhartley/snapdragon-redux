import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { scoreHandler, modalBackgroundImagesHandler } from 'ui/helpers/handlers';
import landscapeTemplates from 'ui/screens/text-entry/text-entry-templates.html';
import portraitTemplates from 'ui/screens/text-entry/text-entry-portrait-templates.html';

export const renderInput = (config, screen, question, callbackTime, item, renderHeader, hints) => {

    const { lessonPlan, collection } = store.getState();
    const templates = document.createElement('div');
    templates.innerHTML = config.isPortraitMode ? portraitTemplates : landscapeTemplates;

    const template = templates.querySelector(`.${screen.template}`);

    hints.forEach(hint => {
        const el = template.content.querySelector(hint.selector);
        if(el)
            template.content.querySelector(hint.selector).innerHTML = hint.value;  
    });

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('.js-check-answer').addEventListener('click', event => {
        const score = { question, answer: document.querySelector('.js-txt-input').value, event, layoutCount: lessonPlan.layouts.length };
        scoreHandler('text', score, null, callbackTime, config.isPortraitMode, renderHeader);
    });

    const parent = DOM.rightBody;
    parent.innerHTML = '';
    
    const txtQuestion = `Enter the common name for the species ${item.name}:`;
    renderTemplate({ txtQuestion }, template.content, parent, clone);

    if(config.isPortraitMode) renderPortrait(item);
    else renderLandscape(item, config, collection);

    document.querySelector('.js-txt-input').focus();
};

const renderPortrait = item => {
    const images = utils.shuffleArray(item.images).slice(0,4);

    const backgroundImages = images.map(image => {        
        return `                
                <div style='background-image: url(https://media.eol.org/content/${image}); background-size: cover;' data-toggle="modal" data-target="#imageModal">                                      
                </div>
            `;
        }).join('');

    document.querySelector('.js-species-card-images').innerHTML = backgroundImages;

    modalBackgroundImagesHandler(document.querySelectorAll('.js-species-card-images div'), item);
};

const renderLandscape = (item, config, collection) => {
    
    const pool = (item.name + itemProperties.vernacularName(item, config)).replace(/\s/g,'').toLowerCase();

    //const pool = (R.take(1,utils.shuffleArray(collection.items)).map(item => item.name).join('') + answer).replace(/\s/g,'').toLowerCase();

    let blocks = '';

    utils.shuffleArray(Array.from(pool)).forEach( (letter, index) => {
        blocks += `<span id="${index}" class="block">${letter}</span>`
    });

    blocks += `<span id="${blocks.length}" class="block">&nbsp;</span>`;
    blocks += `<span id="${blocks.length}" class="block">&nbsp;</span>`;
    blocks += `<span id="${blocks.length}" class="block">&nbsp;</span>`;

    document.querySelector('.js-pool-letters').innerHTML = blocks;

    const input = document.querySelector('.js-txt-input');

    const letters = [];

    const deleteLetter = (letter) => {
        let lastLetter = letter || letters[letters.length-1];
        let value = document.querySelector('.js-txt-input').value;
        if(value.length > 0){
            let indexInInput = value.lastIndexOf(lastLetter.innerHTML);            
            let newValue = '';
            let letters = Array.from(value);
            letters.splice(indexInInput,1);
            letters.forEach(letter => newValue += letter);            
            input.value = newValue;
        }
        lastLetter.classList.remove('active');
        letters.forEach(l => {
            if(l.id === lastLetter.id) {
                const letterIndex = letters.indexOf(l);
                if(letterIndex > -1)
                    letters.splice(letterIndex,1);
            }
        });
    };

    document.querySelectorAll('.block').forEach(block => {
        block.addEventListener('click', event => {
            const letter = event.target;
            if(letter.classList.contains('active')) {
                deleteLetter(letter);
            } else {
                letter.classList.add('active');
                letters.push(letter);
                if(letter.innerHTML === '&nbsp;')
                    input.value += ' ';
                else
                    input.value += letter.innerHTML;
            }            
        });
    });

    document.querySelector('.js-delete-letter').addEventListener('click', () => {
        deleteLetter();
    });

    const keyboardBtn = document.querySelector('.js-toggle-keyboard');

    keyboardBtn.addEventListener('click', () =>{
        const disabled = input.hasAttribute('disabled');
        if(disabled) {
            keyboardBtn.innerHTML = 'Disable keyboard';
            input.removeAttribute('disabled');
            input.focus();
        } else {
            keyboardBtn.innerHTML = 'Enable keyboard'
            input.setAttribute('disabled', 'disabled');
        }
    });
};
