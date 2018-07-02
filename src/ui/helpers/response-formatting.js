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
    const className = correct ? 'snap-success' : 'snap-alert';    

    const name = renderName(response, correct);

    switch(response.taxon) {
        case 'name':
            return `<span class="${className}">${name}</span>`;
        case 'genus':
            return correct
                ? `<span class="${className}">${response.answer}</span> <span>${species}</span>`
                : `<span class="${className}">${genus}</span> <span>${species}</span>`;
        case 'species':
            return correct
                ? `<span>${genus}</span> <span class="${className}">${response.answer}</span>`
                : `<span>${genus}</span> <span class="${className}">${species}</span>`;
        case 'vernacular':
        return correct
                ? `<span>${genus}</span> <span class="${className}">${response.answer}</span>`
                : `<span>${genus}</span> <span class="${className}">${response.question}</span>`;
    }
};

export const renderAnswerText = (response, isPortraitMode) => {

    const correct = renderCorrect(response);

    if(isPortraitMode) {
        return correct
        ? `${renderAnswer(response)}    `
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

    const correct = renderCorrect(response);

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

export const addClassName = (element, className, redundantClasses) => {
    if(redundantClasses && redundantClasses.length > 0) 
        redundantClasses.forEach(redundant => element.classList.remove(redundant));
    if(className)
        element.classList.add(className);
};