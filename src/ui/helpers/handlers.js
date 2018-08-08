import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const scoreHandler = (type, score, callback, callbackTime, renderHeader) => {
    
    switch(type) {
        case 'radio':
        case 'text':
            scoringHandler(score, callback, callbackTime, renderHeader);
            break;
        case 'block':
            blockScoreHander(score, callback, callbackTime);
            break;
        case 'strip':   
            stripScoreHandler(score, callback, callbackTime);
            break;
        case 'image':
            imageScoreHandler(score, callback, callbackTime);
            break;
    }
};

const scoringHandler = (score, callback, callbackTime, renderHeader) => {
    
    const { itemId, question, answer, event, layoutCount } = score;

    const btn = event.target;
    const response = { itemId, ...question, answer };

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
    
    const { colour, correct } = renderHeader(response);

    const questionText = document.querySelector('.js-txt-question');

    //if(isPortraitMode) {
        questionText.innerHTML = correct
            ? `<div>
                <span class="icon"><i class="fas fa-check-circle"></i></span><span>Correct</span>
               </div>`
            : `<div>
                <span class="icon"><i class="fas fa-times-circle"></i></span><span>${ correctAnswer }</span>
               </div>`;
    // } else {
    //     questionText.innerHTML = correct 
    //         ? `<div>
    //             <span class="icon"><i class="fas fa-check-circle"></i></span>
    //             <span>${ correctAnswer } is the correct answer.</span>
    //            </div>`
    //         : `<div>
    //             <span class="icon"><i class="fas fa-times-circle"></i></span>
    //             <span>${ wrongAnswer || '--' } is incorrect.</span>
    //            </div> 
    //            <div>The correct answer is ${ correctAnswer }.</div>`;
    // }

    btn.style.background = colour;
    btn.style.borderColor = colour;
    btn.style.color = 'white';
    btn.innerText = correct ? 'Correct' : 'Incorrect';
    btn.disabled = true;

    response.success = correct;
    response.layoutCount = layoutCount;

    setTimeout(()=>{
        actions.boundUpdateScore(response);
    }, callbackTime);
};

const blockScoreHander = (score, callback, callbackTime) => {
    
    const { colour, correct } = renderAnswerHeader(score);

    score.success = correct;

    callback(colour, correct, score.answer);

    setTimeout(()=>{
        actions.boundUpdateScore(score);
    }, callbackTime);
};

const stripScoreHandler = (score, callback, callbackTime) => {    

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

            if(callback) callback(text, colour, correct);
            
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
            
            setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, callbackTime);
            
            event.stopPropagation();
        });
    });
};

const imageScoreHandler = (score, callback, callbackTime) => {

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

            if(callback) callback(text, colour, correct);

            score.success = correct;

            tile.style.filter = 'saturate(100%)';

            // DOM.rightHeaderTxt.innerHTML = text;
            
            img.parentNode.style.filter = 'saturate(100%)';

            items.forEach(tile => {
                tile.style.filter = 'saturate(10%)';
                tile.style.opacity = .3;
                if(tile.dataset.answer === taxon.name) {
                    tile.style.filter = 'saturate(100%)';
                    tile.style.opacity = 1;
                }
            });

            setTimeout(() => {
                actions.boundUpdateScore(score);
            }, callbackTime);
                
            event.stopPropagation();
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

export const modalBackgroundImagesHandler = (images, item) => {
    images.forEach(image => {
        image.addEventListener('click', event => {            
            const img = event.target;
            let src = img.style.backgroundImage.slice(4, -1).replace(/"/g, "");
            if(src) {
                src = src.indexOf('https') > -1 ? src : `https://media.eol.org/content/${src}`;
                DOM.modalImageTitle.innerHTML = item.name;
                const style = `background-image: url(${src}); background-size: cover; background-position: center;`;
                DOM.modalImage.style = style;
            }
        })
    });
};

export const modalImageHandler = (image) => {
    image.addEventListener('click', event => {
        const src  = `https://media.eol.org/content/${event.currentTarget.dataset.image}`;
        DOM.modalImageTitle.innerHTML = event.currentTarget.dataset.id;
        const style = `background-image: url(${src}); background-size: cover;`;
        DOM.modalImage.style = style;            
    })
};
