import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { taxa } from 'api/snapdragon/taxa';
import { renderWiki } from 'wikipedia/wiki';
import { infraspecifics } from 'api/snapdragon/infraspecifics';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import landscapeTemplate from 'ui/screens/cards/card-template.html';
import { imageSlider } from 'ui/screens/common/image-slider';
import { getBirdSong } from 'xeno-canto/birdsong';
import { traits } from 'api/traits/traits';
import { fungiTraits } from 'api/traits/fungi-traits';
import { lookALikes } from 'ui/screens/common/look-alikes';
import { infoSlider } from 'ui/screens/common/info-slider';

export const renderCard = (collection) => {

    const item = collection.nextItem;

    const { layout, config, lessonPlan } = store.getState();

    item.questionCount = lessonPlan.questionCount;
    item.layoutCount = lessonPlan.layoutCount;
    
    const screen = layout.screens.filter(el => el.name === 'species-card')[0];

    if(!screen) return;
    
    const template = document.createElement('template');

    template.innerHTML = landscapeTemplate;

    config.isPortraitMode
        ? renderPortrait(template, item, config, collection)
        : renderLandscape(template, item, config, collection);
};

const renderLandscape = (template, item, config, collection) => {

    const eolPage = template.content.querySelector('.js-species-card-eol-link');

    eolPage.setAttribute('href', `http://eol.org/pages/${item.id}/overview`);
    eolPage.setAttribute('target', '_blank');
    eolPage.setAttribute('style', 'text-decoration: none');

    renderCommonParts(template, config, item, collection);

    setTimeout(()=>{
        const wikiLink = document.querySelector('.js-species-card-wiki');
        if(wikiLink) {
            wikiLink.addEventListener('click', event => {
                document.querySelector('.js-external-page-title').innerHTML = `${item.name}`;

                const entry = document.querySelector('.species-card-wiki-entry').innerText;
                const style = `
                    <style type='text/css'>
                    body {
                        font-family: PT Sans', 'Roboto', arial,sans-serif;
                    }
                    a {
                        text-decoration: none;
                        border: solid 1px;
                        border-top: none;
                        border-left: none;
                        border-right: none;
                        color: black;
                        cursor: pointer;
                    }
                </style>`;
                const wiki = `<header>${style}</header><p>${entry}</p><p><a href='https://en.wikipedia.org/wiki/Salvia_officinalis' target='_blank'>Wikipedia page</a></p>`;

                document.querySelector('.js-external-page-body').innerHTML = config.isPortraitMode
                    ? `<iframe class="modal-iframe" title="Wikipedia page for the species ${item.name}" src="data:text/html,${wiki}"></iframe>`          
                    : `<iframe class="modal-iframe" title="Wikipedia page for the species ${item.name}" src="${wikiLink.querySelector('span').dataset.src}"></iframe>`;
                    
                document.querySelector('#externalPageModal').focus();
            });
        }
    });    

    const wikiNode = document.querySelector('.js-species-card-wiki');

    renderWiki(wikiNode, item, config.language);

    const src = document.querySelector('.js-bird-song');
    
    getBirdSong(item, src, config.isPortraitMode);    
};

const renderPortrait = (template, item, config, collection) => {

    renderCommonParts(template, config, item, collection);

    const images = item.images.map((img, index) => { 
        return { index: index + 1, src: img, itemName: item.name };
    } );

    imageSlider(images, document.querySelector('.js-species-card-images'), true, null, config);

    const player = document.querySelector('.js-bird-song-player');
    
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

const renderCommonParts = (template, config, item, collection) => {

    const species = item.name;    
    const name = itemProperties.vernacularName(item, config);
    const speciesName = itemProperties.speciesName(species);
    const epithet = itemProperties.latin(speciesName);
    const latin = epithet ? `${speciesName}: ${epithet.en}` : '';
    const rank = "species";
    const family = taxa.find(f => f.name === item.family);
    const familyName = itemProperties.familyVernacularNames(item.family, config.language)[0];
    const itemImage = item.icon || item.images[0];
    
    const specific = infraspecifics.find(specific => specific.name === item.name);
    const subSpeciesCount = specific ? specific.subspecies.length : 0;

    const names = item.names.filter(name => name.language === config.language).map(name => name.vernacularName);
    const nameCount = names.length; 

    const options = [
        { name: 'rank', formatter: trait => `UK # ${trait.value}` },
        { name: 'how edible', formatter: trait => trait.value }
    ]

    let trait = itemProperties.getActiveTrait(traits, item.name, config.language, options);

    const clone = document.importNode(template.content, true);
    
    const continueBtn = clone.querySelector('.js-species-card-btn button');

    continueBtn.disabled = true;

    setTimeout(() => {
        continueBtn.disabled = false;            
    }, 500);

    continueBtn.addEventListener('click', event => {
        actions.boundEndRevision(item);
    });

    const parent = DOM.rightBody;
    parent.innerHTML = '';
    
    renderTemplate({ species, name, latin, rank, subSpeciesCount, family: family.name, itemImage, familyName, trait, nameCount }, template.content, parent, clone);

    const subspeciesBadge = document.querySelector('.js-subspecies-badge');

    if(subSpeciesCount === 0) {
        subspeciesBadge.classList.add('hide');
    } else {

        const members = specific.subspecies;

        subspeciesBadge.addEventListener('click', event => {
            document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = `Cultivars of ${item.name}`;            
            const list = document.querySelector('#badgeListModal .js-modal-text');
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
    let info = fungiTraits.find(c => c.name === item.name);

    if(info) {
        infoSlider(info, document.querySelector('.js-info-box'));    
    } else {
        info = { traits: family.traits };
        infoSlider(info, document.querySelector('.js-info-box'));    
    }

    const namesBadge = document.querySelector('.js-names-badge');

    if(nameCount < 2) {
        namesBadge.classList.add('hide');    
    } else {
        namesBadge.addEventListener('click', event => {
            document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = 'EOL Common Names';
            let html = `<ul>`;
            names.forEach(name => {
                html+= `<li class="capitalise">${name}</li>`;
            });
            html+= `</ul>`;
            document.querySelector('#badgeListModal .js-modal-text').innerHTML = html;
        });
    }

    lookALikes(collection, item, fungiTraits, config);
};