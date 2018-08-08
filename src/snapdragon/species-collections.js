import * as R from 'ramda';

// import { herbs1 } from 'api/snapdragon/herbs1';
// import { uk1 } from 'api/snapdragon/uk1';
// import { med1 } from 'api/snapdragon/med1';
import { herbsAndSpices } from 'api/snapdragon/herbs-and-spices';
import { vegetables } from 'api/snapdragon/vegetables';
import { fruit } from 'api/snapdragon/fruit';
import { insects } from 'api/snapdragon/insects';
import { nationalFlowers } from 'api/snapdragon/national-flowers';

import { leaf } from 'api/leaf';

export const collections = [
    {
        id: 1,
        type: 'species',
        name: 'Herbs',
        // items: herbs1,
        eol_name: 'Herbs 1',
        eol_link: 'https://eol.org/collections/139051'
    },
    {
        id: 2,
        type: 'species',
        name: 'UK Woodland',
        // items: uk1,
        eol_name: 'UK 1 - Woodland',
        eol_link: 'https://eol.org/collections/139458'
    },
    {
        id: 3,
        type: 'species',
        name: 'Mediterranean',
        // items: med1,
        eol_name: 'Mediterranean 1',
        eol_link: 'https://eol.org/collections/139572'
    },
    {
        id: 4,
        type: 'species',
        name: 'Herbs and Spices',
        items: herbsAndSpices,
        eol_name: 'Herbs and Spices',
        eol_link: 'https://eol.org/collections/139051'
    },
    {
        id: 5,
        type: 'species',
        name: 'Vegetables',
        items: vegetables,
        eol_name: 'Vegetables',
        eol_link: 'https://eol.org/collections/140088'
    },
    {
        id: 6,
        type: 'species',
        name: 'Fruit',
        items: fruit,
        eol_name: 'Fruit',
        eol_link: 'https://eol.org/collections/140297'
    },
    {
        id: 7,
        type: 'species',
        name: 'Insects',
        items: insects,
        eol_name: 'Insects',
        eol_link: 'https://eol.org/collections/140494'
    },
    {
        id: 8,
        type: 'species',
        name: 'National Flowers',
        items: R.take(4, nationalFlowers),
        eol_name: 'National Flowers',
        eol_link: 'https://eol.org/collections/140523'
    },
    {
        id: 101,
        type: 'skill',
        name: 'leaf morphology - structure',
        items: leaf[0].structure,
        wiki_name: 'Leaf morphology - structure',
        wiki_link: 'https://en.m.wikipedia.org/wiki/Glossary_of_leaf_morphology'
    },
    {
        id: 102,
        type: 'skill',
        name: 'leaf morphology - shape',
        items: leaf[0].shape,
        wiki_name: 'Leaf morphology - shape',
        wiki_link: 'https://en.m.wikipedia.org/wiki/Glossary_of_leaf_morphology'
    }
];