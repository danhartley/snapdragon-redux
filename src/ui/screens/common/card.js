import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderWiki } from 'wikipedia/wiki';
import { renderFamily } from 'gbif/gbif';


export const renderCardHeader = () => {
    DOM.headerTxt.innerHTML = ``;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

export const renderCard = (item) => {

    renderCardHeader();

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-card')[0];

    if(!screen) return;

    const template = document.querySelector(`.${screen.template}`);

    const speciesTxt = template.content.querySelector('.js-txt-species');

    speciesTxt.innerHTML = item.name;

    const vernacularNames = template.content.querySelector('.js-txt-species-names');

    const names = item.names.filter(name => name.language === config.language).map((vernacular, index) => {
            if(index < 6) {
                return `<li>${vernacular.vernacularName}</li>`;
        }
    }).join('');

    vernacularNames.innerHTML = `<ul>${names}</ul>`;

    const clone = document.importNode(template.content, true);

    clone.querySelector('button').addEventListener('click', event => {
        actions.boundEndRevision(item);
        event.stopPropagation();
    });

    screen.parent.style.backgroundColor = 'rgb(50, 50, 50)';
    
    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

    const gbif = document.querySelector('.js-card .js-txt-family span');

    renderFamily(gbif, item.name);
};