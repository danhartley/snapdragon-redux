import { renderTemplate } from 'ui/helpers/templating';
import badgeTemplate from 'ui/screens/common/badge-template.html';

export const renderBadge = (badge, occurrences, names) => {

    if(occurrences === 0) {

        badge.classList.add('hide');
        
    } else {

        badge.addEventListener('click', event => {
            
            document.querySelector('#badgeListModal .js-modal-text-title').innerHTML = 'Common species names';

            parent = document.querySelector('#badgeListModal .js-modal-text');

            const template = document.createElement('template');

            parent.innerHTML = '';

            template.innerHTML = badgeTemplate;

            renderTemplate({ names }, template.content, parent);
        });
    }
}