import { cutter } from 'ui/helpers/wordplay';

test('cutter should return array of letters form input string', () => {

    let species = 'Rosmarinus officinalis';
    let cuts = cutter(species);
    expect(cutter(species)).toEqual([ 'Rosm', 'arin', 'usof', 'fici', 'nalis' ]);
    expect('Rosmarinusofficinalis').toEqual([ 'Rosm', 'arin', 'usof', 'fici', 'nalis' ].join(''));
    expect(cutter(species,7)).toEqual([ 'Rosmari', 'nusoffi', 'cinalis']);
    cuts = cutter(species, 7);
    expect('Rosmarinusofficinalis').toEqual([ 'Rosmari', 'nusoffi', 'cinalis'].join(''));

    species = 'Petroselinum crispum';
    expect(cutter(species)).toEqual( ["Petr", "osel", "inum", "cris", "pum"]);

    species = 'Artemisia dracunculus';
    expect(cutter(species)).toEqual( ["Arte", "misi", "adra", "cunc", "ulus"]);

    species = 'Thymus vulgaris';
    expect(cutter(species)).toEqual( ["Thym", "usvu", "lgaris"]);

    species = 'Foeniculum vulgare';
    expect(cutter(species)).toEqual( ["Foen", "icul", "umvu", "lgare"]);

    species = 'Foeniculum vulgare';
    expect(cutter(species,5)).toEqual( ["Foeni", "culum", "vulgare"]);

    species = 'Allium schoenoprasum';
    expect(cutter(species,5)).toEqual( ["Alliu", "mscho", "enopr", "asum"]);

    species = 'Allium schoenoprasum';
    expect(cutter(species,6)).toEqual( ["Allium", "schoen", "oprasum"]);
    
    species = 'Allium schoenoprasum';
    cuts = cutter(species,6);
    expect('Alliumschoenoprasum').toEqual(cuts.join(''));
});