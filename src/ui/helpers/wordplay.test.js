import { cutter } from 'ui/helpers/wordplay';

test('cutter should return array of letters form input string', () => {

    const species = 'Rosmarinus officinalis';

    expect(cutter(species, 3).length).toEqual(7);
});