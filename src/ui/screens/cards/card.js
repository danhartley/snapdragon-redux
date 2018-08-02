import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { taxa } from 'api/snapdragon/taxa';
import { renderWiki } from 'wikipedia/wiki';
import { infraspecifics } from 'api/snapdragon/infraspecifics';
import { renderTemplate } from 'ui/helpers/templating';
import { modalBackgroundImagesHandler } from 'ui/helpers/handlers';
import { itemProperties } from 'ui/helpers/data-checking';
import landscapeTemplate from 'ui/screens/cards/card-template.html';

export const renderCard = (collection) => {
    
    const item = collection.items[collection.itemIndex];    
    const { layout, config, lessonPlan } = store.getState();

    item.questionCount = lessonPlan.questionCount;
    item.layoutCount = lessonPlan.layoutCount;
    
    document.querySelector('progress').max = item.questionCount;
    document.querySelector('progress').value = 0;

    const screen = layout.screens.filter(el => el.name === 'species-card')[0];

    if(!screen) return;
    
    const template = document.createElement('template');

    template.innerHTML = landscapeTemplate;

    config.isPortraitMode
        ? renderPortrait(template, item, config)
        : renderLandscape(template, item, config);
};

const renderLandscape = (template, item, config) => {

    const eolPage = template.content.querySelector('.js-species-card-eol-link');

    eolPage.setAttribute('href', `http://eol.org/pages/${item.id}/overview`);
    eolPage.setAttribute('target', '_blank');
    eolPage.setAttribute('style', 'text-decoration: none');

    renderCommonParts(template, config, item);

    setTimeout(()=>{
        const wikiLink = document.querySelector('.js-species-card-wiki span');
        if(wikiLink) {
            wikiLink.addEventListener('click', event => {
                document.querySelector('.js-external-page-title').innerHTML = `${item.name}`;

                const entry = document.querySelector('.species-card-wiki-entry').innerText;
                const style = `
                    <style type='text/css'>
                    body {
                        font-family: Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;   
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
                    : `<iframe class="modal-iframe" title="Wikipedia page for the species ${item.name}" src="${wikiLink.dataset.src}"></iframe>`;
                    
                document.querySelector('#externalPageModal').focus();
            });
        }
    });    

    const wikiNode = document.querySelector('.js-species-card-wiki');

    renderWiki(wikiNode, item, config.language);
};

const renderPortrait = (template, item, config) => {

    renderCommonParts(template, config, item);

    const images = utils.shuffleArray(item.images).slice(0,4);

    const backgroundImages = images.map(image => {
            return `                
                <div style='background-image: url(https://media.eol.org/content/${image}); background-size: cover;' data-toggle="modal" data-target="#imageModal">                                      
                </div>
            `;
        }).join('');

    document.querySelector('.js-species-card-images').innerHTML = backgroundImages;

    modalBackgroundImagesHandler(document.querySelectorAll('.js-species-card-images div'), item);
};

const renderCommonParts = (template, config, item) => {

    const species = item.name;    
    const name = itemProperties.vernacularName(item, config);
    const speciesName = itemProperties.speciesName(species);
    const epithet = itemProperties.latin(speciesName);
    const latin = epithet ? `${speciesName}: ${epithet.en}` : '';
    const rank = "species";
    const family = taxa.find(f => f.name === item.family);
    const familyImage = family ? family.thumb : '';
    const specific = infraspecifics.find(specific => specific.name === item.name);
    const occurrences = specific ? specific.subspecies.length : 0;
    const pollinators = family.pollinators.map(p=>p).join(', ');

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('.js-species-card-btn').addEventListener('click', event => {
        actions.boundEndRevision(item);
    });

    const parent = DOM.rightBody;
    parent.innerHTML = '';
    
    renderTemplate({ species, name, latin, rank, occurrences, family: item.family, familyImage, pollinators }, template.content, parent, clone);

    const badge = document.querySelector('.badge');

    if(occurrences === 0) {
        badge.classList.add('hide');
    } else {

        const members = specific.subspecies;

        badge.addEventListener('click', event => {
            document.querySelector('#listModal .js-modal-text-title').innerHTML = `Cultivars of ${item.name}`;            
            const list = document.querySelector('#listModal .js-modal-text');
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
};