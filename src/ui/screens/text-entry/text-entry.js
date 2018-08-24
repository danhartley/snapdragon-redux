import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { scoreHandler } from 'ui/helpers/handlers';
import landscapeTemplates from 'ui/screens/text-entry/text-entry-templates.html';
import portraitTemplates from 'ui/screens/text-entry/text-entry-portrait-templates.html';
import { imageSlider } from 'ui/screens/common/image-slider';

export const renderInput = (screen, question, hints) => {

    const { lessonPlan, collection, config, layout } = store.getState();
    const templates = document.createElement('div');    
    templates.innerHTML = config.isPortraitMode ? portraitTemplates : landscapeTemplates;

    const template = templates.querySelector(`.${screen.template}`);

    const item = collection.items[collection.itemIndex];

    hints.forEach(hint => {
        const el = template.content.querySelector(hint.selector);
        if(el)
            template.content.querySelector(hint.selector).innerHTML = hint.value.toUpperCase();  
    });

    const clone = document.importNode(template.content, true);
    
    const callback = (colour, score, scoreUpdateTimer) => {
        const answerBtn = document.querySelector('.js-check-answer');
        answerBtn.innerHTML = 'Continue';
        answerBtn.disabled = false;
        answerBtn.classList.add(colour);
        answerBtn.removeEventListener('click', scoreEventHandler);
        answerBtn.addEventListener('click', () => {
            window.clearTimeout(scoreUpdateTimer);
            actions.boundUpdateScore(score);
        });
    };

    const scoreEventHandler = event => {
        const score = { itemId: item.id, question, answer: document.querySelector('.js-txt-input').value, event, layoutCount: lessonPlan.layouts.length, points: layout.points };
        scoreHandler('text', score, callback, config);
    };

    clone.querySelector('.js-check-answer').addEventListener('click', scoreEventHandler);

    const name = clone.querySelector('.js-txt-name');
    if(name) name.innerHTML = item.name;
    const vernacular = clone.querySelector('.js-txt-vernacular');
    if(vernacular) vernacular.innerHTML = itemProperties.vernacularName(item, config);

    const parent = DOM.rightBody;
    parent.innerHTML = '';
    
    const txtQuestion = `Enter the common name for the species ${item.name}:`;
    renderTemplate({ txtQuestion }, template.content, parent, clone);

    if(config.isPortraitMode) renderPortrait(item);
    else renderLandscape(item, config, collection);

    document.querySelector('.js-txt-input').focus();
};

const renderPortrait = item => {
    imageSlider(item, document.querySelector('.js-species-card-images'), true);
};

const renderLandscape = (item, config, collection) => {
    
    const pool = (item.species + itemProperties.vernacularName(item, config)).replace(/\s/g,'').toLowerCase();

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
