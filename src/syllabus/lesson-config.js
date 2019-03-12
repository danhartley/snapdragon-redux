export const config = {
    language: 'en',
    moduleSize: 2,
    callbackTime: 2000000,
    callbackDelay: 2000000,
    excludeRevision: false,
    isPortraitMode: false,
    isLandscapeMode: true,
    collection: {
        id: 0
    },
    mode: 'learn',
    languages : [
        { name: 'English', lang: 'en' },
        { name: 'Español', lang: 'es' },
        { name: 'Deutsche', lang: 'de' },
        { name: 'Italiano', lang: 'it' },
        { name: 'Français', lang: 'fr' },
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
        studyMethod: 'quick_study',
        speciesRange: 10,
        ready: false
    },    
};