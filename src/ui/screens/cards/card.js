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
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';
import { renderInatDataBox } from 'ui/screens/common/inat-box';
import { renderTaxonomyBox } from 'ui/screens/common/taxonomy-box';
import { renderCalendar } from 'ui/screens/common/calendar';
import cardTemplate from 'ui/screens/cards/card-template.html';

export const renderCard = (collection, isModalMode = false, selectedItem, parent = DOM.rightBody, isInCarousel = true) => {

    const item = selectedItem || collection.nextItem;

    const { layout, config, lessonPlan, enums } = store.getState();

    const rootNode = isModalMode ? document.querySelector('#speciesCardModal') : document.querySelector('.right-body');

    if(!isModalMode) {        
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

    renderCommonParts(template, config, item, collection, traits, isModalMode, parent, lessonPlan, rootNode);

    config.isPortraitMode
        ? renderPortrait(item, config, traits, isModalMode, rootNode)
        : renderLandscape(item, config, traits, isModalMode, rootNode);
};

const renderLandscape = (item, config, traits, isModalMode, rootNode) => {

    const src = rootNode.querySelector('.js-bird-song');
    
    getBirdSong(item, traits, src, config.isPortraitMode);

    const eolPage = rootNode.querySelector('.js-species-card-eol-link');
    
    if(isModalMode) {
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

const renderPortrait = (item, config, traits, isModalMode, rootNode) => {

    const images = prepImagesForCarousel(item, config, imageUseCases.SPECIES_CARD);

    const parent = rootNode.querySelector('.js-species-card-images');

    imageSlider(config, images, parent, true);

    const player = rootNode.querySelector('.js-bird-song-player');

    if(isModalMode) {
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

const renderCommonParts = (template, config, item, collection, traits, isModalMode, parent, lessonPlan, rootNode) => {

    const name = item.name;
    const epithet = itemProperties.latin(item.species);
    const latin = epithet ? `${item.species}: ${epithet.en}` : '';
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
    
    renderTemplate({ name, vernacularName: item.vernacularName, latin, rank, subSpeciesCount, familyName, headerImage, familyVernacularName, trait, occurrences, iconicTaxon }, template.content, parent, clone);

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

    infoSlider(item, traits, family, rootNode.querySelector('.js-info-box'), isModalMode);

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

    lookALikes(collection, item, traits, config, isModalMode);
    renderFeatures(item, traits, config, rootNode.querySelector('.js-feature-types'), isModalMode);
    
    const continueBtn = rootNode.querySelector('.js-species-card-btn button');

    if(isModalMode) {
        continueBtn.classList.add('hide-important');
    } else {
        
        continueBtn.disabled = true;

        setTimeout(() => {
            continueBtn.disabled = false;            
        }, 500);

        continueBtn.addEventListener('click', event => {
            actions.boundEndRevision({ layoutCount: lessonPlan.layoutCount });
        });

        // const taxonomyNode = rootNode.querySelector('.js-taxonomy-box');

        // renderTaxonomyBox(taxonomyNode, { rank, familyVernacularName, familyName, iconicTaxon });
    }

    const calendarNode = rootNode.querySelector('.js-calendar-box');

    renderCalendar(calendarNode, item, config);

    if(item.taxonomy.kingdom.toLowerCase() === 'fungi') {

        const iconicIconContainer = rootNode.querySelector('.js-iconic-icon');

        iconicIconContainer.innerHTML = '<span class="mushroom-icon-header"><svg-icon><src href="./icons/si-glyph-mushrooms.svg"/></svg></span>';

    } else {

        const iconicIcon = rootNode.querySelector('.js-iconic-icon i');

        const classes = matchIcon(item.taxonomy, iconicTaxa).split(' ');

        classes.forEach(c => iconicIcon.classList.add(c));        
    }

    if(isModalMode) {        
        rootNode.querySelector('#speciesCardModal .js-modal-text-title').innerHTML = collection.name;

        const prev = rootNode.querySelector('#speciesCardModal .js-prev > span');
        prev.dataset.id = item.id;
        prev.dataset.transition = 'prev';

        const next = rootNode.querySelector('#speciesCardModal .js-next > span');
        next.dataset.id = item.id;
        next.dataset.transition = 'next';

        const lines = document.getElementsByTagName('hr');

        Array.from(lines).forEach(hr => hr.style.display = 'none');
    }
};

let currentIndex = 0;

const carouselControlHandler = event => {

    const { collection } = store.getState();
    
    let transition = event.target.dataset.transition;

    switch(transition) {
        case 'prev':
            currentIndex--;
            currentIndex = currentIndex === -1 ? collection.items.length -1 : currentIndex;
            break;
        case 'next':
            currentIndex++;
            currentIndex = currentIndex === collection.items.length -1 ? 0 : currentIndex;
            break;
    }

    let nextItem = collection.items.find((item,index) => index === currentIndex);
    const parent = document.querySelector('#speciesCardModal .js-modal-body');
    renderCard(collection, true, nextItem, parent);
};

const prev = document.querySelector('#speciesCardModal .js-prev');
const next = document.querySelector('#speciesCardModal .js-next');

if(prev) prev.addEventListener('click', carouselControlHandler);
if(next) next.addEventListener('click', carouselControlHandler);