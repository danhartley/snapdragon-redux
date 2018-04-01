import { renderAnswer } from 'ui/screens/helpers-for-screens';

it('renderAnswer should...', () => {

    const score = { taxon: 'name', name: 'Anagallis arvensis', question: 'Anagallis arvensis'};

    expect(renderAnswer(score)).toEqual('<span class=\"right\">Anagallis arvensis</span>');
});