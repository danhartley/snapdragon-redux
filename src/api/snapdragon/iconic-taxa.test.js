import { iconicTaxa, matchTaxon, matchIcon, findRankByIconicTaxon } from 'api/snapdragon/iconic-taxa';

test('walk up taxonomic tree of an item until a matching iconic taxon is found', () => {
    let item = { taxonomy: { order: '', class: 'aves' } };
    expect(matchTaxon(item.taxonomy, iconicTaxa).value).toEqual('aves');
    item = {
        taxonomy: {
            kingdom: 'fungi'
        }
    }
    expect(matchTaxon(item.taxonomy, iconicTaxa).value).toEqual('fungi')
});

test('given iconic taxon return appropriate icon class', () => {
    let item = { taxonomy: { class: 'aves' } }; 
    expect(matchIcon(item.taxonomy, iconicTaxa)).toEqual('fas fa-dove');
    item = { taxonomy: { class: 'amphibia' } }; 
    expect(matchIcon(item.taxonomy, iconicTaxa)).toEqual('fas fa-frog');
    item = { taxonomy: { kingdom: 'mammalia' } }; 
    expect(matchIcon(item.taxonomy, iconicTaxa)).toEqual('fas fa-paw');
    item = { taxonomy: { class: 'insecta' } }; 
    expect(matchIcon(item.taxonomy, iconicTaxa)).toEqual('fas fa-bug');
    item = { taxonomy: { kingdom: 'fungi' } }; 
    expect(matchIcon(item.taxonomy, iconicTaxa)).toEqual('./icons/mushroom.svg');
    item = { taxonomy: { kingdom: 'plantae' } }; 
    expect(matchIcon(item.taxonomy, iconicTaxa)).toEqual('fas fa-leaf');
});

test('given taxonomy and rank value, return rank', () => {
    const taxonomy = {
        "class": "Aves",
        "family": "Anatidae",
        "kingdom": "Animalia",
        "order": "Anseriformes",
        "phylum": "Chordata",
        "genus": "Anas",
        "species": "platyrhynchos"
    };
    const iconicTaxon = 'Aves';
    expect(findRankByIconicTaxon(taxonomy, iconicTaxon)).toEqual('class');
});