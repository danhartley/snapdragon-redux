import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { renderWiki } from 'wikipedia/wiki';
import { renderFamily } from 'gbif/gbif';


export const renderSpeciesCardHeader = () => {
    DOM.headerTxt.innerHTML = ``;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

export const renderSpeciesCard = (templateSelector, item) => {

    const template = document.querySelector(`.${templateSelector}`);

    const speciesTxt = template.content.querySelector('.js-txt-species');

    speciesTxt.innerHTML = item.name;

    const vernacularNames = template.content.querySelector('.js-txt-species_names');

    const names = item.names.map(vernacular => {
        if(vernacular.language === 'en')
            return `<li>${vernacular.vernacularName}</li>`;
    }).join('');

    vernacularNames.innerHTML = `<ul>${names}</ul>`;

    const clone = document.importNode(template.content, true);

    clone.querySelector('button').addEventListener('click', event => {
        actions.boundEndLesson(item);
    });

    DOM.rightBody.style.backgroundColor = 'rgb(50, 50, 50)';
    
    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);

    const gbif = document.querySelector('.js-txt-family span');

    renderFamily(gbif, item.name);
};