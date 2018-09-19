import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';
import { imageSlider } from 'ui/screens/common/image-slider';

export const scoreHandler = (type, score, callback, config) => {
    
    switch(type) {
        case 'radio':
        case 'text':
            genericScoreHandler(score, callback, config);
            break;
        case 'block':
            blockScoreHander(score, callback, config);
            break;
        case 'strip':   
            stripScoreHandler(score, callback, config);
            break;
        case 'image':
            imageScoreHandler(score, callback, config);
            break;
    }
};

const genericScoreHandler = (score, callback, config) => {
    
    const { itemId, question, answer, event, layoutCount, points } = score;

    const btn = event.target;
    const response = { itemId, ...question, answer, points };

    let correctAnswer;
    let wrongAnswer;

    if(question.enumerated) {
        correctAnswer = response.question.slice(0,3);
        wrongAnswer = response.answer.slice(0,3);
        response.answer = response.answer.slice(3);
        response.question = response.question.slice(3);
    } else {
        correctAnswer = response.question;
        wrongAnswer = response.answer;
    }
    
    const { colour, correct } = renderAnswerHeader(response);

    const questionText = document.querySelector('.js-txt-question');

    questionText.innerHTML = correct
        ? `<div>
            <span class="icon"><i class="fas fa-check-circle"></i></span><span>Correct</span>
            </div>`
        : `<div>
            <span class="icon"><i class="fas fa-times-circle"></i></span><span>${ correctAnswer }</span>
            </div>`;

    btn.style.background = colour;
    btn.style.borderColor = colour;
    btn.style.color = 'white';
    btn.innerText = 'Continue';
    btn.disabled = true;

    response.success = correct;
    response.layoutCount = layoutCount;

    const delay = correct ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(response);
    }, delay);

    callback(colour, score, scoreUpdateTimer);
};

const blockScoreHander = (score, callback, config) => {
    
    const { colour, correct } = renderAnswerHeader(score);

    score.success = correct;

    const delay = correct ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(score);
    }, delay);

    callback(colour, correct, score, scoreUpdateTimer, config);
};

const stripScoreHandler = (score, callback, config) => {    

    const { items, taxon } = score;

    items.forEach(selected => {

        selected.addEventListener('click', event => {
            
            const target = event.target;
            const answer = target.innerText;
            const vernacular = target.dataset.vernacular;

            score.taxon = 'name';
            score.vernacular = vernacular;
            score.question = taxon.question;
            score.answer = answer;
            const { text, colour, correct } = renderAnswerHeader(score);
            
            score.success = correct;

            target.classList.add(colour);

            items.forEach(strip => {   
                const matchesScientificName = strip.innerText === taxon.name;
                const matchesVernacularName = vernacular 
                                                ? strip.innerText.toLowerCase() ===  vernacular.toLowerCase() 
                                                : false;
                const matchesQuestion = strip.innerText === taxon.question;
                if(matchesScientificName || matchesVernacularName || matchesQuestion) {
                    strip.classList.add('snap-success');
                    strip.classList.add('snap-success');
                }
            });     
            
            const delay = correct ? config.callbackTime : config.callbackTime + config.callbackDelay;
            
            const scoreUpdateTimer = setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, delay);
            
            if(callback) callback(text, colour, correct, score, scoreUpdateTimer);
        });
    });
};

const imageScoreHandler = (score, callback, config) => {

    const { items, taxon } = score;

    items.forEach(tile => {
        tile.addEventListener('click', event => {

            const img = event.target;
            const answer = img.dataset.answer;

            if(!answer) return;

            score.taxon = 'name';
            score.question = taxon.name
            score.answer = answer;
            const { text, colour, correct } = renderAnswerHeader(score);

            score.success = correct;

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

            const delay = correct ? config.callbackTime : config.callbackTime + config.callbackDelay;

            const scoreUpdateTimer = setTimeout(() => {
                actions.boundUpdateScore(score);
            }, delay);
                
            if(callback) callback(text, colour, correct, scoreUpdateTimer);
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

export const modalImagesHandler = (images, item) => {
    images.forEach(image => {
        modalImageHandler(image, item);
    });
};

export const modalImageHandler = (image, item) => {
    image.addEventListener('click', event => {
        const parent = document.querySelector('#imageModal .js-modal-image');
        imageSlider(item, parent, false, image);
        DOM.modalImageTitle.innerHTML = item.name;
    })
};

export const radioButonClickhandler = (config, template, description1, description2, answers, submitBtn, question) => {

    // const render = (target = '.js-rb-answer-btn') => {
        const parent = DOM.rightBody;
        parent.innerHTML = '';

        renderTemplate({ description1, description2, answers }, template.content, parent);

        document.querySelector('input[name="answer"]:checked').checked = false;

        const answerBtn = document.querySelector(submitBtn);

        const callback = (colour, score, scoreUpdateTimer) => {            
            answerBtn.disabled = false;
            answerBtn.classList.add(colour);
            answerBtn.removeEventListener('click', scoreEventHandler);     
            answerBtn.addEventListener('click', () => {
                window.clearTimeout(scoreUpdateTimer);
                actions.boundUpdateScore(score);
            });
        };

        const scoreEventHandler = event => {
            const answer = document.querySelector('input[name="answer"]:checked').value;
            const score = { ...question, answer, event };
            // const score = { itemId: item.id, question, answer, event, layoutCount: lessonPlan.layouts.length, points: layout.points };
            scoreHandler('radio', score, callback, config);            
        };

        answerBtn.addEventListener('click', scoreEventHandler)
    };

// }
