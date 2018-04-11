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
    return response.answer === question;
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

export const addListeners = (cards, item) => {
    cards.forEach(choice => {

        choice.addEventListener('click', event => {
            
            const target = event.target;
            const answer = target.innerText;
            const vernacular = target.dataset.vernacular;

            const score = { taxon: 'name', binomial: item.name, vernacular: vernacular, question: item.name, answer: answer };
            const { text, colour, correct } = renderAnswerHeader(score);
            score.success = correct;

            DOM.headerTxt.innerHTML = text;
            DOM.rightHeader.style.backgroundColor = colour;

            target.style.color = colour;
            // target.parentNode.style.background = colour;

            if(!correct) {
                cards.forEach(card => {
                    if(card.innerText === item.name) {
                        //card.parentNode.style.background = 'rgb(44, 141, 86)';
                    }
                });
            }

            setTimeout(()=>{
                actions.boundUpdateScore(score);
            },500);            
        });
    });
};

export const batchNextItems = (items, pool) => {
    const begin = items.poolIndex;
    const end = items.poolIndex + items.moduleSize;
    const newItems = pool.slice(begin, end);
    newItems.moduleSize = items.moduleSize;
    newItems.poolIndex = items.poolIndex + items.moduleSize;
    newItems.poolCount = items.poolCount;
    return newItems;
};

export const batchUnIdentifiedItems = (score, items) => {
    const fails = score.fails.map(fail => {
        return items.filter(item => item.name === fail.binomial)[0];        
    });
    const unIdentifiedItems = fails.filter(utils.onlyUnique);
    unIdentifiedItems.poolCount = items.poolCount;
    return unIdentifiedItems; 
};