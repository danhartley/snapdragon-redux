import * as traitEnums from 'api/traits/trait-types';

export const getBirdTraits = (enums) => {
    const SD = enums || traitEnums;
    return [
    { name: 'Passer domesticus', traits: [
        { name: SD.name.RANK, value: '1', description: 'common', language: 'en' },
        { name: 'song', value: '416611', description: 'xeno-canto id' },
    ] },
    { name: 'Columba livia', traits: [
        { name: 'song', value: '342145', description: 'xeno-canto id' }
    ] },
    { name: 'Troglodytes troglodytes', traits: [
        { name: 'song', value: '432786', description: 'xeno-canto id' }
    ] },
    { name: 'Cyanistes caeruleus', traits: [
        { name: SD.name.RANK, value: '3', description: 'common', language: 'en' },
        { name: 'song', value: '431038', description: 'xeno-canto id' },
    ]  },    
    { name: 'Turdus merula', traits: [
        { name: SD.name.RANK, value: '4', description: 'common', language: 'en' },
        { name: 'song', value: '421352', description: 'xeno-canto id' },
    ] },
    { name: 'Erithacus rubecula', traits: [
        { name: SD.name.RANK, value: '8', description: 'common', language: 'en' },
        { name: 'song', value: '401271', description: 'xeno-canto id' },
    ] },
    { name: 'Apus apus', traits: [
        { name: 'song', value: '429082', description: 'xeno-canto id' }
    ] },
    { name: 'Sturnus vulgaris', traits: [
        { name: SD.name.RANK, value: '2', description: 'common', language: 'en' },
        { name: 'song', value: '431714', description: 'xeno-canto id' },
    ] },
    { name: 'Columba palumbus', traits: [
        { name: SD.name.RANK, value: '5', description: 'common', language: 'en' },
        { name: 'song', value: '429089', description: 'xeno-canto id' },
    ] },
    { name: 'Carduelis carduelis', traits: [
        { name: SD.name.RANK, value: '6', description: 'common', language: 'en' },
        { name: 'song', value: '416636', description: 'xeno-canto id' },
    ] },
    { name: 'Parus major', traits: [
        { name: SD.name.RANK, value: '7', description: 'common', language: 'en' },
        { name: 'song', value: '422223', description: 'xeno-canto id' },
    ] },
    { name: 'Aegithalos caudatus', traits: [
        { name: SD.name.RANK, value: '9', description: 'common', language: 'en' },
        { name: 'song', value: '404853', description: 'xeno-canto id' },
    ] },
    { name: 'Fringilla coelebs', traits: [
        { name: SD.name.RANK, value: '10', description: 'common', language: 'en' },
        { name: 'song', value: '426190', description: 'xeno-canto id' },
        { name: SD.name.LENGTH, value: '14.5cm' },
        { name: SD.name.VOICE, value: 'Loud \'fink\'. Musical rattle with final flourish' },
        { name: SD.name.LOOK_ALIKES, values: [ 'Fringilla montifringilla', 'Pyrrhula pyrrhula' ]},
    ] },
    { name: 'Garrulus glandarius', traits: [
        { name: 'song', value: '363897', description: 'xeno-canto id' },
    ] },
    { name: 'Gallinula chloropus', traits: [
        { name: 'song', value: '435793', description: 'xeno-canto id' },
    ] },
    { name: 'Chroicocephalus ridibundus', traits: [
        { name: 'song', value: '260311', description: 'xeno-canto id' },
    ] },
    { name: 'Anas platyrhynchos', traits: [
        { name: 'song', value: '160324', description: 'xeno-canto id' },
    ] },
    { name: 'Ardea cinerea', traits: [
        { name: 'song', value: '144318', description: 'xeno-canto id' },
    ] },
    { name: 'Actitis hypoleucos', traits: [
        { name: 'song', value: '443741', description: 'xeno-canto id' },
    ] },
    { name: 'Phalacrocorax carbo', traits: [
        { name: 'song', value: '385895', description: 'xeno-canto id' },
    ] },
    { name: 'Egretta garzetta', traits: [
        { name: 'song', value: '280968', description: 'xeno-canto id' },
    ] },
    { name: 'Arenaria interpres', traits: [
        { name: 'song', value: '403054', description: 'xeno-canto id' },
    ] },
    ];
};