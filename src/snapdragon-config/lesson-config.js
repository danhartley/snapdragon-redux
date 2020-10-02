import { enums } from 'ui/helpers/enum-helper';

export const config = {
    language: 'en',
    moduleSize: 4,
    callbackTime: 1500,
    callbackDelay: 1500,
    excludeRevision: false,
    isPortraitMode: false,
    isLandscapeMode: true,
    collection: {
        id: 0
    },
    mode: 'learn',
    languages : [
        { name: 'Deutsche', lang: 'de' },
        { name: 'English', lang: 'en' },
        { name: 'Español', lang: 'es' },
        { name: 'Français', lang: 'fr' },
        { name: 'Italiano', lang: 'it' },
        { name: 'Português', lang: 'pt' }
    ],
    guide: {
        iconicTaxa: null,
        locationLongLat: '',
        locationPlace: '',
        locationType: null,
        place: {
            id: 1,
            name: ''
        },
        speciesRange: 10,
        inatId: { key: '', type: '', param: 'user_id', urlType: 'users' },
        season: {},
        perPage: 200,
        noOfRecords: 10,
        guideMode: enums.guideMode.STATIC.name
    },    
};