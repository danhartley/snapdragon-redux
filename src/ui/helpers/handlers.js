import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';
import { imageSlider } from 'ui/screens/common/image-slider';
import updateBtnTemplate from 'ui/screens/multichoice/update-btn-template.html';

export const scoreHandler = (type, score, callback, config, containers) => {
    
    switch(type) {
        case 'radio':
        case 'text':
            genericScoreHandler(score, callback, config, containers);
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

const textAlertHandler = (isCorrect, correctAnswer) => {
    const questionText = document.querySelector('.js-txt-question');
    questionText.innerHTML = isCorrect
        ? `<div>
            <span class="icon"><i class="fas fa-check-circle"></i></span><span>Correct</span>
            </div>`
        : `<div>
            <span class="icon"><i class="fas fa-times-circle"></i></span><span>${ correctAnswer }</span>
            </div>`;
}

export const simpleScoreHandler = (score, config, callback) => {
    
    const { isCorrect } = renderAnswerHeader(score);

    const delay = isCorrect ? config.callbackTime : config.callbackTime + config.callbackDelay;

    score.success = isCorrect;
    
    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(score);
    }, delay);

    if(callback) callback(score, scoreUpdateTimer);

    textAlertHandler(isCorrect, score.answer);
}

const genericScoreHandler = (score, callback, config, containers) => {
    
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
    
    const { colour, isCorrect } = renderAnswerHeader(response);

    textAlertHandler(isCorrect, correctAnswer);

    if(containers) {
        containers.answerContainer.classList.add(colour);
        containers.questionContainer.classList.add('snap-success');
    }
    btn.innerText = 'Continue';

    response.success = isCorrect;
    response.layoutCount = layoutCount;

    const delay = isCorrect ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(response);        
    }, delay);

    callback(colour, score, scoreUpdateTimer);
};

const blockScoreHander = (score, callback, config) => {
    
    const { colour, isCorrect } = renderAnswerHeader(score);

    score.success = isCorrect;

    const delay = isCorrect ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(score);
    }, delay);

    callback(colour, isCorrect, score, scoreUpdateTimer, config);
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
            const { text, colour, isCorrect } = renderAnswerHeader(score);
            
            score.success = isCorrect;

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
            
            const delay = isCorrect ? config.callbackTime : config.callbackTime + config.callbackDelay;
            
            const scoreUpdateTimer = setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, delay);
            
            if(callback) callback(score, scoreUpdateTimer);

            textAlertHandler(isCorrect, score.question);
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
            const { text, colour, isCorrect } = renderAnswerHeader(score);

            score.success = isCorrect;

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

            const delay = isCorrect ? config.callbackTime : config.callbackTime + config.callbackDelay;

            const scoreUpdateTimer = setTimeout(() => {
                actions.boundUpdateScore(score);
            }, delay);
                
            if(callback) callback(text, colour, isCorrect, scoreUpdateTimer);
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

export const modalImagesHandler = (images, item, collection, displayNameType) => {
    images.forEach(image => {
        modalImageHandler(image, item, collection, displayNameType);
    });
};

export const modalImageHandler = (image, item, collection, displayNameType = 'binomial') => {
    image.addEventListener('click', event => {
        const parent = document.querySelector('#imageModal .js-modal-image');
        const selectedItem = item || collection.items.find(item => item.name === image.dataset.itemname);
        const images = selectedItem.images.map(image => {
            return { src: image, itemName: selectedItem.name };
        });
        imageSlider(images, parent, false, image);
        let displayName = '';
        switch(displayNameType) {
            case 'biomial':
                displayName = selectedItem.name;
                break;
            case 'vernacular':
                displayName = itemProperties.vernacularName(item, config);
                break;
            case 'withheld':
                displayName = 'Species name withheld';
                break;
            default:
                displayName = selectedItem.name;
        }
        DOM.modalImageTitle.innerHTML = displayName;
    })
};

export const radioButonClickhandler = (config, template, descriptions, answers, submitBtn, question) => {
    
    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const description1 = descriptions[0] || '';
    const description2 = descriptions[1] || '';
    const description3 = descriptions[2] || '';

    renderTemplate({ description1, description2, description3, answers }, template.content, parent);
    
    const updateBtn = document.createElement('template');

    updateBtn.innerHTML = updateBtnTemplate;

    renderTemplate({}, updateBtn.content, document.querySelector('.js-update-btn'));

    document.querySelector('input[name="answer"]:checked').checked = false;

    const answerBtn = document.querySelector(submitBtn);

    document.querySelectorAll('.radio-buttons').forEach(rbContainer => {
        rbContainer.addEventListener('click', () => {
            answerBtn.innerHTML = 'Check your answer';
        });
    });

    const callback = (colour, score, scoreUpdateTimer) => {            
        answerBtn.disabled = false;
        answerBtn.removeEventListener('click', scoreEventHandler);     
        answerBtn.addEventListener('click', () => {
            window.clearTimeout(scoreUpdateTimer);
            actions.boundUpdateScore(score);
        });
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
        const score = { ...question, answer, event };
        scoreHandler('radio', score, callback, config, { answerContainer, questionContainer });            
    };

    answerBtn.addEventListener('click', scoreEventHandler)
};
