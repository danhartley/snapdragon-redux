export const config = {
    language: 'en',
    moduleSize: 4,
    callbackTime: 1500,
    callbackDelay: 2000,
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
        iconicTaxa: [],
        locationLongLat: '',
        locationPlace: '',
        locationType: null,
        place: {
            id: 1,
            name: ''
        },
        // studyMethod: 'quick_study',
        speciesRange: 10,
        ready: false,
        inatId: { key: '', type: '', param: 'user_id' },
        season: {},
        operation: ''
    },    
};