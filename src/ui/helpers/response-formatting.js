import { is } from "immutable";

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


export const isAnswerCorrect = response => {
    const question = renderQuestion(response);
    const isCorrect = 
        question.toUpperCase().indexOf(response.answer.toUpperCase()) !== -1 ||
        response.answer.toUpperCase().indexOf(question.toUpperCase()) !== -1;
    return isCorrect;
};

export const renderAnswer = (response) => {

    const names = response.binomial.split(' ');
    const genus = names[0];
    const species = names[1];
    const correct = isAnswerCorrect(response);
    const className = correct ? 'snap-success' : 'snap-alert';    

    const name = renderName(response, correct);

    switch(response.taxon) {
        case 'name':
            return name;
        case 'genus':
            return correct
                ? response.answer
                : genus;
        case 'species':
            return correct
                ? response.answer
                : species;
        case 'vernacular':
        return correct
                ? response.answer
                : response.question;
    }
};

export const renderAnswerText = (response, isPortraitMode) => {

    const correct = isAnswerCorrect(response);

    if(isPortraitMode) {
        return correct
        ? `${renderAnswer(response)}`
        : `${renderAnswer(response)}`
    } else {
        return correct
        ? `${renderAnswer(response)} is the correct answer.`
        : `The correct answer is ${renderAnswer(response)}.`
    }
};

export const renderAnswerHeader = (response, isPortraitMode = true) => {

    if(!response) return;

    response.answer = response.answer.trim();

    const correct = isAnswerCorrect(response);

    const colour = correct ? 'snap-success' : 'snap-alert';

    return { text: renderAnswerText(response, isPortraitMode), colour, correct };
};

export const renderTermAnswerHeader = (response, header, target) => {
    
    const correct = response.question.toLowerCase() === response.answer.toLowerCase();
    const colour = correct ? 'snap-success' : 'snap-alert';
    const term = correct ? response.answer : response.question;
    const answer = `<span class="${colour}">${term}</span>`;
    const text = correct
        ? `${answer} is correct!`
        : `No! ${answer}.`;

    return { text, colour, correct };
};