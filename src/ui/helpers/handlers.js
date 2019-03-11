import { DOM } from 'ui/dom';
import { renderQuestionHeader } from 'ui/screens/common/question-header';
import { actions } from 'redux/actions/action-creators';
import { elem } from 'ui/helpers/class-behaviour';
import { renderTemplate } from 'ui/helpers/templating';
import { markTest } from 'ui/helpers/score-handler';
import updateBtnTemplate from 'ui/screens/multichoice/update-btn-template.html';

export const scoreHandler = (type, test, callback, config, containers) => {
    
    switch(type) {
        case 'radio':
        case 'text':
            genericScoreHandler(test, callback, config, containers);
            break;
        case 'block':
            blockScoreHander(test, callback, config);
            break;
        case 'strip':   
            stripScoreHandler(test, callback, config);
            break;
        case 'image':
            imageScoreHandler(test, callback, config);
            break;
        case 'image-match':
            simpleScoreHandler(test, callback, config);
            break;
    }
};

const textAlertHandler = response => {
    const questionText = document.querySelector('.js-txt-question');
    questionText.innerHTML = response.success
        ? `<div class="answer-box-success">
            <span class="icon"><i class="fas fa-check"></i></span><span>${ response.correct }</span>
            </div>`
        : `<div class="answer-box-alert">
            <span class="icon"><i class="fas fa-times"></i></span><span>${response.incorrect}</span>
           </div>`;
}

const simpleScoreHandler = (test, callback, config) => {
    
    const score = markTest(test);

    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(score);
    }, delay);

    if(callback) callback(score, scoreUpdateTimer);

    let correct = config.isLandscapeMode ? `That is the right answer.` : `That is the right answer.`;
    let incorrect = config.isLandscapeMode ? `That is the wrong answer.` : 'That is the wrong answer.';

    textAlertHandler({ success: score.success, correct, incorrect });
}

const genericScoreHandler = (_score, callback, config, containers) => {
    
    const { itemId, question, answer, target, layoutCount, points, names } = _score;
    const btn = target;
    const test = { itemId, ...question, answer, points, names };

    const score = markTest(test);

    let responseTxt = (test.names && test.names.length > 0) ? test.names[0] : test.binomial;
    let labelTxt = 'Species';

    if(score.taxon === 'genus') {
        responseTxt = score.genus;
        labelTxt = 'Genus name';
    }

    if(score.taxon === 'species') {
        responseTxt = score.species;
        labelTxt = 'Species name';
    }
    if(score.taxon === 'name') {
        responseTxt = score.binomial;
        labelTxt = 'Latin name';
    }

    if(score.taxon === 'family') {
        responseTxt = score.question;
        labelTxt = 'Family name';
    }

    let correct = config.isLandscapeMode ? `That is the right answer.` : `That is the right answer.`;
    let incorrect = config.isLandscapeMode ? `That is the wrong answer.` : 'That is the wrong answer.';

    textAlertHandler({ success: score.success, correct, incorrect });

    if(containers) {
        containers.answerContainer.classList.add(score.colour);
        if(containers.questionContainer) {
            containers.questionContainer.classList.add('snap-success');
        }        
    }

    score.layoutCount = layoutCount;

    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(score);        
    }, delay);

    callback(score, scoreUpdateTimer);
};

const blockScoreHander = (test, callback, config) => {
    
    const score = markTest(test);

    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(score);
    }, delay);

    callback(score, scoreUpdateTimer, config);
};

