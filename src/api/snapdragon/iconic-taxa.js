import * as R from 'ramda';

export const iconicTaxa = {

    // kingdom
    FUNGI: 'Fungi',
    PLANTAE: 'Plants',

    // phlyum
    MOLLUSCA: 'Mollusks',

    // class
    AVES: 'Birds',
    AMPHIBIA: 'Amphibians',
    REPTILIA: 'Reptilians',
    MAMMALIA: 'Mammals',
    INSECTA: 'Insects',
    ACTINOPTERYGII: 'Ray-finned fishes',
    ARACHNIDA: 'Arachnids',

    //order
    LEPIDOPTERA: 'Lepidoptera'
};

export const matchTaxonKey = (taxonomy, iconicTaxaKeys) => {
    if(taxonomy.order && R.contains(taxonomy.order.toLowerCase(), iconicTaxaKeys)) return taxonomy.order.toLowerCase();
    if(taxonomy.class && R.contains(taxonomy.class.toLowerCase(), iconicTaxaKeys)) return taxonomy.class.toLowerCase();
    if(taxonomy.kingdom && R.contains(taxonomy.kingdom.toLowerCase(), iconicTaxaKeys)) return taxonomy.kingdom.toLowerCase();
}

export const matchTaxon = (taxonomy, iconicTaxa) => {
    if(!taxonomy) return false;
    let iconicTaxaKeys = Object.keys(iconicTaxa).map(key => key.toLowerCase());
    return matchTaxonKey(taxonomy, iconicTaxaKeys);
};

export const matchIcon = (taxonomy, iconicTaxa) => {
    if(!taxonomy) return '';
    const rank = matchTaxon(taxonomy, iconicTaxa).toLowerCase();
    let icon;
    switch(rank) {
        case 'aves':
            icon = 'fas fa-dove';
            break;
        case 'lepidoptera':
            icon = 'fas fa-barcode';
            break;
        case 'amphibia':
            icon = 'fas fa-frog';
            break;
        case 'mammalia':
            icon = 'fas fa-paw';
            break;
        case 'insecta':
            icon = 'fas fa-bug';
            break;
        case 'fungi':
            icon = './icons/mushroom.svg';
            break;
        case 'plantae':
            icon = 'fas fa-leaf';
            break;
    }
    return icon;
}