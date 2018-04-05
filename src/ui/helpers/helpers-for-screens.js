export const renderAnswer = (response) => {

    const names = response.name.split(' ');
    const genus = names[0];
    const species = names[1];

    const correct = response.answer === response.question;
    const className = correct ? 'right' : 'wrong';    

    const name = response.vernacularQuestion 
        ? response.vernacularQuestion.vernacularName.charAt(0).toUpperCase() + response.vernacularQuestion.vernacularName.slice(1)
        : response.name;

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

    const correct = response.answer === response.question;

    return correct
        ? `${renderAnswer(response)} is the correct answer!`
        : `The correct answer is ${renderAnswer(response)}.`
};

export const renderAnswerHeader = (response, header, target) => {

    const correct = response.answer === response.question;

    const right = 'rgb(44, 141, 86)';
    const wrong = 'rgb(141, 0, 5)';

    const colour = correct ? right : wrong;

    return { text: renderAnswerText(response), colour, correct };
};

export const createNewCollection = (species, responses) => {

    const newCollection = [];

    species.forEach(sp => {
        responses.map(response => {
            if(response.name === sp.name) {
                newCollection.push(sp);
            }
        });
    });

    return newCollection;
};