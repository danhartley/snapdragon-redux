import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { taxa } from 'api/snapdragon/taxa';
import { renderWiki } from 'wikipedia/wiki';
import { renderWikiModal } from 'wikipedia/wiki-modal';
import { infraspecifics } from 'api/snapdragon/infraspecifics';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import { imageSlider } from 'ui/screens/common/image-slider';
import { getBirdSong } from 'xeno-canto/birdsong';
import { getTraits } from 'api/traits/traits';
import { lookALikes } from 'ui/screens/common/look-alikes';
import { renderFeatures } from 'ui/screens/common/feature';
import { infoSlider } from 'ui/screens/common/info-slider';
import * as traitTypes from 'api/traits/trait-types';
import { iconicTaxa, matchTaxon, matchIcon } from 'api/snapdragon/iconic-taxa';
import { renderIcon } from 'ui/helpers/icon-handler';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';
import { renderInatDataBox } from 'ui/screens/common/inat-box';
import { renderTaxonomyBox } from 'ui/screens/common/taxonomy-box';
import { renderCalendar } from 'ui/screens/common/calendar';
import cardTemplate from 'ui/screens/cards/card-template.html';

export const renderCard = (collection, mode = 'STAND_ALONE', selectedItem, parent = DOM.rightBody, isInCarousel = true) => {

    const item = selectedItem || collection.nextItem;

    const { layout, config, lessonPlan, enums } = store.getState();

    let rootNode;

    switch(mode) {
        case 'STAND_ALONE':
            rootNode = document.querySelector('.right-body');
            break;
        case 'SWAP_OUT':
            rootNode = document.querySelector('.js-species-container');
            break;
        case 'MODAL':
            rootNode = document.querySelector('#speciesCardModal');
            break;
    }

    if(mode === 'STAND-ALONE') {        
        const screen = layout.screens.filter(el => el.name === 'species-card')[0];
        if(!screen) return;
    }

    if(!isInCarousel) {
        const prev = document.querySelector('#speciesCardModal .js-prev');
        const next = document.querySelector('#speciesCardModal .js-next');
        if(prev) prev.style.display = 'none';
        if(next) next.style.display = 'none';
    }
    
    const template = document.createElement('template');

    template.innerHTML = cardTemplate;

    const traits = getTraits(enums);

    renderCommonParts(template, config, item, collection, traits, mode, parent, lessonPlan, rootNode);

    config.isPortraitMode
        ? renderPortrait(item, config, traits, mode, rootNode)
        : renderLandscape(item, config, traits, mode, rootNode);
};

const renderLandscape = (item, config, traits, mode, rootNode) => {

    const src = rootNode.querySelector('.js-bird-song');
    
    getBirdSong(item, traits, src, config.isPortraitMode);

    const eolPage = rootNode.querySelector('.js-species-card-eol-link');
    
    if(mode === 'MODAL') {
        eolPage.classList.add('hide');
    } else {
        eolPage.setAttribute('href', `http://eol.org/pages/${item.id}/overview`);
        eolPage.setAttribute('target', '_blank');
        eolPage.setAttribute('style', 'text-decoration: none');
    
        setTimeout(()=>{
            const wikiLink = rootNode.querySelector('.js-species-card-wiki');            
            renderWikiModal(item, wikiLink, config);
        });    
    
        const wikiNode = rootNode.querySelector('.js-species-card-wiki');
    
        renderWiki(wikiNode, item, config.language);
    }
    const inatNode = rootNode.querySelector('.js-inat-box');

    renderInatDataBox(inatNode, item, config);
};

const renderPortrait = (item, config, traits, mode, rootNode) => {

    const images = prepImagesForCarousel(item, config, imageUseCases.SPECIES_CARD);

    const parent = rootNode.querySelector('.js-species-card-images');

    imageSlider(config, images, parent, true);

    const player = rootNode.querySelector('.js-bird-song-player');

    if(mode =='MODAL') {
        player.style.display = 'none';
        return;
    };

    getBirdSong(item, traits, player, config.isPortraitMode);

    player.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.id = 'birdsong';
        iframe.style.border = 0;
        iframe.src = player.dataset.src;
        rootNode.querySelector('#menuModal .modal-body').classList.add('bird-song-bg');
        rootNode.querySelector('#menuModal .js-modal-text-title').innerHTML = `${item.name}`;
        const elm = rootNode.querySelector('#menuModal .js-modal-text');
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
         }
        elm.appendChild(iframe);
    });
};

