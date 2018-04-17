import { utils } from 'utils/utils';
import { flora, common, herbs } from 'api/flora';
import { lamiaceae } from 'api/families';

const collections = [
    {
        id: 1,
        collection: lamiaceae,
        name: 'lamiaceae',
        file: 'api/families',
        eol_description: 'Lamiaceae: Mint and Basil Family'
    },
    {
        id: 2,
        name: 'herbs',
        file: 'api/flora',
        eol_description: '12 Common Herbs'
    },
    {
        id: 3,
        name: 'flora',
        file: 'api/flora',
        eol_description: 'Flora Lisboa e Vale do Tejo'
    }
];

export const modules = {
    collections
};