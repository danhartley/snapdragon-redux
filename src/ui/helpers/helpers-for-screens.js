import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';

export const renderCapital = str => {

    if(!str) return str;

    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

export const renderName = (response, correct) => {

    if(correct) return response.answer;

    return renderCapital(response.vernacular) || response.binomial;

};

export const renderQuestion = response => {
    return renderCapital(response.vernacular) || response.question;
};


export const renderCorrect = response => {
    const question = renderQuestion(response);
    return response.answer.toUpperCase() === question.toUpperCase();
};

export const renderAnswer = (response) => {

    const names = response.binomial.split(' ');
    const genus = names[0];
    const species = names[1];
    const correct = renderCorrect(response);
    const className = correct ? 'right' : 'wrong';    

    const name = renderName(response, correct);

    switch(response.taxon) {
        case 'name':
            return `<span class="${className}">${name}</span>`;
            break;
        case 'genus':
            return correct
                ? `<span class="${className}">${response.answer}</span> <span>${species}</span>`
                : `<span class="${className}">${genus}</span> <span>${species}</span>`;
            break;
        case 'species':
            return correct
                ? `<span>${genus}</span> <span class="${className}">${response.answer}</span>`
                : `<span>${genus}</span> <span class="${className}">${species}</span>`;
            break;
        default:
            return '';
    }
};

export const renderAnswerText = (response) => {

    const correct = renderCorrect(response);

    return correct
        ? `${renderAnswer(response)} is the correct answer!`
        : `The correct answer is ${renderAnswer(response)}.`
};

export const renderAnswerHeader = (response, header, target) => {

    const correct = renderCorrect(response);

    const right = 'rgb(44, 141, 86)';
    const wrong = 'rgb(141, 0, 5)';

    const colour = correct ? right : wrong;

    return { text: renderAnswerText(response), colour, correct };
};

export const addListeners = (cards, item, callbackTime) => {
    cards.forEach(choice => {

        choice.addEventListener('click', event => {
            
            const target = event.target;
            const answer = target.innerText;
            const vernacular = target.dataset.vernacular;

            const score = { taxon: 'name', binomial: item.name, vernacular: vernacular, question: item.name, answer: answer };
            const { text, colour, correct } = renderAnswerHeader(score);
            score.success = correct;

            DOM.headerTxt.innerHTML = text;
            DOM.changeCollection.innerHTML = '';
            DOM.rightHeader.style.backgroundColor = colour;

            target.style.color = colour;

            setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, callbackTime);
            
            event.stopPropagation();
        });
    });
};

export const repeatModule = (items, collection) => {
    const prevIndex = items.collectionIndex - items.moduleSize;
    const currIndex = items.collectionIndex;
    const mod = collection.slice(prevIndex, currIndex);

    mod.moduleSize = items.moduleSize;
    mod.collectionIndex = currIndex;
    mod.collectionCount = items.collectionCount;
    mod.rounds = items.rounds;
    mod.currentRound = items.currentRound;
    
    return mod;
};

export const nextModule = (items, collection) => {
    
    const currIndex = items.collectionIndex;
    const nextIndex = items.collectionIndex + items.moduleSize;
    const nextMod = collection.slice(currIndex, nextIndex);

    nextMod.moduleSize = items.moduleSize;
    nextMod.collectionIndex = nextIndex;
    nextMod.collectionCount = items.collectionCount;
    nextMod.rounds = items.rounds;
    nextMod.currentRound = nextMod.collectionIndex / nextMod.moduleSize;

    return nextMod;
};

export const revisionModule = (items, score) => {
    const fails = score.fails.map(fail => {
        return items.filter(item => item.name === fail.binomial)[0];        
    });
    const revisionMod = fails.filter(utils.onlyUnique);
    
    revisionMod.moduleSize = items.moduleSize;
    revisionMod.collectionIndex = items.collectionIndex;
    revisionMod.collectionCount = items.collectionCount;
    revisionMod.rounds = items.rounds;
    revisionMod.currentRound = items.currentRound;
    
    return revisionMod; 
};