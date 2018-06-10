// import { flora, common } from 'api/flora';
import { herbs } from 'api/herbs';
// import { lamiaceae } from 'api/families';
// import { arrabida } from 'api/fauna';
// import { wilduk } from 'api/wildflowers';
import { leaf } from 'api/leaf';
import { mediterranean } from 'api/mediterranean';

export const collections = [
    {
        id: 1,
        type: 'species',
        name: 'herbs',
        items: herbs,
        eol_name: 'Plants 1: Herbs',
        eol_link: 'https://eol.org/collections/139051'
    },
    // 
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