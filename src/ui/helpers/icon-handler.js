import { iconicTaxa, matchIcon, matchRank } from 'api/snapdragon/iconic-taxa';

const mushroomIcon = '<svg-icon class="si-glyph-mushrooms"><src href="./icons/si-glyph-mushrooms.svg"/></svg>';

export const renderIcon = (item, rootNode) => {

    if(item.taxonomy.kingdom.toLowerCase() === 'fungi') {

        const iconicIconContainer = rootNode.querySelector('.js-iconic-icon');

        iconicIconContainer.innerHTML = `<span class="mushroom-icon-header">${mushroomIcon}</span>`;

    } else {

        const iconicIcon = rootNode.querySelector('.js-iconic-icon i');

        const classes = matchIcon(item.taxonomy, iconicTaxa).split(' ');

        classes.forEach(c => iconicIcon.classList.add(c));   
    }

    return rootNode.querySelector('.js-iconic-icon');
};

export const returnIcon = item => {

    if(item.taxonomy.kingdom.toLowerCase() === 'fungi') {
        return `<span class="mushroom-icon-header">${mushroomIcon}</span>`;
    } else {
        return `<i class="small-icon ${matchIcon(item.taxonomy, iconicTaxa)}"></i>`;
    }
};

export const returnTaxonIcon = taxon => {

    if(taxon.toLowerCase() === 'fungi') {
        return `<span class="iconic-taxa-categories-selected">${mushroomIcon}</span>`;

    } else {
        return `<span><i class="small-icon ${matchRank(taxon)}"></i></span>`;
    }
};