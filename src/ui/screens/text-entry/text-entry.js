import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { scoreHandler } from 'ui/helpers/handlers';
import { imageUseCases, prepImagesForCarousel } from 'ui/helpers/image-handlers';
import landscapeTemplates from 'ui/screens/text-entry/text-entry-templates.html';
import portraitTemplates from 'ui/screens/text-entry/text-entry-portrait-templates.html';
import { imageSlider } from 'ui/screens/common/image-slider';

export const renderInput = (screen, question, hints) => {

    const { lessonPlan, collection, config, layout } = store.getState();
    const templates = document.createElement('div');    
    templates.innerHTML = config.isPortraitMode ? portraitTemplates : landscapeTemplates;

    const template = templates.querySelector(`.${screen.template}`);

    const item = collection.nextItem;

    hints.forEach(hint => {
        const el = template.content.querySelector(hint.selector);
        if(el)
            template.content.querySelector(hint.selector).innerHTML = (hint && hint.value) ? hint.value.toUpperCase() : '';  
    });

    const clone = document.importNode(template.content, true);

    const markingCallback = (score, scoreUpdateTimer) => {        
        const answerBtn = document.querySelector('.js-check-answer');
        answerBtn.innerHTML = 'Continue';
        answerBtn.disabled = false;
        answerBtn.classList.add(score.colour);
        answerBtn.removeEventListener('click', scoreEventHandler);
        answerBtn.addEventListener('click', () => {
            window.clearTimeout(scoreUpdateTimer);
            actions.boundUpdateScore(score);
        });
        if(score.alternativeAccepted) {
            document.querySelector('.js-text-alternative').innerHTML = `Alternative: ${score.question}`;
        }
    };

    const scoreEventHandler = event => {
        const score = { itemId: item.id, question, answer: document.querySelector('.js-txt-input').value, target: event.target, layoutCount: lessonPlan.layouts.length, points: layout.points, names: item.vernacularNames };
        scoreHandler('text', score, markingCallback, config);
    };

    const answerBtn = clone.querySelector('.js-check-answer');
    answerBtn.addEventListener('click', scoreEventHandler);

    if(answerBtn) {
        answerBtn.disabled = true;
        setTimeout(() => {
            answerBtn.disabled = false;
        }, 1000);
    }
    

    const name = clone.querySelector('.js-txt-name');
    if(name) name.innerHTML = item.name;
    const vernacular = clone.querySelector('.js-txt-vernacular');
    if(vernacular) vernacular.innerHTML = item.vernacularName;

    const parent = DOM.rightBody;
    parent.innerHTML = '';
    
    const txtQuestion = `Enter the common name for the species ${item.name}`;
    renderTemplate({ txtQuestion }, template.content, parent, clone);

    if(config.isPortraitMode) renderPortrait(item, config);
    else renderLandscape(item, config, question);

    document.querySelector('.js-txt-input').focus();
};

const renderPortrait = (item, config) => {
    
    const images = prepImagesForCarousel(item, config, imageUseCases.TEXT_ENTRY);

    const parent = document.querySelector('.js-species-card-images');

    imageSlider(config, images, parent, true);
};

const renderLandscape = (item, config, question) => {
    
    let answer = question[question.taxon];
    
    let pool;

    switch(question.taxon) {
        case 'vernacular':
            pool = item.vernacularName.toLowerCase();
            answer = question.common;
            break;
        case 'genus':
            pool = item.genus.toLowerCase();
            break;
        case 'species':
            pool = item.species.toLowerCase();
            break;
        case 'binomial':
        case 'name':
            pool = item.name.toLowerCase();
            break;
    }

    let letterBlocks = '';

    utils.shuffleArray(Array.from(pool)).forEach( (letter, index) => {
        if(letter === ' ') letter = '&nbsp;';
        letterBlocks += `<span id="${index}" class="block">${letter}</span>`
    });

    document.querySelector('.js-pool-letters').innerHTML = letterBlocks;

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

    const blocks = document.querySelectorAll('.block');

    blocks.forEach(block => {
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
            if(input.value === answer.toLowerCase()) {
                blocks.forEach(block => block.classList.add('correct'));
                document.querySelector('.js-check-answer').click();
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

    const blockArray = [ ...blocks ];    
    const entries = [];
    let selectedBlock;

    input.addEventListener('input', event => {
        const entry = event.data.toLowerCase();        
        entries.push(entry);
        selectedBlock = blockArray.find(block => block.innerHTML === entry);
        selectedBlock.classList.add('active');
        if(input.value === answer.toLowerCase()) {
            blockArray.forEach(block => block.classList.add('correct'));
            document.querySelector('.js-check-answer').click();
        }
    });

    input.addEventListener('keyup', event => {
          if(event.keyCode === 8) {
            const entry = entries.pop();
            selectedBlock = blockArray.find(block => block.innerHTML === entry);
            selectedBlock.classList.remove('active');
          }            
        });
};
