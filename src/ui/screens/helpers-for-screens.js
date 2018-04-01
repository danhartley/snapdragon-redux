export const renderAnswer = (score) => {

    const names = score.name.split(' ');
    const genus = names[0];
    const species = names[1];

    switch(score.taxon) {
        case 'name':
            return `<span class="right">${score.name}</span>`;
            break;
        case 'genus':
            return `<span class="right">${score.answer}</span> <span>${species}</span>`;
            break;
        case 'species':
            return `<span class="right">${genus}</span> <span>${score.answer}</span>`;
            break;
        default:
            return '';
    }

    return '';
};