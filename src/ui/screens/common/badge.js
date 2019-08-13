import { renderTemplate } from 'ui/helpers/templating';
import badgeTemplate from 'ui/screens/common/badge-template.html';

export const renderBadge = (badge, item, config) => {

    const names = [ ...new Set(item.names.filter(name => name.language === config.language).map(name => name.vernacularName.toLowerCase())) ];
    const occurrences = names.length;

    const template = document.createElement('template');

    if(occurrences === 0) {

        badge.classList.add('hide');
        
    } else {

        badge.innerHTML = '';

        template.innerHTML = `<span class="names-badge js-names-badge" data-toggle="modal" data-target="#badgeListModal">${occurrences}</span>`;

        renderTemplate({}, template.content, badge);

        badge.addEventListener('click', event => {
            
            document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = 'Common species names';

            const parent = document.querySelector('#badgeListModal .js-modal-text');

            parent.innerHTML = '';

            template.innerHTML = badgeTemplate;

            renderTemplate({ names }, template.content, parent);
        });
    }
}