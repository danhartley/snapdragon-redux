import { renderCapital, renderName, renderAnswer, renderAnswerText } from 'ui/helpers/helpers-for-screens';

it('renderCapital should return first letter capitalised', () => {
    expect(renderCapital('chives')).toBe('Chives');
    expect(renderCapital('wild chives')).toBe('Wild Chives');
});

it('renderName should return binomial name where the answer is right', () =>{
    const response = { taxon: 'binomial', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Anagallis arvensis'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Anagallis arvensis');
});

it('renderName should return binomial name where the answer is wrong', () =>{
    const response = { taxon: 'binomial', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Rosmarinus officinalis'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Anagallis arvensis');
});

it('renderName should return vernacular name when the answer is right', () =>{
    const response = { taxon: 'binomial', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Scarlet Pimpernel', answer: 'Scarlet Pimpernel'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
});

it('renderName should return vernacular name when the answer is right but case is different', () =>{
    const response = { taxon: 'binomial', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Scarlet Pimpernel', answer: 'Scarlet Pimpernel'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
});

it('renderName should return vernacular name when the answer is wrong', () =>{
    const response = { taxon: 'binomial', binomial: 'Anagallis arvensis', vernacular: 'Scarlet pimpernel', question: 'Anagallis arvensis', answer: 'Scarlet pimpernel'};
    const correct = response.answer === response.question;
    expect(renderName(response, correct)).toBe('Scarlet Pimpernel');
});

it('renderAnswer should render binomial name with "right" css class when user is correct', () => {
    const response = { taxon: 'binomial', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Anagallis arvensis'};
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Anagallis arvensis</span>');
});

it('renderAnswer should render genus name with "right" css class when user is correct', () => {
    const response = { taxon: 'genus', binomial: 'Anagallis arvensis', question: 'Anagallis', answer: 'Anagallis'};
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Anagallis</span> <span>arvensis</span>');
});

it('renderAnswer should render species name with "right" css class when user is correct', () => {
    const response = { taxon: 'species', binomial: 'Anagallis arvensis', question: 'arvensis', answer: 'arvensis'};
    expect(renderAnswer(response)).toEqual('<span>Anagallis</span> <span class=\"right\">arvensis</span>');
});

it('renderAnswer should render binomial name with "wrong" css class when user is wrong', () => {
    const response = { taxon: 'binomial', binomial: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Rosmarinus officinalis'};
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Anagallis arvensis</span>');
});

it('renderAnswer should render genus name with "wrong" css class when user is correct', () => {
    const response = { taxon: 'genus', binomial: 'Anagallis arvensis', question: 'Anagallis', answer: 'Rosmarinus'};
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Anagallis</span> <span>arvensis</span>');
});

it('renderAnswer should render species name with "wrong" css class when user is correct', () => {
    const response = { taxon: 'species', binomial: 'Anagallis arvensis', question: 'arvensis', answer: 'officinalis'};
    expect(renderAnswer(response)).toEqual('<span>Anagallis</span> <span class=\"wrong\">arvensis</span>');
});

it('renderAnswerText should render text that reflects the response', () => {
    const response = { taxon: 'species', binomial: 'Anagallis arvensis', question: 'arvensis', answer: 'officinalis'};
    expect(renderAnswerText(response)).toEqual('The correct answer is <span>Anagallis</span> <span class=\"wrong\">arvensis</span>.');
});

