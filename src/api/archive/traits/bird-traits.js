import * as traitEnums from 'api/traits/trait-types';

export const getBirdTraits = enums => {    
    const SD = enums && Object.keys(enums).length ? enums : traitEnums.enums;
    return [
    { name: 'Passer domesticus', traits: [
        { name: SD.name.RANK, value: '1', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '416611', description: 'xeno-canto id' },
    ] },
    { name: 'Columba livia', traits: [
        { name: SD.name.SONG, value: '342145', description: 'xeno-canto id' }
    ] },
    { name: 'Troglodytes troglodytes', traits: [
        { name: SD.name.SONG, value: '462617', description: 'xeno-canto id' }
    ] },
    { name: 'Cyanistes caeruleus', traits: [
        { name: SD.name.RANK, value: '3', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '204387', description: 'xeno-canto id' },
    ]  },    
    { name: 'Turdus merula', traits: [
        { name: SD.name.RANK, value: '4', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '421352', description: 'xeno-canto id' },
    ] },
    { name: 'Erithacus rubecula', traits: [
        { name: SD.name.RANK, value: '8', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '403639', description: 'xeno-canto id' },
    ] },
    { name: 'Apus apus', traits: [
        { name: SD.name.SONG, value: '320418', description: 'xeno-canto id' }
    ] },
    { name: 'Sturnus vulgaris', traits: [
        { name: SD.name.RANK, value: '2', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '281735', description: 'xeno-canto id', type: SD.name.SONG },
        { name: SD.name.COLLECTIVE, value: SD.collective.MURMURATION },
    ] },
    { name: 'Columba palumbus', traits: [
        { name: SD.name.RANK, value: '5', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '462148', description: 'xeno-canto id' },
    ] },
    { name: 'Carduelis carduelis', traits: [
        { name: SD.name.RANK, value: '6', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '75593', description: 'xeno-canto id' },
    ] },
    { name: 'Parus major', traits: [
        { name: SD.name.RANK, value: '7', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '422223', description: 'xeno-canto id' },
    ] },
    { name: 'Aegithalos caudatus', traits: [
        { name: SD.name.RANK, value: '9', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '362773', description: 'xeno-canto id' },
    ] },
    { name: 'Fringilla coelebs', traits: [
        { name: SD.name.RANK, value: '10', description: 'common', language: 'en' },
        { name: SD.name.SONG, value: '465544', description: 'xeno-canto id' },
        { name: SD.name.LENGTH, value: '14.5', unit: 'cm' },
        { name: SD.name.VOICE, value: 'Loud \'fink\'. Musical rattle with final flourish', unit: '' },
        // { name: SD.name.LOOK_ALIKES, values: [ 'Fringilla montifringilla', 'Pyrrhula pyrrhula' ]},
    ] },
    { name: 'Garrulus glandarius', traits: [
        { name: SD.name.SONG, value: '363897', description: 'xeno-canto id' },
    ] },
    { name: 'Gallinula chloropus', traits: [
        { name: SD.name.SONG, value: '435793', description: 'xeno-canto id' },
    ] },
    { name: 'Chroicocephalus ridibundus', traits: [
        { name: SD.name.SONG, value: '260311', description: 'xeno-canto id' },
    ] },
    { name: 'Anas platyrhynchos', traits: [
        { name: SD.name.SONG, value: '309258', description: 'xeno-canto id', type: 'flight call' },
    ] },
    { name: 'Ardea cinerea', traits: [
        { name: SD.name.SONG, value: '144318', description: 'xeno-canto id' },
    ] },
    { name: 'Actitis hypoleucos', traits: [
        { name: SD.name.SONG, value: '443741', description: 'xeno-canto id' },
    ] },
    { name: 'Phalacrocorax carbo', traits: [
        { name: SD.name.SONG, value: '385895', description: 'xeno-canto id' },
    ] },
    { name: 'Egretta garzetta', traits: [
        { name: SD.name.SONG, value: '280968', description: 'xeno-canto id' },
    ] },
    { name: 'Arenaria interpres', traits: [
        { name: SD.name.SONG, value: '403054', description: 'xeno-canto id' },
    ] },
    { name: 'Phoenicurus phoenicurus', traits: [
        { name: SD.name.SONG, value: '468777', description: 'xeno-canto id', type: SD.name.SONG },
        { name: SD.name.LOOK_ALIKES, values: [ 'Phoenicurus ochruros' ]},
    ] },
    { name: 'Phoenicurus ochruros', traits: [
        { name: SD.name.SONG, value: '346214', description: 'xeno-canto id', type: SD.name.SONG },
        { name: SD.name.LOOK_ALIKES, values: [ 'Phoenicurus phoenicurus' ]},
    ] },
    { name: 'Branta canadensis', traits: [
        { name: SD.name.SONG, value: '409020', description: 'xeno-canto id' },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.MIGRATORY},
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: SD.food.GRAINS, type: SD.symbiosis.HERBIVORY },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: SD.food.GRASS, type: SD.symbiosis.HERBIVORY },
    ] },
    { name: 'Falco tinnunculus', traits: [
        { name: SD.name.SONG, value: '434309', description: 'xeno-canto id', type: 'flight call' },
        { name: SD.name.LOOK_ALIKES, values: [ 'Accipiter nisus' ]},
        { name: SD.name.ACTIVE, value: SD.active.DIURNAL },
        { name: SD.name.HABITAT, value: `${SD.habitat.HEATH}, ${SD.habitat.FIELDS}, ${SD.habitat.MARSHLAND}` },
        { name: SD.name.DISPLAY, value: SD.display.SEXUAL_COLOUR_DIMORPHISM },
    ] },
    { name: 'Accipiter nisus', traits: [
        { name: SD.name.SONG, value: '309239', description: 'xeno-canto id', type: 'call' },
        { name: SD.name.LOOK_ALIKES, values: [ 'Falco tinnunculus' ]},
    ] },
    { name: 'Hirundo rustica', traits: [
        { name: SD.name.SONG, value: '289357', description: 'xeno-canto id', type: SD.name.SONG },
        { name: SD.name.LOOK_ALIKES, values: [ 'Apus apus', 'Delichon urbicum' ]},
    ] },
    { name: 'Apus apus', traits: [
        { name: SD.name.SONG, value: '302766', description: 'xeno-canto id', type: SD.name.SONG },
        { name: SD.name.LOOK_ALIKES, values: [ 'Hirundo rustica', 'Delichon urbicum' ]},
    ] },
    { name: 'Delichon urbicum', traits: [
        { name: SD.name.SONG, value: '192040', description: 'xeno-canto id', type: 'flight call' },
        { name: SD.name.LOOK_ALIKES, values: [ 'Apus apus', 'Hirundo rustica' ]},
    ] },
];
};