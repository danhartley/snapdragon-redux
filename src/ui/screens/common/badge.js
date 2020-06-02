import { renderTemplate } from 'ui/helpers/templating';

import badgeTemplate from 'ui/screens/common/badge-template.html';

export const renderBadge = (badge, item, config) => {

    let names = [ ...new Set(item.names.map(name => {
        return {
            common: name.vernacularName.toLowerCase(),
            language: name.language
        }
    })) ];

    const languageNames = names.reduce(function (r, a) {
        r[a.language] = r[a.language] || {};
        r[a.language].name = config.languages.find(language => language.lang === a.language).name;
        r[a.language].names = r[a.language].names || [];
        r[a.language].names.push(a.common);
        return r;
    }, Object.create(null));

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

            renderTemplate({ languageNames }, template.content, parent);
        });
    }
}