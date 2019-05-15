//https://en.wikipedia.org/wiki/List_of_crop_speciesAs_pollinated_by_bees

import * as traitEnums from 'api/traits/trait-types';
import { store } from 'redux/store';

export const getPollinators = SD => {

    SD = SD || store.getState().enums;
    SD = SD && Object.keys(SD).length ? SD : traitEnums.enums;

    return [
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Pastinaca sativa' ], taxon: 'species' },
        speciesB: [{ names: [ 'Amphipyra tragopoginis' ], taxon: 'species' }]
    },
    {
        type: [ 'shelter' ],
        speciesA: { names: [ 'Ficus carica' ], taxon: 'species' },
        speciesB: [{ names: [ 'Blastophaga psenes' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Apiaceae' ], taxon: 'family' },
        speciesB: [{ names: [ 'Xylocopinae', 'Megachilidae', 'Osmia' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Apiaceae' ], taxon: 'family' },
        speciesB: [{ names: [ 'Papilio polyxenes' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Trifolium pratense' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus terrestris' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Primula veris' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus terrestris' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Brassica napus' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus terrestris' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Campanula rotundifolia' ], taxon: 'species' },
        speciesB: [{ names: [ 'Hylaeus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'multiple' ] },
        speciesB: [{ names: [ 'Bombus insularis' ], type: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'multiple' ] },
        speciesB: [{ names: [ 'Osmia lignaria' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Borago officinalis' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus pascuorum', 'Bombus pratorum', 'Bombus terrestris', 'Bombus lucorum' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Tanacetum vulgare' ], taxon: 'species' },
        speciesB: [{ names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Helichrysum italicum' ], taxon: 'species' },
        speciesB: [{ names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Allium schoenoprasum' ], taxon: 'species' },
        speciesB: [{ names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Angelica archangelica' ], taxon: 'species' },
        speciesB: [{ names: [ 'Insecta' ], taxon: 'class' }]
    },    
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Thymus vulgaris' ], taxon: 'species' },
        speciesB: [{ names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Salvia officinalis' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus hortorum' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Lamiaceae' ], taxon: 'family' },
        speciesB: [{ names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Lamiaceae' ], taxon: 'family' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Lamiaceae' ], taxon: 'family' },
        speciesB: [{ names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Lamiaceae' ], taxon: 'family' },
        speciesB: [{ names: [ 'Bombus hortorum' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Digitalis purpurea' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus hortorum' ], taxon: 'species' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Hyssopus officinalis' ], taxon: 'species' },
        speciesB: [{ names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Origanum vulgare' ], taxon: 'species' },
        speciesB: [{ names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Papaver rhoeas' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus', 'Xylocopa' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION, 'pollen' ],
        speciesA: { names: [ 'Papaver rhoeas' ], taxon: 'species' },
        speciesB: [{ names: [ 'Osmia' ], taxon: 'family' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Campanula' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Lamium' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Trifolium' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION, 'forage' ],
        speciesA: { names: [ 'Rosmarinus officinalis' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Carduus' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION, 'nectar' ],
        speciesA: { names: [ 'Geranium' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION, 'nectar' ],
        speciesA: { names: [ 'Ribes' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION, 'pollen' ],
        speciesA: { names: [ 'Rosa' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Erica' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ SD.name.POLLINATION, 'nectar' ],
        speciesA: { names: [ 'Menth' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ SD.name.POLLINATION, 'nectar' ],
        speciesA: { names: [ 'Lavendula' ], taxon: 'genus' },
        speciesB: [{ names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ SD.name.POLLINATION, 'nectar' ],
        speciesA: { names: [ 'Pulicaria dysenterica' ], taxon: 'species' },
        speciesB: [{ names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ SD.name.POLLINATION, 'nectar', 'shelter' ],
        speciesA: { names: [ 'Hedera helix' ], taxon: 'species' },
        speciesB: [{ names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Rutaceae' ], taxon: 'family' },
        animal: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Erinaceinae' ], taxon: 'subfamily' },
        target: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Coccinellidae' ], taxon: 'family' },
        target: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Coccinellidae' ], taxon: 'family' },
        target: { names: [ 'Aphidoidea', 'Coccoidea' ], taxon: 'superfamily' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Apocrita' ], taxon: 'suborder' },
        target: { names: [ 'Aphidoidea' ], taxon: 'superfamily' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Encarsia formosa' ], taxon: 'species' },
        target: { names: [ 'Trialeurodes vaporariorum' ], taxon: 'species' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Nematoda' ], taxon: 'phylum' },
        target: { names: [ 'Trialeurodes vaporariorum' ], taxon: 'species' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Nematoda' ], taxon: 'phylum' },
        target:{ names: [ 'Noctuidae' ], taxon: 'family' },
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Gliocladium roseum' ], taxon: 'species' },
        target:{ names: [ 'Nematoda' ], taxon: 'phylum' },
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Calendula officinalis' ], taxon: 'species' },
        target:{ names: [ 'Nematoda' ], taxon: 'phylum' },
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Solanum tuberosum' ], taxon: 'species' },
        speciesB: [ 
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Apoidea' ], taxon: 'superfamily' } 
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Allium cepa' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Calliphoridae' ], taxon: 'family' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Apium graveolens' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Beta vulgaris' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Syrphidae' ], taxon: 'family' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Capsicum annuum' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Syrphidae' ], taxon: 'family' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Brassica nigra' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    { 
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Brassica oleracea' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Brassica rapa' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Carum carvi' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Daucus carota' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Malus domestica' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Osmia lignaria' ], taxon: 'species' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Vicia faba' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Solanum melongena' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Solanum lycopersicum' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus domestica' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus persica' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus dulcis' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus avium' ], taxon: 'species' },
        speciesB: [{ names: [ 'Apis' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus avium' ], taxon: 'species' },
        speciesB: [{ names: [ 'Xylocopa' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus avium' ], taxon: 'species' },
        speciesB: [{ names: [ 'Megachile' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus avium' ], taxon: 'species' },
        speciesB: [{ names: [ 'Osmia' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus avium' ], taxon: 'species' },
        speciesB: [{ names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Prunus avium' ], taxon: 'species' },
        speciesB: [{ names: [ 'Diptera' ], taxon: 'order' }]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Pyrus communis' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Syrphidae' ], taxon: 'family' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Rubus fruticosus' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Syrphidae' ], taxon: 'family' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Foeniculum vulgare' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Papilio machaon', 'Amphipyra tragopoginis' ], taxon: 'species' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Coriandrum sativum' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Cucumis sativus' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Peponapis' ], taxon: 'genus' },
            { names: [ 'Xenoglossa' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Cucurbita pepo' ], taxon: 'species' },
        speciesB: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Peponapis' ], taxon: 'genus' },
            { names: [ 'Xenoglossa' ], taxon: 'genus' }
        ]
    },
    {
        type: [ SD.name.POLLINATION ],
        speciesA: { names: [ 'Citrus limon' ], taxon: 'species' },
        speciesB: [{  names: [ 'Apis' ], taxon: 'genus' }]
    },
]
};