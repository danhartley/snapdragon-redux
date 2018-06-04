import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderWiki } from 'wikipedia/wiki';
import { renderFamily } from 'gbif/gbif';

export const renderCardHeader = (collectionName) => {
    DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';
    DOM.headerTxt.innerHTML = ``;
};

export const renderCard = (collection) => {
    
    const item = collection.items[collection.itemIndex];

    const { layout, config, index } = store.getState();

    DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';
    DOM.headerTxt.innerHTML = ``;

    const screen = layout.screens.filter(el => el.name === 'species-card')[0];

    if(!screen) return;

    const template = document.querySelector(`.${screen.template}`);

    const speciesTxt = template.content.querySelector('.js-txt-species');

    speciesTxt.innerHTML = item.name;

    const vernacularNames = template.content.querySelector('.js-txt-species-names');

    const names = item.names.filter(name => name.language === config.language);

    // const listNames = names.map((vernacular, index) => {
    //         if(index < 1) {
    //             return `<li>${vernacular.vernacularName}</li>`;
    //     }
    // }).join('');

    // vernacularNames.innerHTML = `<ul>${listNames}</ul>`;
    vernacularNames.innerHTML = names[0].vernacularName;

    const eolPage = template.content.querySelector('.js-species-card-eol-link');
    
    eolPage.setAttribute('href', `http://eol.org/pages/${item.id}/overview`);
    eolPage.setAttribute('target', '_blank');
    eolPage.setAttribute('style', 'text-decoration: none');

    const clone = document.importNode(template.content, true);

    clone.querySelector('button').addEventListener('click', event => {
        actions.boundEndRevision(item);
        event.stopPropagation();
    });

    screen.parent.style.backgroundColor = 'rgb(50, 50, 50)';
    
    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

    // document.querySelector('.js-species-card-eol-link').addEventListener('click', event => {
    //     document.querySelector('.js-external-page-title').innerHTML = `EOL ${item.name}`;
    //     document.querySelector('.js-external-page-body').innerHTML = 
    //         `<iframe width="100%" height="100%" frameborder="0" src="https://beta.eol.org/pages/${item.id}/overview"></iframe>`;
    // });

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

                document.querySelector('.js-external-page-body').innerHTML = config.isSmallDevice
                    ? `<iframe class="modal-iframe" title="Wikipedia page for the species ${item.name}" src="data:text/html,${wiki}"></iframe>`          
                    : `<iframe class="modal-iframe" title="Wikipedia page for the species ${item.name}" src="${wikiLink.dataset.src}"></iframe>`;
                    
                document.querySelector('#externalPageModal').focus();
            });
        }
    },1000);    

    const wiki = document.querySelector('.js-species-card-wiki');

    renderWiki(wiki, item, config.language);

    const gbif = document.querySelector('.js-card .js-txt-family span');

    renderFamily(gbif, item.name);

    const next = document.querySelector('.js-species-card-btn button');
    next.innerText = (index + 1) === collection.moduleSize ? 'Species tests' : 'Next species';
    
    // small screens

    if(config.isSmallDevice) {
        DOM.leftGrid.style.display = 'none';
        DOM.rightGrid.style.display = 'grid';
        DOM.headerTxt.innerHTML = collection.name;

        let images = [];
        
        item.imageIndices.forEach(index => {
            const image = item.images[index];
            if(image)
                images.push(image);
        });
        images = images.slice(0,2);

        const backgroundImages = images.map(image => {
                return `<div style='background-image: url(${image}); background-size:cover;'></div>`;
            }).join('');

        document.querySelector('.js-species-card-images').innerHTML = backgroundImages;
        document.querySelector('.js-txt-family img').classList.add('hide');
    } else {
        document.querySelector('.js-txt-family img').classList.add('show');
    }
};