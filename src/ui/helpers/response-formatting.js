export const renderCapital = str => {
    if(!str) return str;
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

export const renderName = (response, isCorrect) => {

    if(isCorrect) return response.answer;

    return renderCapital(response.vernacular) || response.binomial;

};

export const renderQuestion = response => {
    return renderCapital(response.vernacular) || response.question;
};


export const isAnswerCorrect = response => {
    const question = renderQuestion(response);
    const validAnswer = response.answer.length > 2;
    const isCorrect =
        validAnswer &&
        (question.toUpperCase().indexOf(response.answer.toUpperCase()) !== -1 ||
        response.answer.toUpperCase().indexOf(question.toUpperCase()) !== -1);
    return isCorrect;
};

export const renderAnswer = (response) => {

    const names = response.binomial.split(' ');
    const genus = names[0];
    const species = names[1];
    const isCorrect = isAnswerCorrect(response);

    const name = renderName(response, isCorrect);

    switch(response.taxon) {
        case 'name':
            return name;
        case 'genus':
            return isCorrect
                ? response.answer
                : genus;
        case 'species':
            return isCorrect
                ? response.answer
                : species;
        case 'vernacular':
        return isCorrect
                ? response.answer
                : response.question;
    }
};

export const renderAnswerHeader = response => {

    if(!response) return;

    response.answer = response.answer.trim();

    const isCorrect = isAnswerCorrect(response);

    const colour = isCorrect ? 'snap-success' : 'snap-alert';

    return { text: renderAnswer(response), colour, isCorrect };
};