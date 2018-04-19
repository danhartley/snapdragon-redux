import { flora, common, herbs } from 'api/flora';
import { lamiaceae } from 'api/families';

export const collections = [
    {
        id: '1',
        items: lamiaceae,
        name: 'lamiaceae',
        eol_name: 'Mint Family | Lamiaceae',
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
        eol_name: 'Flora Lisboa e Vale do Tejo',
        eol_link: 'http://eol.org/collections/124189'
    }
];