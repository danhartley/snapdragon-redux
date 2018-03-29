import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { renderWiki } from 'wikipedia/wiki';
import { renderFamily } from 'gbif/gbif';

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

    DOM.rightBody.style.backgroundColor = 'rgb(211, 211, 211)';
    DOM.rightHeader.style.cssText = 'text-align: right; padding-right: 20px; letter-spacing:.2em;';
    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);

    const wiki = document.querySelector('.js-txt-wiki');
    const gbif = document.querySelector('.js-right-header .js-txt-header');

    gbif.className = 'family-name';

    renderWiki(wiki, item.name);
    renderFamily(gbif, item.name);
};