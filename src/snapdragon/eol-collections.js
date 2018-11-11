import { deciduousAndEvergreenTrees } from 'api/rhs/deciduous-evergreen-trees';
import { herbsAndSpices } from 'api/snapdragon/herbs-and-spices';
import { vegetables } from 'api/snapdragon/vegetables';
import { fruit } from 'api/snapdragon/fruit';
import { insects } from 'api/snapdragon/insects';
import { birds } from 'api/snapdragon/common-city-birds';
import { mushrooms } from 'api/snapdragon/mushrooms';
import { weeds1 } from 'api/rhs/weeds1';
import { lichen } from 'api/snapdragon/lichen';

import { leaf } from 'api/leaf';

export const collections = [
    {
        id: 1,
        type: 'species',
        name: 'Kitchen Garden',
        items: [ ...herbsAndSpices, ...vegetables, ...fruit, ...insects ],
        eol_name: 'Herbs and Spices, Vegetables, Fruits, Insects',
        eol_link: ''        
    },
    {
        id: 2,
        type: 'species',
        name: 'Trees',
        items: deciduousAndEvergreenTrees,
        eol_name: 'RHS Deciduous and evergreen trees',
        eol_link: 'https://eol.org/collections/140596'
    },
    {
        id: 3,
        type: 'species',
        name: 'RSPB Top 10 UK Birds',
        items: birds,
        eol_name: '13 Common City Birds',
        eol_link: 'https://eol.org/collections/140683'
    },
    {
        id: 4,
        type: 'species',
        name: 'RHS Weeds 1',
        items: weeds1,
        eol_name: 'WEEDS I',
        eol_link: 'https://eol.org/collections/140731'        
    },
    {
        id: 5,
        type: 'species',
        name: 'Mushrooms',
        items: mushrooms,
        eol_name: 'Mushroom Quiz',
        eol_link: 'https://eol.org/collections/140498'        
    },  
    // {
    //     id: 6,
    //     type: 'species',
    //     name: 'Mushrooms',
    //     items: [],
    //     eol_name: '',
    //     eol_link: ''        
    // },  
    {
        id: 6,
        type: 'species',
        name: 'Lichen',
        items: lichen,
        eol_name: '',
        eol_link: ''        
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