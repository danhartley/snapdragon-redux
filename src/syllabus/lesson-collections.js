import { flora, common, herbs } from 'api/flora';
import { lamiaceae } from 'api/families';
import { arrabida } from 'api/fauna';
import { wilduk } from 'api/wildflowers';

export const collections = [
    {
        id: '1',
        items: lamiaceae,
        name: 'lamiaceae',
        eol_name: 'Mint and Basil Family',
        eol_link: 'http://eol.org/collections/139275'
    },
    {
        id: '2',
        name: 'herbs',
        items: herbs,
        eol_name: 'Common Culinary Herbs',
        eol_link: 'http://eol.org/collections/139051'
    },
    {
        id: '3',
        name: 'flora',
        items: flora,
        eol_name: 'Flora Vale do Tejo',
        eol_link: 'http://eol.org/collections/124189'
    },
    {
        id: '4',
        name: 'uk wildfowers',
        items: wilduk,
        eol_name: 'British Woodland Flowers',
        eol_link: 'http://eol.org/collections/139458'
    },
    {
        id: '5',
        name: 'fauna',
        items: arrabida,
        eol_name: 'Fauna da Arrábida',
        eol_link: 'http://eol.org/collections/139346'
    }
];