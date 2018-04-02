export const renderAnswer = (response) => {

    const names = response.name.split(' ');
    const genus = names[0];
    const species = names[1];

    const right = response.answer === response.question;
    const className = right ? 'right' : 'wrong';

    switch(response.taxon) {
        case 'name':
            return `<span class="${className}">${response.name}</span>`;
            break;
        case 'genus':
            return right
                ? `<span class="${className}">${response.answer}</span> <span>${species}</span>`
                : `<span class="${className}">${genus}</span> <span>${species}</span>`;
            break;
        case 'species':
            return right
                ? `<span>${genus}</span> <span class="${className}">${response.answer}</span>`
                : `<span>${genus}</span> <span class="${className}">${species}</span>`;
            break;
        default:
            return '';
    }
};