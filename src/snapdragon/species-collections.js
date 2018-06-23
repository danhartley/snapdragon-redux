import * as R from 'ramda';

import { herbs1 } from 'api/snapdragon/herbs1';
import { uk1 } from 'api/snapdragon/uk1';
import { med1 } from 'api/snapdragon/med1';

import { leaf } from 'api/leaf';

export const collections = [
    {
        id: 1,
        type: 'species',
        name: 'Herbs 1',
        items: herbs1,
        eol_name: 'Herbs 1',
        eol_link: 'https://eol.org/collections/139051'
    },
    {
        id: 2,
        type: 'species',
        name: 'UK 1 - Woodland',
        items: uk1,
        eol_name: 'UK 1 - Woodland',
        eol_link: 'https://eol.org/collections/139458'
    },
    {
        id: 3,
        type: 'species',
        name: 'Mediterranean 1',
        items: med1,
        eol_name: 'Mediterranean 1',
        eol_link: 'https://eol.org/collections/139572'
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