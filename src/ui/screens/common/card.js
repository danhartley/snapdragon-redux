import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { renderWiki } from 'wikipedia/wiki';
import { renderFamily } from 'gbif/gbif';
import { renderTemplate } from 'ui/helpers/templating';
import { modalHandler } from 'ui/helpers/handlers';
import landscapeTemplate from 'ui/screens/common/card-template.html';
import portraitTemplate from 'ui/screens/common/card-portrait-template.html';

export const renderCard = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config, index, layouts } = store.getState();

    // Test progress

    document.querySelector('progress').max = layouts.filter(layout => layout.name === 'test').length;
    document.querySelector('progress').value = 0;

    const screen = layout.screens.filter(el => el.name === 'species-card')[0];

    if(!screen) return;

    screen.parent.innerHTML = '';

    config.isPortraitMode
        ? renderPortrait(screen, item, config, collection, index)
        : renderLandscape(screen, item, config);
};

const renderLandscape = (screen, item, config) => {

    const template = document.createElement('template');

    template.innerHTML = landscapeTemplate;

    const eolPage = template.content.querySelector('.js-species-card-eol-link');

    eolPage.setAttribute('href', `http://eol.org/pages/${item.id}/overview`);
    eolPage.setAttribute('target', '_blank');
    eolPage.setAttribute('style', 'text-decoration: none');

    renderCommonParts(screen, template, config, item);
    
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
    },500);    

    const wiki = document.querySelector('.js-species-card-wiki');

    renderWiki(wiki, item, config.language);

    const gbif = document.querySelector('.js-card .js-txt-family span');

    renderFamily(gbif, item.name);

    document.querySelector('.js-txt-family img').classList.add('show');
};
const renderPortrait = (screen, item, config, collection, index) => {

    const template = document.createElement('template');

    template.innerHTML = portraitTemplate;
    
    renderCommonParts(screen, template, config, item);

    const images = utils.shuffleArray(item.images).slice(0,4);

    const backgroundImages = images.map(image => {
            return `                
                <div style='background-image: url(${image}); background-size: cover;' data-toggle="modal" data-target="#imageModal">                                      
                </div>
            `;
        }).join('');

    document.querySelector('.js-species-card-images').innerHTML = backgroundImages;

    modalHandler(document.querySelectorAll('.js-species-card-images div'), item);
};

const renderCommonParts = (screen, template, config, item) => {

    const species = item.name;
    const name = item.names.filter(name => name.language === config.language)[0].vernacularName;
    
    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        actions.boundEndRevision(item);
        event.stopPropagation();
    });
    
    renderTemplate({ species, name }, template.content, screen.parent, clone);
};