import { actions } from 'redux/actions/action-creators';
import { elem } from 'ui/helpers/class-behaviour';
import { markTest } from 'ui/helpers/score-handler';

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
    const questionText = document.querySelector('.js-txt-question');
    questionText.innerHTML = response.success
        ? `<div class="answer-box-success">
            <span class="icon"><i class="fas fa-check"></i></span><span>${ response.correct }</span>
            </div>`
        : `<div class="answer-box-alert">
            <span class="icon"><i class="fas fa-times"></i></span><span>${response.incorrect}</span>
           </div>`;
}

const clickContinueLessonButtonHandler = (score, scoreUpdateTimer) => {
        
    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');

    continueLessonBtn.disabled = false;

    continueLessonBtn.addEventListener('click', event => {
        window.clearTimeout(scoreUpdateTimer);
        actions.boundUpdateScore(score);
    });
};

const simpleScoreHandler = (test, callback, config) => {
    
    const score = markTest(test);

    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(score);
    }, delay);

    if(callback) {
        callback(score, scoreUpdateTimer);
    } else {
        clickContinueLessonButtonHandler(score, scoreUpdateTimer);
    }

    let correct = config.isLandscapeMode ? `That is the right answer.` : `That is the right answer.`;
    let incorrect = config.isLandscapeMode ? `That is the wrong answer.` : 'That is the wrong answer.';

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

    let correct = config.isLandscapeMode ? `That is the right answer.` : `That is the right answer.`;
    let incorrect = config.isLandscapeMode ? `That is the wrong answer.` : 'That is the wrong answer.';

    showResponseToAnswerHandler({ success: score.success, correct, incorrect });

    score.layoutCount = layoutCount;

    const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;

    const scoreUpdateTimer = setTimeout(()=>{
        actions.boundUpdateScore(score);        
    }, delay);

    if(callback) callback(score, scoreUpdateTimer);

    return { score, scoreUpdateTimer };
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

            target.classList.add(score.colour);

            items.forEach(strip => {   
                const matchesScientificName = strip.innerText === taxon.name;
                const matchesVernacularName = vernacular 
                                                ? strip.innerText.toLowerCase() ===  vernacular.toLowerCase() 
                                                : false;
                const matchesQuestion = strip.innerText === taxon.question;
                if(matchesScientificName || matchesVernacularName || matchesQuestion) {
                    strip.classList.add('snap-success');
                }
            });     
            
            const delay = score.success ? config.callbackTime : config.callbackTime + config.callbackDelay;
            
            const scoreUpdateTimer = setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, delay);
            
            if(callback) callback(score, scoreUpdateTimer);

            let correct = config.isLandscapeMode ? `That is the right answer.` : `That is the right answer.`;
            let incorrect = config.isLandscapeMode ? `That is the wrong answer.` : 'That is the wrong answer.';

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