const stripScoreHandler = (test, callback, config) => {    

    const { items, taxon } = test;

    items.forEach(selected => {
        selected.addEventListener('click', event => {
            
            const target = event.target;

            if(elem.hasClass(target, 'disabled')) return;

            const answer = target.innerText;
            const vernacular = target.dataset.vernacular;

            test.taxon = 'name';
            test.vernacular = vernacular;
            test.question = taxon.question;
            test.answer = answer;
            const score = markTest(test);

            target.parentElement.classList.add(score.colour);

            items.forEach(strip => {   
                const matchesScientificName = strip.innerText === taxon.name;
                const matchesVernacularName = vernacular 
                                                ? strip.innerText.toLowerCase() ===  vernacular.toLowerCase() 
                                                : false;
                const matchesQuestion = strip.innerText === taxon.question;
                if(matchesScientificName || matchesVernacularName || matchesQuestion) {
                    strip.parentElement.classList.add('snap-success');
                }
            });     
            
            const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;
            
            const scoreUpdateTimer = setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, delay);
            
            if(callback) callback(score, scoreUpdateTimer);

            let correct = config.isLandscapeMode ? `That is the right answer.` : `That is the right answer.`;
            let incorrect = config.isLandscapeMode ? `That is the wrong answer.` : 'That is the wrong answer.';

            textAlertHandler({ success: score.success, correct, incorrect });

            items.forEach(item => item.classList.add('disabled'));
        });
    });
};

const imageScoreHandler = (test, callback, config) => {

    const { items, taxon } = test;

    items.forEach(tile => {
        tile.addEventListener('click', event => {

            const img = event.target;
            const answer = img.dataset.answer;

            if(!answer) return;

            test.taxon = 'name';
            test.question = taxon.name
            test.answer = answer;
            const score = markTest(test);

            tile.style.filter = 'saturate(100%)';

            img.parentNode.style.filter = 'saturate(100%)';

            items.forEach(tile => {
                tile.style.filter = 'saturate(10%)';
                tile.style.opacity = .3;
                if(tile.dataset.answer === taxon.name) {
                    tile.style.filter = 'saturate(100%)';
                    tile.style.opacity = 1;
                }
            });

            const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

            const scoreUpdateTimer = setTimeout(() => {
                actions.boundUpdateScore(score);
            }, delay);
                
            if(callback) callback(score, scoreUpdateTimer);
        });
    });
};

export const selectHandler = (selector, callback) => {
    document.querySelectorAll(selector).forEach(option => {
        option.addEventListener('click', event => {
            document.querySelectorAll(selector).forEach(option => option.classList.remove('active'));
            event.target.classList.add('active');
            const id = event.target.id;
            callback(id);
        });
    });
};

export const radioButonClickhandler = (config, template, descriptions, answers, submitBtn, question, item) => {
    
    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const description1 = 'Select family';
    renderTemplate({ description1, answers }, template.content, parent);

    renderQuestionHeader(document.querySelector('.js-question-container'), item, item.vernacularName);
    
    const updateBtn = document.createElement('template');

    updateBtn.innerHTML = updateBtnTemplate;

    renderTemplate({}, updateBtn.content, document.querySelector('.js-update-btn'));

    document.querySelector('input[name="answer"]:checked').checked = false;

    const answerBtn = document.querySelector(submitBtn);

    const radioButtons = document.querySelectorAll('.radio-buttons');

    radioButtons.forEach(rbContainer => {
        rbContainer.addEventListener('click', () => {
            answerBtn.innerHTML = 'Check your answer';
        });
    });

    const callback = (score, scoreUpdateTimer) => {            
        answerBtn.disabled = false;
        answerBtn.removeEventListener('click', scoreEventHandler);     
        window.clearTimeout(scoreUpdateTimer);
        actions.boundUpdateScore(score);
    };

    const scoreEventHandler = event => {
        let questionContainer;
        document.querySelectorAll('input[name="answer"]').forEach((rb, index) => {
            if(rb.id.toUpperCase() === question.question.question.toUpperCase()) {
                questionContainer = rb.parentElement;
            }
        });
        const answerContainer = document.querySelector('input[name="answer"]:checked').parentElement;
        const answer = document.querySelector('input[name="answer"]:checked').value;
        const test = { ...question, answer, target: event.target };
        scoreHandler('radio', test, callback, config, { answerContainer, questionContainer });         
        radioButtons.forEach(rb => {
            rb.querySelector('input').readOnly; 
            rb.classList.add('disabled');
        });
    };

    answerBtn.addEventListener('click', scoreEventHandler)
};
