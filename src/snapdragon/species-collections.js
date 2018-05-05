import { flora, common, herbs } from 'api/flora';
import { lamiaceae } from 'api/families';
import { arrabida } from 'api/fauna';
import { wilduk } from 'api/wildflowers';
import { leaf } from 'api/leaf';

export const collections = [
    {
        id: 1,
        type: 'species',
        items: lamiaceae,
        name: 'lamiaceae',
        eol_name: 'Mint and Basil Family',
        eol_link: 'http://eol.org/collections/139275'
    },
    {
        id: 2,
        type: 'species',
        name: 'herbs',
        items: herbs,
        eol_name: 'Common Culinary Herbs',
        eol_link: 'http://eol.org/collections/139051'
    },
    {
        id: 3,
        type: 'species',
        name: 'flora',
        items: flora,
        eol_name: 'Flora Vale do Tejo',
        eol_link: 'http://eol.org/collections/124189'
    },
    {
        id: 4,
        type: 'species',
        name: 'uk wildfowers',
        items: wilduk,
        eol_name: 'British Woodland Flowers',
        eol_link: 'http://eol.org/collections/139458'
    },
    {
        id: 5,
        type: 'species',
        name: 'fauna',
        items: arrabida,
        eol_name: 'Fauna da Arrábida',
        eol_link: 'http://eol.org/collections/139346'
    },
    {
        id: 6,
        type: 'skill',
        name: 'leaf morphology - structure',
        items: leaf[0].structure,
        wiki_name: 'Glossary of leaf morphology',
        wiki_link: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology'
    }
];