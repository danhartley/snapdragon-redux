import * as traitEnums from 'api/traits/trait-types';
import { lichen } from 'api/glossary/lichen';

export const nonTaxaGroup = [
    { LICHEN_FORM: 'Lichen Form' }     
];

export const getNonTaxa = (enums) => {
    const SD = enums || traitEnums;
    return [
        {
            group: nonTaxaGroup[0].LICHEN_FORM,
            id: SD.thallusType.FRUTICOSE,
            type: SD.nonTaxaType.FORM,
            definition: lichen.find(l => l.term === 'Fruticose').definition,
            quickId: 'Free-standing branching tubes',            
            names: [ { language: "en", name: 'Fruticose lichen'}],
            traits: [
                { name: SD.name.SUBSTRATE, value: `${SD.substrate.BARK}, ${SD.substrate.SOIL}, ${SD.substrate.ROCK}` },  
                { name: SD.name.SUBSTRATE_ADHERANCE, value: SD.level.LOW }
            ],
            examples: [ 'Letharia vulpina', 'Evernia prunastri', 'Ramalina polymorpha', 'Roccella phycopsis', 'Ramalina farinacea' ],
            wiki: 'https://en.wikipedia.org/wiki/Fruticose_lichen'
        },
        {
            group: nonTaxaGroup[0].LICHEN_FORM,
            id: SD.thallusType.FOLIOSE,
            type: SD.nonTaxaType.FORM,
            definition: lichen.find(l => l.term === 'Foliose').definition,
            quickId: 'Leaflike, with flat sheets of tissue not tightly bound',
            names: [ { language: "en", name: 'Foliose lichen'}],
            traits: [
                { name: SD.name.SUBSTRATE, value: `${SD.substrate.BARK}, ${SD.substrate.ROCK}` },
                { name: SD.name.SUBSTRATE_ADHERANCE, value: SD.level.LOW },
                { name: SD.name.USAGE, value: SD.usage.FOOD, examples: [ { language: 'en', value: 'Deer, goats, and caribou' } ] },
                { name: SD.name.USAGE, value: SD.usage.BIRDS_NEST },
                { name: SD.name.LIFE_SPAN, value: '30-60a' },
                { name: SD.name.MEDICINAL_PROPERTIES, value: `${SD.medicinalProperties.ANTIBIOTIC}`},
                { name: SD.name.BIOINDICATOR, value: SD.boolean.YES },
                { name: SD.name.SUBSTRATE_ADHERANCE, value: SD.level.LOW }
            ],
            examples: [ 'Lobaria pulmonaria', 'Xanthoria parietina'  ],
            genera: [ 'Usnea', 'Cladonia' ],
            wiki: 'https://en.wikipedia.org/wiki/Foliose_lichen'
        },
        {
            group: nonTaxaGroup[0].LICHEN_FORM,
            id: SD.thallusType.CRUSTOSE,
            type: SD.nonTaxaType.FORM,
            definition: lichen.find(l => l.term === 'Crustose').definition,
            quickId: 'Crustlike, growing tight against the substrate',
            names: [ { language: "en", name: 'Crustose lichen'}],
            traits: [
                { name: SD.name.SUBSTRATE, value: `${SD.substrate.BARK}, ${SD.substrate.ROCK}` },
                { name: SD.name.SUBSTRATE_ADHERANCE, value: SD.level.HIGH }
            ],
            examples: [ 'Graphis scripta', 'Diploschistes scruposus', 'Caloplaca ochracea', 'Ophioparma ventosa' ],
            wiki: 'https://en.wikipedia.org/wiki/Crustose'
        },
        // {
        //     group: nonTaxaGroup[0].LICHEN_FORM,
        //     id: SD.thallusType.SQUAMULOSE,
        //     type: SD.nonTaxaType.FORM,
        //     definition: lichen.find(l => l.term === 'Squamulose').definition,
        //     quickId: 'Tightly clustered and slightly flattened pebble-like units',
        //     names: [ { language: "en", name: 'Squamulose lichen'}],
        //     traits: [
        //         { name: SD.name.SUBSTRATE, value: `${SD.substrate.BARK}, ${SD.substrate.ROCK}` },
        //         { name: SD.name.SUBSTRATE_ADHERANCE, value: SD.level.MEDIUM }
        //     ],
        //     examples: [ 'Squamarina cartilaginea', 'Vahliella leucophaea', 'Cladonia subcervicornis' ],
        //     wiki: 'https://en.wikipedia.org/wiki/Squamulose'
        // },
    ]
}