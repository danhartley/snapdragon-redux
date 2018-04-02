import { renderAnswer, renderAnswerText } from 'ui/screens/helpers-for-screens';

it('renderAnswer should render binomial name with "right" css class when user is correct', () => {
    const response = { taxon: 'name', name: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Anagallis arvensis'};
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Anagallis arvensis</span>');
});

it('renderAnswer should render genus name with "right" css class when user is correct', () => {
    const response = { taxon: 'genus', name: 'Anagallis arvensis', question: 'Anagallis', answer: 'Anagallis'};
    expect(renderAnswer(response)).toEqual('<span class=\"right\">Anagallis</span> <span>arvensis</span>');
});

it('renderAnswer should render species name with "right" css class when user is correct', () => {
    const response = { taxon: 'species', name: 'Anagallis arvensis', question: 'arvensis', answer: 'arvensis'};
    expect(renderAnswer(response)).toEqual('<span>Anagallis</span> <span class=\"right\">arvensis</span>');
});

it('renderAnswer should render binomial name with "wrong" css class when user is wrong', () => {
    const response = { taxon: 'name', name: 'Anagallis arvensis', question: 'Anagallis arvensis', answer: 'Rosmarinus officinalis'};
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Anagallis arvensis</span>');
});

it('renderAnswer should render genus name with "wrong" css class when user is correct', () => {
    const response = { taxon: 'genus', name: 'Anagallis arvensis', question: 'Anagallis', answer: 'Rosmarinus'};
    expect(renderAnswer(response)).toEqual('<span class=\"wrong\">Anagallis</span> <span>arvensis</span>');
});

it('renderAnswer should render species name with "wrong" css class when user is correct', () => {
    const response = { taxon: 'species', name: 'Anagallis arvensis', question: 'arvensis', answer: 'officinalis'};
    expect(renderAnswer(response)).toEqual('<span>Anagallis</span> <span class=\"wrong\">arvensis</span>');
});

it('renderAnswerText should render text that reflects the response', () => {
    const response = { taxon: 'species', name: 'Anagallis arvensis', question: 'arvensis', answer: 'officinalis'};
    expect(renderAnswerText(response)).toEqual('Oh no! The correct answer was <span>Anagallis</span> <span class=\"wrong\">arvensis</span>.');
});

