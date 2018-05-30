import { flora, common, herbs } from 'api/flora';
import { lamiaceae } from 'api/families';
import { arrabida } from 'api/fauna';
import { wilduk } from 'api/wildflowers';
import { leaf } from 'api/leaf';
import { mediterranean } from 'api/mediterranean';

export const collections = [
    {
        id: 1,
        type: 'species',
        items: lamiaceae,
        name: 'lamiaceae',
        eol_name: 'Mint and Basil Family',
        eol_link: 'https://eol.org/collections/139275'
    },
    {
        id: 2,
        type: 'species',
        name: 'herbs',
        items: herbs,
        eol_name: 'Common Culinary Herbs',
        eol_link: 'https://eol.org/collections/139051'
    },
    {
        id: 3,
        type: 'species',
        name: 'flora',
        items: flora,
        eol_name: 'Flora Vale do Tejo',
        eol_link: 'https://eol.org/collections/124189'
    },
    {
        id: 4,
        type: 'species',
        name: 'uk wildfowers',
        items: wilduk,
        eol_name: 'UK Woodland Flowers',
        eol_link: 'https://eol.org/collections/139458'
    },
    {
        id: 5,
        type: 'species',
        name: 'fauna',
        items: arrabida,
        eol_name: 'Fauna da Arrábida',
        eol_link: 'https://eol.org/collections/139346'
    },    
    {
        id: 6,
        type: 'species',
        name: 'mediterranean flora',
        items: mediterranean,
        eol_name: 'Mediterranean Flora',
        eol_link: 'https://eol.org/collections/139572'
    },
    {
        id: 11,
        type: 'skill',
        name: 'leaf morphology - structure',
        items: leaf[0].structure,
        wiki_name: 'Leaf morphology - structure',
        wiki_link: 'https://en.m.wikipedia.org/wiki/Glossary_of_leaf_morphology'
    },
    {
        id: 12,
        type: 'skill',
        name: 'leaf morphology - shape',
        items: leaf[0].shape,
        wiki_name: 'Leaf morphology - shape',
        wiki_link: 'https://en.m.wikipedia.org/wiki/Glossary_of_leaf_morphology'
    }
];