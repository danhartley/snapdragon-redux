import { renderCapital, renderName, renderAnswer, renderAnswerText } from 'ui/helpers/helpers-for-screens';

it('renderCapital should return first letter capitalised', () => {
    expect(renderCapital('chives')).toBe('Chives');
    expect(renderCapital('wild chives')).toBe('Wild Chives');
});

it('renderName should return binomial name where the answer is right', () =>{
    const response = { taxon: 'name', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Anagallis arvensis'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Anagallis arvensis');
});

it('renderName should return binomial name where the answer is wrong', () =>{
    const response = { taxon: 'name', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Rosmarinus officinalis'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Anagallis arvensis');
});

it('renderName should return vernacular name when the answer is right', () =>{
    const response = { taxon: 'name', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Scarlet Pimpernel', answer: 'Scarlet Pimpernel'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
});

it('renderName should return vernacular name when the answer is right but case is different', () =>{
    const response = { taxon: 'name', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Scarlet Pimpernel', answer: 'Scarlet Pimpernel'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
});

it('renderName should return vernacular name when the answer is wrong', () =>{
    const response = { 
        taxon: 'name', 
        binomial: 'Anagallis arvensis', 
        vernacular: 'Scarlet pimpernel', 
        question: 'Anagallis arvensis', 
        answer: 'Scarlet pimpernel'
    };
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
});

it('renderAnswer for correct scientific name from multiple choice', () => {
    const response = { 
        taxon: 'name', 
        binomial: 'Coriandrum sativum', 
        question: 'Coriandrum sativum', 
        answer: 'Coriandrum sativum'
    };
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Coriandrum sativum</span>');
});

it('renderAnswer for incorrect scientific name from multiple choice', () => {
    const response = {    taxon: 'name', binomial: 'Coriandrum sativum', question: 'Coriandrum sativum', answer: 'Anagallis arvensis'}
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Coriandrum sativum</span>');
});

it('renderAnswer for incorrect scientific name from text entry', () => {
    const response = { binomial: 'Rosmarinus officinalis',
    species: 'officinalis',
    genus: 'Rosmarinus',
    taxon: 'name',
    question: 'Rosmarinus officinalis',
    answer: 'Romarinus officialis'}
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Rosmarinus officinalis</span>');
});

it('renderAnswer for correct Genus entry', () => {
    const response = {  
        binomial: 'Allium schoenoprasum',
        species: 'schoenoprasum',
        genus: 'Allium',
        taxon: 'genus',
        question: 'Allium',
        answer: 'Allium'
    };
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Allium</span> <span>schoenoprasum</span>');
});

it('renderAnswer for correct species text entry', () => {
    const response = {
        binomial: 'Petroselinum crispum',
        species: 'crispum',
        genus: 'Petroselinum',
        taxon: 'species',
        question: 'crispum',
        answer: 'crispum'
    };
    expect(renderAnswer(response)).toEqual('<span>Petroselinum</span> <span class=\"right\">crispum</span>');
});

it('should renderAnswer for correct vernacular name from multipe choice', () => {
    const response = {
        taxon: 'name',
        binomial: 'Mentha spicata',
        vernacular: 'spearmint',
        question: 'Mentha spicata',
        answer: 'Spearmint'
    };
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Spearmint</span>');
});

it('should renderAnswer for incorrect vernacular name from multipe choice', () => {
    const response = {
        taxon: 'name',
        binomial: 'Rosmarinus officinalis',
        vernacular: 'rosemary',
        question: 'Rosmarinus officinalis',
        answer: 'Coriander'
    };
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Rosemary</span>');
});
