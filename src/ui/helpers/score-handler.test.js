import { capitaliseAll, renderName, answerText } from 'ui/helpers/score-handler';

test('capitaliseAll should return first letter capitalised', () => {
    expect(capitaliseAll('chives')).toBe('Chives');
    expect(capitaliseAll('wild chives')).toBe('Wild Chives');
});

// test('renderName should return binomial name where the answer is snap-success', () =>{
//     const response = { taxon: 'name', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Anagallis arvensis'};
//     const correct = response.answer === response.question;
//     expect(renderName(response, correct)).toBe('Anagallis arvensis');
// });

// test('renderName should return binomial name where the answer is snap-alert', () =>{
//     const response = { taxon: 'name', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Rosmarinus officinalis'};
//     const correct = response.answer === response.question;
//     expect(renderName(response, correct)).toBe('Anagallis arvensis');
// });

// test('renderName should return vernacular name when the answer is snap-success', () =>{
//     const response = { taxon: 'name', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Scarlet Pimpernel', answer: 'Scarlet Pimpernel'};
//     const correct = response.answer === response.question;
//     expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
// });

// test('renderName should return vernacular name when the answer is snap-success but case is different', () =>{
//     const response = { taxon: 'name', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Scarlet Pimpernel', answer: 'Scarlet Pimpernel'};
//     const correct = response.answer === response.question;
//     expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
// });

// test('renderName should return vernacular name when the answer is snap-alert', () =>{
//     const response = { 
//         taxon: 'name', 
//         binomial: 'Anagallis arvensis', 
//         vernacular: 'Scarlet pimpernel', 
//         question: 'Anagallis arvensis', 
//         answer: 'Scarlet pimpernel'
//     };
//     const correct = response.answer === response.question;
//     expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
// });

// test('renderAnswer for correct scientific name from multiple choice', () => {
//     const response = { 
//         taxon: 'name', 
//         binomial: 'Coriandrum sativum', 
//         question: 'Coriandrum sativum', 
//         answer: 'Coriandrum sativum'
//     };
//     expect(answerText(response)).toEqual('Coriandrum sativum');
// });

// test('renderAnswer for incorrect scientific name from multiple choice', () => {
//     const response = {    taxon: 'name', binomial: 'Coriandrum sativum', question: 'Coriandrum sativum', answer: 'Anagallis arvensis'}
//     expect(answerText(response)).toEqual('Coriandrum sativum');
// });

// test('renderAnswer for incorrect scientific name from text entry', () => {
//     const response = { binomial: 'Rosmarinus officinalis',
//     species: 'officinalis',
//     genus: 'Rosmarinus',
//     taxon: 'name',
//     question: 'Rosmarinus officinalis',
//     answer: 'Romarinus officialis'}
//     expect(answerText(response)).toEqual('Rosmarinus officinalis');
// });

// test('renderAnswer for correct Genus entry', () => {
//     const response = {  
//         binomial: 'Allium schoenoprasum',
//         species: 'schoenoprasum',
//         genus: 'Allium',
//         taxon: 'genus',
//         question: 'Allium',
//         answer: 'Allium'
//     };
//     expect(answerText(response)).toEqual('Allium');
// });

// test('renderAnswer for correct species text entry', () => {
//     const response = {
//         binomial: 'Petroselinum crispum',
//         species: 'crispum',
//         genus: 'Petroselinum',
//         taxon: 'species',
//         question: 'crispum',
//         answer: 'crispum'
//     };
//     expect(answerText(response)).toEqual('crispum');
// });

// test('should renderAnswer for correct vernacular name from multipe choice', () => {
//     const response = {
//         taxon: 'name',
//         binomial: 'Mentha spicata',
//         vernacular: 'spearmint',
//         question: 'spearmint',
//         answer: 'Spearmint'
//     };
//     expect(answerText(response)).toEqual('Spearmint');
// });

// test('should renderAnswer for incorrect vernacular name from multipe choice', () => {
//     const response = {
//         taxon: 'name',
//         binomial: 'Rosmarinus officinalis',
//         vernacular: 'rosemary',
//         question: 'rosemary',
//         answer: 'Coriander'
//     };
//     expect(answerText(response)).toEqual('Rosemary');
// });
