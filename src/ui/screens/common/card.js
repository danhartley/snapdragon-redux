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

    const { layout, config } = store.getState();

    renderCardHeader(collection.name);

    const screen = layout.screens.filter(el => el.name === 'species-card')[0];

    if(!screen) return;

    const template = document.querySelector(`.${screen.template}`);

    const speciesTxt = template.content.querySelector('.js-txt-species');

    speciesTxt.innerHTML = item.name;

    const vernacularNames = template.content.querySelector('.js-txt-species-names');

    const names = item.names.filter(name => name.language === config.language);

    const listNames = names.map((vernacular, index) => {
            if(index < 4) {
                return `<li>${vernacular.vernacularName}</li>`;
        }
    }).join('');

    vernacularNames.innerHTML = `<ul>${listNames}</ul>`;

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

    const wiki = document.querySelector('.js-species-card-wiki');

    renderWiki(wiki, item.name, config.language);

    const gbif = document.querySelector('.js-card .js-txt-family span');

    renderFamily(gbif, item.name);
};