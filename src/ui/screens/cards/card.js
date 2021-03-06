import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';
import { getBirdSong } from 'xeno-canto/birdsong';
import { lookalikeSpecies } from 'ui/screens/common/look-alikes';
import { infoSlider } from 'ui/screens/common/info-slider';
import { renderIcon } from 'ui/helpers/icon-handler';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handler';
import { renderInatDataBox } from 'ui/screens/common/inat/inat-box';
import { renderCalendar } from 'ui/screens/common/calendar';
import { renderTaxaBox } from 'ui/screens/common/taxa-box';
import { renderBadge } from 'ui/screens/common/badge';
import { enums } from 'ui/helpers/enum-helper';
import { firestore } from 'api/firebase/firestore';

import cardTemplate from 'ui/screens/cards/card-template.html';

export const renderCard = (collection, mode = 'STAND_ALONE', selectedItem, parent = DOM.rightBody, isInCarousel = true) => {

    if(!selectedItem) return;

    const { layout, config } = store.getState();

    let item;

    const init = async () => {

            const getItemWithProps = async item => {

            if(item.eolId) return new Promise(resolve => resolve(item));
            
            const getItem = async item => {
                return item.family
                            ? new Promise(resolve => resolve(item))
                            : await firestore.getSpeciesByName(item.name);
            };

            const itemWithProps = await getItem(item);
            
            itemWithProps.family = await firestore.getTaxonByName(config, itemWithProps.taxonomy[enums.taxon.FAMILY.name.toLowerCase()]) || { names: [ itemWithProps.taxonomy.family ]};
            itemWithProps.order = await firestore.getTaxonByName(config, itemWithProps.taxonomy[enums.taxon.ORDER.name.toLowerCase()]);
            itemWithProps.traits = await firestore.getTraitsBySpeciesName(item.name);
            itemWithProps.vernacularName = itemWithProps.vernacularName || itemProperties.getVernacularName(item, config);

            const names = item.name.split(' ');

            itemWithProps.taxonomy.genus = names[0];                
            itemWithProps.taxonomy.species = names[1];

            return itemWithProps;
        };
    
        item = selectedItem || collection.nextItem;

        item = await getItemWithProps(item);

        let rootNode;
    
        switch(mode) {
            case 'STAND_ALONE':
                rootNode = config.isLandscapeMode ? modal.querySelector('.js-modal-text') : document.querySelector('.main-lesson-body');
                break;
            case 'SWAP_OUT':
                rootNode = config.isLandscapeMode ? parent : document.querySelector('.js-species-container');
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

    init();
};

const renderLandscape = (item, config, mode, rootNode) => {

    const src = rootNode.querySelector('.js-bird-song');
    
    getBirdSong(item, src, config.isPortraitMode);

    const inatNode = rootNode.querySelector('.js-inat-box');

    renderInatDataBox(inatNode, item, config, mode);
    
    renderCalendar(rootNode.querySelector('.js-calendar-box'), item, config);

    lookalikeSpecies(item, config, rootNode);
};

const renderPortrait = (item, config, mode, rootNode) => {

    const images = prepImagesForCarousel(item, config, imageUseCases.SPECIES_CARD);

    const parent = rootNode.querySelector('.js-test-card-container-images');

    imageSlider({ config, images, parent, parentScreen: rootNode.querySelector('.card-card'), identifier: item.name.replace(' ', '_') });

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
        document.querySelector('#basicModal .modal-body').classList.add('bird-song-bg');
        document.querySelector('#basicModal .js-modal-text-title').innerHTML = `${item.name}`;
        const elm = document.querySelector('#basicModal .js-modal-text');
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
         }
        elm.appendChild(iframe);
    });
};

const renderCommonParts = (template, config, item, collection, mode, parent, rootNode, isInCarousel) => {

    const image = scaleImage({ url: item.starred || item.images[0].url }, imageUseCases.SPECIES_CARD, config);
    
    const clone = document.importNode(template.content, true);
    
    parent.innerHTML = '';
    
    renderTemplate({ name: item.name, vernacularName: item.vernacularName, image, iconicTaxon: item.iconicTaxon }, template.content, parent, clone);
    
    renderTaxaBox(rootNode.querySelector('.js-taxa-box'), { item, familyName: item.taxonomy.family, familyVernacularName: item.family.vernacularName || '' });

    infoSlider(item, rootNode.querySelector('.js-info-box'), mode);

    renderBadge(rootNode.querySelector('.js-names-badge'), item, config);    

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

    setTimeout(() => {
        
        if(config.isPortraitMode) {
            // hide attribution for now - space issue various across devices
            const attributions = document.querySelectorAll('.js-attribution-layer');
                    attributions.forEach(attribution => attribution.classList.add('hide-important'));
            const indicators = document.querySelectorAll('.js-carousel-indicators');
                    indicators.forEach(indicator => indicator.classList.add('hide-important'));
        }
    });
};