import { renderCapital, renderName, renderAnswer, renderAnswerText, nextModule } from 'ui/helpers/helpers-for-screens';

test('renderCapital should return first letter capitalised', () => {
    expect(renderCapital('chives')).toBe('Chives');
    expect(renderCapital('wild chives')).toBe('Wild Chives');
});

test('renderName should return binomial name where the answer is right', () =>{
    const response = { taxon: 'name', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Anagallis arvensis'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Anagallis arvensis');
});

test('renderName should return binomial name where the answer is wrong', () =>{
    const response = { taxon: 'name', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Rosmarinus officinalis'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Anagallis arvensis');
});

test('renderName should return vernacular name when the answer is right', () =>{
    const response = { taxon: 'name', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Scarlet Pimpernel', answer: 'Scarlet Pimpernel'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
});

test('renderName should return vernacular name when the answer is right but case is different', () =>{
    const response = { taxon: 'name', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Scarlet Pimpernel', answer: 'Scarlet Pimpernel'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
});

test('renderName should return vernacular name when the answer is wrong', () =>{
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

test('renderAnswer for correct scientific name from multiple choice', () => {
    const response = { 
        taxon: 'name', 
        binomial: 'Coriandrum sativum', 
        question: 'Coriandrum sativum', 
        answer: 'Coriandrum sativum'
    };
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Coriandrum sativum</span>');
});

test('renderAnswer for incorrect scientific name from multiple choice', () => {
    const response = {    taxon: 'name', binomial: 'Coriandrum sativum', question: 'Coriandrum sativum', answer: 'Anagallis arvensis'}
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Coriandrum sativum</span>');
});

test('renderAnswer for incorrect scientific name from text entry', () => {
    const response = { binomial: 'Rosmarinus officinalis',
    species: 'officinalis',
    genus: 'Rosmarinus',
    taxon: 'name',
    question: 'Rosmarinus officinalis',
    answer: 'Romarinus officialis'}
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Rosmarinus officinalis</span>');
});

test('renderAnswer for correct Genus entry', () => {
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

test('renderAnswer for correct species text entry', () => {
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

test('should renderAnswer for correct vernacular name from multipe choice', () => {
    const response = {
        taxon: 'name',
        binomial: 'Mentha spicata',
        vernacular: 'spearmint',
        question: 'Mentha spicata',
        answer: 'Spearmint'
    };
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Spearmint</span>');
});

test('should renderAnswer for incorrect vernacular name from multipe choice', () => {
    const response = {
        taxon: 'name',
        binomial: 'Rosmarinus officinalis',
        vernacular: 'rosemary',
        question: 'Rosmarinus officinalis',
        answer: 'Coriander'
    };
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Rosemary</span>');
});

test('nextModule returns the next batch of items based on pool, items tested and lesson module size', () => {
    
    const pool = [ {a:1}, {b:2}, {c:3}, {d:4} ];
    const items = [ {a:1}, {b:2} ];
    const moduleSize = 2;

    items.moduleSize = moduleSize;
    items.pool = pool;
    items.poolCount = pool.length;
    items.poolIndex = moduleSize - 1;

    const nextBatch = nextModule(items, pool);
    expect(nextBatch.length).toBe(2);
});
