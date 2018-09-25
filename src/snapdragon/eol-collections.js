import { deciduousAndEvergreenTrees } from 'api/rhs/deciduous-evergreen-trees';
import { herbsAndSpices } from 'api/snapdragon/herbs-and-spices';
import { vegetables } from 'api/snapdragon/vegetables';
import { fruit } from 'api/snapdragon/fruit';
import { insects } from 'api/snapdragon/insects';
import { commonCityBirds } from 'api/snapdragon/common-city-birds';
import { mushroomQuiz } from 'api/snapdragon/mushroom-quiz';
import { mushrooms1 } from 'api/snapdragon/mushrooms1';
import { weeds1 } from 'api/rhs/weeds1';

import { leaf } from 'api/leaf';

export const collections = [
    {
        id: 1,
        type: 'species',
        name: 'Trees',
        items: deciduousAndEvergreenTrees,
        eol_name: 'RHS Deciduous and evergreen trees',
        eol_link: 'https://eol.org/collections/140596'
    },
    {
        id: 2,
        type: 'species',
        name: 'Herbs and Spices',
        items: herbsAndSpices,
        eol_name: 'Herbs and Spices',
        eol_link: 'https://eol.org/collections/139051'
    },
    {
        id: 3,
        type: 'species',
        name: 'Vegetables',
        items: vegetables,
        eol_name: 'Vegetables',
        eol_link: 'https://eol.org/collections/140088'
    },
    {
        id: 4,
        type: 'species',
        name: 'Fruit',
        items: fruit,
        eol_name: 'Fruit',
        eol_link: 'https://eol.org/collections/140297'
    },
    {
        id: 5,
        type: 'species',
        name: 'Insects',
        items: insects,
        eol_name: 'Insects',
        eol_link: 'https://eol.org/collections/140494'
    },
    {
        id: 6,
        type: 'species',
        name: 'RSPB Top 10 UK Birds',
        items: commonCityBirds,
        eol_name: '13 Common City Birds',
        eol_link: 'https://eol.org/collections/140683'
    },
    {
        id: 7,
        type: 'species',
        name: 'RHS Weeds 1',
        items: weeds1,
        eol_name: 'WEEDS I',
        eol_link: 'https://eol.org/collections/140731'        
    },
    {
        id: 8,
        type: 'species',
        name: 'Mushroom Quiz',
        items: mushroomQuiz,
        eol_name: 'Mushroom Quiz',
        eol_link: 'https://eol.org/collections/140498'        
    },
    {
        id: 9,
        type: 'species',
        name: 'Mushrooms I',
        items: mushrooms1,
        eol_name: 'Mushroom Quiz',
        eol_link: 'https://eol.org/collections/140498'        
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