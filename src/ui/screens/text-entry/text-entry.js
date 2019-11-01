import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { scoreHandler, bindScore } from 'ui/helpers//score-handler';
import { imageUseCases, prepImagesForCarousel } from 'ui/helpers/image-handler';
import { imageSlider } from 'ui/screens/common/image-slider';
import textEntryTemplate from 'ui/screens/text-entry/text-entry-templates.html';
import textEntryPortraitTemplate from 'ui/screens/text-entry/text-entry-portrait-templates.html';

import { renderTestCardTemplate } from 'ui/screens/cards/test-card';

export const renderInput = (screen, question) => {

    const { lessonPlan, collection, config, layout } = store.getState();

    const item = collection.nextItem;

    let vernacularName, binomial, questionTxt;

    questionTxt = 'Complete the latin name';

    switch(question.taxon) {
        case 'genus': 
            vernacularName = item.vernacularName;
            binomial = binomial = `--- ${question.species}`;
            break;
        case 'species': 
            vernacularName = item.vernacularName;
            binomial = binomial = `${question.genus} ---`;
            break;
        case 'name': 
            vernacularName = item.vernacularName;
            binomial = binomial = `--- ---`;
            break;
        case 'vernacular':
            vernacularName = '--- ---';
            binomial = item.name;
            questionTxt = 'Give the common name';
            break;
    }

    const help = config.isLandscapeMode ? '(Complete the name below.)' : '(Scroll to see more images.)';

    const parent = renderTestCardTemplate(collection, { vernacularName, binomial, question: questionTxt, help, term: '' });
    
    if(config.isPortraitMode) {
        document.querySelector('.js-test-card-content').classList.add('clearSpacing');
    }

    const template = document.createElement('template');
    
    template.innerHTML = config.isLandscapeMode ? textEntryTemplate : textEntryPortraitTemplate;
    
    renderTemplate({ }, template.content, parent);

    const inputTxt = document.querySelector('.js-txt-input');
    const helpTxt = document.querySelector('.js-help-txt');

    switch(question.taxon) {
        case 'genus': 
            inputTxt.setAttribute('placeholder', 'Enter genus name');
            helpTxt.innerHTML = `--- ${question.species}`;
            break;
        case 'species': 
            inputTxt.setAttribute('placeholder', 'Enter species name');
            helpTxt.innerHTML = `${utils.capitaliseFirst(question.genus)} ---`;
            break;
        case 'name': 
            inputTxt.setAttribute('placeholder', 'Enter latin name');
            helpTxt.innerHTML = `--- ---`;
            break;
        case 'vernacular':
            inputTxt.setAttribute('placeholder', 'Enter common name');
            helpTxt.innerHTML = `-----`;
            break;
    }

    const answerBtn = document.querySelector('.js-check-answer');

    const boundScore = {};

    const callback = (score, scoreUpdateTimer) => {        
        boundScore.scoreUpdateTimer = scoreUpdateTimer;
        boundScore.score = score;        
        answerBtn.removeEventListener('click', scoreEventHandler);
        if(config.isPortraitMode) {
            answerBtn.innerHTML = question.taxon === 'vernacular' ? item.vernacularName : item.name;
            answerBtn.classList.add('portrait-answer');
        }
    };

    const scoreEventHandler = event => {
        const score = { itemId: item.id, question, answer: document.querySelector('.js-txt-input').value, target: event.target, layoutCount: lessonPlan.layouts.length, points: layout.points, names: item.vernacularNames };
        scoreHandler('text', score, callback, config);
        answerBtn.disabled = true;
        document.querySelector('.js-continue-lesson-btn').disabled = false;
        helpTxt.innerHTML = question.taxon === 'vernacular' ? item.vernacularName : item.name;
    };

    answerBtn.addEventListener('click', scoreEventHandler);
    
    if(config.isPortraitMode) renderPortrait(item, config);
    else renderLandscape(item, config, question);

    document.querySelector('.js-continue-lesson-btn').addEventListener('click', event => {
        window.clearTimeout(boundScore.scoreUpdateTimer);
        bindScore(boundScore.score);
    });
};

const renderPortrait = (item, config) => {
    
    const images = prepImagesForCarousel(item, config, imageUseCases.TEXT_ENTRY);

    const parent = document.querySelector('.js-test-card-container-images');

    imageSlider({ config, images, parent, disableModal: true });
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
            pool = item.taxonomy.genus.toLowerCase();
            break;
        case 'species':
            pool = item.taxonomy.species.toLowerCase();
            break;
        case 'binomial':
        case 'name':
            pool = item.name.toLowerCase();
            answer = question.binomial;
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
            keyboardBtn.innerHTML = 'Enable letters';
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
        if(!event.data) return;
        let entry = event.data.toLowerCase();
        entry = entry === ' ' ? '&nbsp;' : entry;
        entries.push(entry);
        selectedBlock = blockArray.find(block => block.innerHTML === entry);
        if(selectedBlock) selectedBlock.classList.add('active');
        if(input.value === answer.toLowerCase()) {
            blockArray.forEach(block => block.classList.add('correct'));
        }
    });

    input.addEventListener('keyup', event => {
          if(event.keyCode === 8) {
            const entry = entries.pop();
            selectedBlock = blockArray.find(block => block.innerHTML === entry);
            if(selectedBlock) selectedBlock.classList.remove('active');
          }            
    });
};