import { flora, common, herbs } from 'api/flora';
import { lamiaceae } from 'api/families';

const collections = [
    {
        id: 1,
        collection: lamiaceae,
        name: 'lamiaceae',
        eol_name: 'Lamiaceae: Mint and Basil Family',
        eol_link: 'http://eol.org/collections/139275'
    },
    {
        id: 2,
        name: 'herbs',
        eol_name: '12 Common Herbs',
        eol_link: 'http://eol.org/collections/139051'
    },
    {
        id: 3,
        name: 'flora',
        eol_name: 'Flora Lisboa e Vale do Tejo',
        eol_link: 'http://eol.org/collections/124189'
    }
];

export const modules = {
    collections
};