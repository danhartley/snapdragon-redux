import { iconicTaxa, matchIcon } from 'api/snapdragon/iconic-taxa';

export const renderIcon = (item, rootNode) => {

    if(item.taxonomy.kingdom.toLowerCase() === 'fungi') {

        const iconicIconContainer = rootNode.querySelector('.js-iconic-icon');

        iconicIconContainer.innerHTML = '<span class="mushroom-icon-header"><svg-icon><src href="./icons/si-glyph-mushrooms.svg"/></svg></span>';

    } else {

        const iconicIcon = rootNode.querySelector('.js-iconic-icon i');

        const classes = matchIcon(item.taxonomy, iconicTaxa).split(' ');

        classes.forEach(c => iconicIcon.classList.add(c));        
    }
};

export const returnIcon = item => {

    if(item.taxonomy.kingdom.toLowerCase() === 'fungi') {

        return '<span class="mushroom-icon-header"><svg-icon><src href="./icons/si-glyph-mushrooms.svg"/></svg></span>';

    } else {

        return `<i class="small-icon ${matchIcon(item.taxonomy, iconicTaxa)}"></i>`;
    }
};