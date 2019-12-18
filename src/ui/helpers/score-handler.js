import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { elem } from 'ui/helpers/class-behaviour';
import { markTest, isAnswerEqualToQuestion } from 'ui/helpers/test-handler';
import { subscription } from 'redux/subscriptions';
import { getTraitsForTests } from '../../api/traits/traits-for-tests';

export const scoreHandler = (type, test, callback, config) => {
    
    switch(type) {
        case 'radio':
        case 'text':
            return genericScoreHandler(test, callback, config);
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

const showResponseToAnswerHandler = response => {
    const questionText = document.querySelector(response.container) || document.querySelector('.js-txt-question');
    if(questionText) {
          questionText.innerHTML = response.success
            ? `<div class="answer-box-success">
                <span class="icon"><i class="fas fa-check"></i></span><span>${ response.correct }</span>
                </div>`
            : `<div class="answer-box-alert">
                <span class="icon"><i class="fas fa-times"></i></span><span>${response.incorrect}</span>
            </div>`;
    }
}

export const continueLessonHandler = (btn, score, timer) => {
        
    btn.disabled = false;
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', event => {
        btn.disabled = true;
        window.clearTimeout(timer);
        subscription.removeSubs();
        bindScore(score);
    });
};

const simpleScoreHandler = (test, callback, config) => {
    
    const score = markTest(test);

    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

    subscription.removeSubs();

    const scoreUpdateTimer = setTimeout(()=>{
        bindScore(score);      
    }, delay);

    if(callback) {
        callback(score, scoreUpdateTimer);
    } else {
        continueLessonHandler(document.querySelector('.js-continue-lesson-btn'), score, scoreUpdateTimer);
    }

    let correct = `That's the right answer`;
    let incorrect = `That's the wrong answer`;

    showResponseToAnswerHandler({ success: score.success, correct, incorrect });
}

const genericScoreHandler = (_score, callback, config) => {
    
    const { itemId, question, answer, target, layoutCount, points, names } = _score;
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

    let correct = `That's the right answer`;
    let incorrect = `That's the wrong answer`;

    const container = window.matchMedia("(max-height: 568px)").matches ? '.js-check-answer' : '.js-txt-question';

    showResponseToAnswerHandler({ success: score.success, correct, incorrect,  container});

    score.layoutCount = layoutCount;

    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

    subscription.removeSubs(); 

    const scoreUpdateTimer = setTimeout(()=>{
        bindScore(score);               
    }, delay);

    if(callback) callback(score, scoreUpdateTimer);

    return { score, scoreUpdateTimer };
};

const blockScoreHander = (test, callback, config) => {
    
    const score = markTest(test);

    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

    subscription.removeSubs();

    const scoreUpdateTimer = setTimeout(()=>{
        bindScore(score);        
    }, delay);

    callback(score, scoreUpdateTimer, config);
};

const stripScoreHandler = (test, callback, config) => {    

    const { items, taxon } = test;

    items.forEach(selected => {
        
        selected.addEventListener('click', event => {
            
            const target = event.target;

            if(elem.hasClass(target, 'disabled')) return;

            const answerNode = target.querySelector('div:nth-child(1)');
            const answer = answerNode.innerText.trim();
            const answerIndex = answerNode.dataset.answerIndex;
            const vernacular = target.dataset.vernacular;

            test.taxon = 'name';
            test.vernacular = vernacular;
            test.question = taxon.question;
            test.answer = answer;
                
            const score = markTest({...test, answeredIndex: answerIndex });

            target.classList.add(score.colour);

            items.forEach(strip => {   
                const stripAnswer = strip.querySelector('div:nth-child(1)');
                const stripAnswerIndex = parseInt(stripAnswer.dataset.answerIndex);
                if(stripAnswerIndex === test.answerIndex) {
                    strip.classList.add('snap-success');
                }
            });     
            
            if(callback) {
                callback(score);
            } else {
                const _callback = (score) => {

                    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

                    const scoreUpdateTimer = setTimeout(()=>{
                        subscription.removeSubs();
                        bindScore(score);
                    }, delay);
                
                    continueLessonHandler(document.querySelector('.js-continue-lesson-btn'), score, scoreUpdateTimer);

                    // screen is always null
                    if(screen.name === 'family-strips') {
                        document.querySelector('.js-question-question').innerHTML = item.taxonomy.family;
                        document.querySelector('.js-question-help').classList.add('hide');
                    }
                };
                _callback(score);
            }
                

            let correct = `That's the right answer`;
            let incorrect = `That's the wrong answer`;

            showResponseToAnswerHandler({ success: score.success, correct, incorrect });

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
                if(tile.dataset.answer.trim().toLowerCase() === taxon.name.trim().toLowerCase()) {
                    tile.style.filter = 'saturate(100%)';
                    tile.style.opacity = 1;
                }
            });

            const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

            subscription.removeSubs();

            const scoreUpdateTimer = setTimeout(() => {
                bindScore(score);
            }, delay);
                
            if(callback) callback(score, scoreUpdateTimer);
        });
    });
};

export const bindScore = score => {

    const { collection } = store.getState();

    score.collectionId = collection.id;

    actions.boundUpdateScore(score);  
};