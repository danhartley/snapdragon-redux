import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';
import { getBirdSong } from 'xeno-canto/birdsong';
import { lookalikeSpecies } from 'ui/screens/common/look-alikes';
import { renderFeatures } from 'ui/screens/common/feature';
import { infoSlider } from 'ui/screens/common/info-slider';
import { iconicTaxa, matchTaxon } from 'api/snapdragon/iconic-taxa';
import { renderIcon } from 'ui/helpers/icon-handler';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';
import { renderInatDataBox } from 'ui/screens/common/inat-box';
import { renderCalendar } from 'ui/screens/common/calendar';
import { renderTaxaBox } from 'ui/screens/common/taxa-box';
import { renderBadge } from 'ui/screens/common/badge';

import cardTemplate from 'ui/screens/cards/card-template.html';

export const renderCard = (collection, mode = 'STAND_ALONE', selectedItem, parent = DOM.rightBody, isInCarousel = true) => {

    const item = selectedItem || collection.nextItem;

    const { layout, config, enums } = store.getState();

    let rootNode;

    switch(mode) {
        case 'STAND_ALONE':
            rootNode = document.querySelector('.right-body');
            break;
        case 'SWAP_OUT':
            rootNode = document.querySelector('.js-species-container');
            break;
        case 'MODAL':
            rootNode = document.querySelector('#cardModal');
            break;
    }

    if(mode === 'STAND-ALONE') {        
        const screen = layout.screens.filter(el => el.name === 'species-card')[0];
        if(!screen) return;
    }

    const prev = document.querySelector('#cardModal .js-prev');
    const next = document.querySelector('#cardModal .js-next');

    if(prev) isInCarousel ? prev.classList.remove('hide-important') : prev.classList.add('hide-important');
    if(next) isInCarousel ? next.classList.remove('hide-important') : next.classList.add('hide-important');
    
    const template = document.createElement('template');

    template.innerHTML = cardTemplate;

    renderCommonParts(template, config, item, collection, mode, parent, rootNode, isInCarousel);

    config.isPortraitMode
        ? renderPortrait(item, config, mode, rootNode)
        : renderLandscape(item, config, mode, rootNode);
};

const renderLandscape = (item, config, mode, rootNode) => {

    const src = rootNode.querySelector('.js-bird-song');
    
    getBirdSong(item, src, config.isPortraitMode);

    const inatNode = rootNode.querySelector('.js-inat-box');

    renderInatDataBox(inatNode, item, config, mode);

    lookalikeSpecies(item, config, rootNode);
};

const renderPortrait = (item, config, mode, rootNode) => {

    const images = prepImagesForCarousel(item, config, imageUseCases.SPECIES_CARD);

    const parent = rootNode.querySelector('.js-species-card-images');

    imageSlider({ config, images, parent, disableModal: mode === 'MODAL', parentScreen: rootNode.querySelector('.card-card'), identifier: 'card-card' });

    const player = rootNode.querySelector('.js-bird-song-player');

    if(mode =='MODAL') {
        player.style.display = 'none';
        return;
    };

    getBirdSong(item, player, config.isPortraitMode);

    player.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.id = 'birdsong';
        iframe.style.border = 0;
        iframe.src = player.dataset.src;
        document.querySelector('#menuModal .modal-body').classList.add('bird-song-bg');
        document.querySelector('#menuModal .js-modal-text-title').innerHTML = `${item.name}`;
        const elm = document.querySelector('#menuModal .js-modal-text');
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
         }
        elm.appendChild(iframe);
    });
};

const renderCommonParts = (template, config, item, collection, mode, parent, rootNode, isInCarousel) => {

    const name = item.name;
          item.vernacularName = item.vernacularName || itemProperties.getVernacularName(item, config);
    const familyVernacularNames = item.family.names.find(props => props.language === config.language).names;
    const familyVernacularName = familyVernacularNames ? familyVernacularNames[0] : '';
        
    const headerImage = scaleImage({ url: item.icon || item.images[0].url }, imageUseCases.SPECIES_CARD, config);
    
    const names = [ ...new Set(item.names.filter(name => name.language === config.language).map(name => name.vernacularName.toLowerCase())) ];
    const occurrences = names.length;

    const iconicTaxon = matchTaxon(item.taxonomy, iconicTaxa).value;

    const clone = document.importNode(template.content, true);
    
    parent.innerHTML = '';
    
    renderTemplate({ name, vernacularName: item.vernacularName, headerImage, occurrences, iconicTaxon }, template.content, parent, clone);

    const taxaBoxNode = rootNode.querySelector('.js-taxa-box');

    renderTaxaBox(taxaBoxNode, { item, familyName: item.taxonomy.family, familyVernacularName });

    infoSlider(item, item.family, rootNode.querySelector('.js-info-box'), mode);

    const badge = rootNode.querySelector('.js-names-badge');

    renderBadge(badge, occurrences, names);
    
    renderFeatures(item, config, rootNode.querySelector('.js-feature-types'), mode, isInCarousel, collection);
    
    const calendarNode = rootNode.querySelector('.js-calendar-box');

    renderCalendar(calendarNode, item, config);

    renderIcon(item.taxonomy, rootNode);

    if(mode === 'MODAL') {      
          
        rootNode.querySelector('#cardModal .js-modal-text-title').innerHTML = collection.name;

        const prev = rootNode.querySelector('#cardModal .js-prev > span');
        prev.dataset.id = item.id;
        prev.dataset.transition = 'prev';
        prev.dataset.modal = 'cardModal';

        const next = rootNode.querySelector('#cardModal .js-next > span');
        next.dataset.id = item.id;
        next.dataset.transition = 'next';
        next.dataset.modal = 'cardModal';
        
        const lines = document.getElementsByTagName('hr');

        Array.from(lines).forEach(hr => hr.style.display = 'none');
    }
};