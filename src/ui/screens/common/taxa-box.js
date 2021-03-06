import { itemProperties } from 'ui/helpers/data-checking';
import { infraspecifics } from 'api/snapdragon/infraspecifics';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import taxaBoxTemplate from 'ui/screens/common/taxa-box-template.html';

export const renderTaxaBox = async (parent, taxaBoxArgs) => {

    const units = store.getState().units;

    parent.innerHTML = '';

    let { item, familyName, familyVernacularName } = taxaBoxArgs;

    const options = [
        { name: 'uk rank', formatter: trait => `UK # ${trait[0]}` },
        { name: 'how edible', formatter: trait => trait[0] }
    ];

    let trait = itemProperties.getActiveTrait(item, options);
    
    const specific = infraspecifics.find(specific => specific.name === item.name);
    const subSpeciesCount = specific ? specific.subspecies.length : 0;

    const template = document.createElement('template');

    template.innerHTML = taxaBoxTemplate;

    renderTemplate({ subSpeciesCount, familyName, familyVernacularName, trait }, template.content, parent);

    const subspeciesBadge = parent.querySelector('.js-subspecies-badge');

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
}