const renderCommonParts = (template, config, item, collection, traits, mode, parent, lessonPlan, rootNode) => {

    const name = item.name;
    // const epithet = itemProperties.latin(item.species);
    // const latin = epithet ? `${item.species}: ${epithet.en}` : '';
    const rank = "species";
    item.vernacularName = item.vernacularName || itemProperties.getVernacularName(item, config);
    const family = taxa.find(f => f.name === item.family);
    const familyName = family ? family.name : item.taxonomy.family;
    const familyVernacularNames = itemProperties.familyVernacularNames(item.family, config.language, taxa);
    const familyVernacularName = familyVernacularNames ? familyVernacularNames[0] : '';
        
    const headerImage = scaleImage({ url: item.icon || item.images[0].url }, imageUseCases.SPECIES_CARD, config);
    
    const specific = infraspecifics.find(specific => specific.name === item.name);
    const subSpeciesCount = specific ? specific.subspecies.length : 0;

    const names = [ ...new Set(item.names.filter(name => name.language === config.language).map(name => name.vernacularName.toLowerCase())) ];
    const occurrences = names.length; 

    const iconicTaxon = matchTaxon(item.taxonomy, iconicTaxa);

    const options = [
        { name: traitTypes.name.RANK, formatter: trait => `UK # ${trait.value}` },
        { name: traitTypes.name.HOW_EDIBLE, formatter: trait => trait.value }
    ]

    let trait = itemProperties.getActiveTrait(traits, item.name, options);

    const clone = document.importNode(template.content, true);
    
    parent.innerHTML = '';
    
    renderTemplate({ name, vernacularName: item.vernacularName, rank, subSpeciesCount, familyName, headerImage, familyVernacularName, trait, occurrences, iconicTaxon }, template.content, parent, clone);

    const subspeciesBadge = rootNode.querySelector('.js-subspecies-badge');

    if(subSpeciesCount === 0) {
        subspeciesBadge.classList.add('hide');
    } else {

        const members = specific.subspecies;

        subspeciesBadge.addEventListener('click', event => {
            document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = `Cultivars of ${item.name}`;            
            const list = rootNode.querySelector('#badgeListModal .js-modal-text');
            let html = '<div class="modal-list scrollable">';
            members.forEach(member => {
                html += `<div><span>subspecies: ${member.name}</span>`;
                html += `<ul>`;
                member.names.forEach(name => {
                    if(name.language === config.language)
                        html += `<li>name: ${name.vernacularName}</li>`;
                });
                html += `</ul></div>`;
            });
            html += '</div>';
            list.innerHTML = html;
        });
    }

    infoSlider(item, traits, family, rootNode.querySelector('.js-info-box'), mode);

    const namesBadge = rootNode.querySelector('.js-names-badge');

    if(occurrences < 2) {
        namesBadge.classList.add('hide');    
    } else {
        namesBadge.addEventListener('click', event => {
            document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = 'Common names';
            let html = `<ul>`;
            names.forEach(name => {
                html+= `<li class="capitalise">${name}</li>`;
            });
            html+= `</ul>`;
            document.querySelector('#badgeListModal .js-modal-text').innerHTML = html;
        });
    }

    lookALikes(collection, item, traits, config);
    renderFeatures(item, traits, config, rootNode.querySelector('.js-feature-types'), mode);
    
    const calendarNode = rootNode.querySelector('.js-calendar-box');

    renderCalendar(calendarNode, item, config);

    renderIcon(item, rootNode);

    if(mode === 'MODAL') {        
        rootNode.querySelector('#speciesCardModal .js-modal-text-title').innerHTML = collection.name;

        const prev = rootNode.querySelector('#speciesCardModal .js-prev > span');
        prev.dataset.id = item.id;
        prev.dataset.transition = 'prev';
        prev.dataset.modal = 'speciesCardModal';

        const next = rootNode.querySelector('#speciesCardModal .js-next > span');
        next.dataset.id = item.id;
        next.dataset.transition = 'next';
        next.dataset.modal = 'speciesCardModal';
        

        const lines = document.getElementsByTagName('hr');

        Array.from(lines).forEach(hr => hr.style.display = 'none');
    }
};