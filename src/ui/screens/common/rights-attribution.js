import { scaleImage } from 'ui/helpers/image-handler';
import { log, logError } from 'ui/helpers/logging-handler';
import { renderTemplate } from 'ui/helpers/templating';

import rightsAttributionTemplate from 'ui/screens/common/rights-attribution-template.html';

export const handleRightsAttribution = image => {

    const template = document.createElement('template');
          template.innerHTML = rightsAttributionTemplate;

    let text;

    switch(image.license) {
        case 'http://creativecommons.org/licenses/publicdomain/':
            text = 'CC PD';
            break;
        case 'http://creativecommons.org/licenses/by/2.0/':        
            text = 'CC 2.0';
            break;
        case 'http://creativecommons.org/licenses/by-sa/2.0/':
            text = 'CC BY SA 2.0';
            break;
        case 'http://creativecommons.org/licenses/by-nc/2.0/':
            text = 'CC BY NC 2.0';
            break;
        case 'http://creativecommons.org/licenses/by-nc-sa/2.0/':
            text = 'CC BY NC-SA 2.0';
            break;
        case 'http://creativecommons.org/licenses/by/3.0/':        
            text = 'CC 3.0';
            break;
        case 'http://creativecommons.org/licenses/by-sa/3.0/':
            text = 'CC BY SA 3.0';
            break;
        case 'http://creativecommons.org/licenses/by-nc-sa/3.0/':
            text = 'CC BY NC-SA 3.0';
            break;        
        case 'http://creativecommons.org/licenses/by/4.0/':        
            text = 'CC 4.0';
            break;
        case 'http://creativecommons.org/licenses/by-nc/4.0/':
            text = 'CC BY NC 4.0';
            break;
        case 'http://creativecommons.org/licenses/by-nc-sa/4.0/':
            text = 'CC BY NC-SA 4.0';
            break;
        case 'http://creativecommons.org/licenses/by-sa/4.0/':
            text = 'CC BY SA 4.0';
            break;
        default: 
            text = image.license || '';
            break;
    };

    const licence = { text, url: image.medium };
    const title = image.title;
    const author = image.rightsholder || image.rightsHolder || 'Public domain';
    const source = image.source || '';
    const identifier = `${image.itemName.replace(' ', '_')}`;
    const large = image.large || scaleImage(image).large;
    
    let parent = document.querySelector(`.js-attribution-layer.${identifier}`);
        parent = parent || document.querySelector(`.js-attribution-layer`);
        parent.innerHTML = '';

    renderTemplate({title,author,source,licence,large}, template.content, parent);

    const rightsAttribution = parent.querySelector('.js-rights-attribution .js-copyright');
    const rightsLink = parent.querySelector('.js-rights-link .js-copyright');
    const indicators = document.querySelector(`.carousel-indicators`);

    const showAttribution = event => {
        rightsAttribution.parentElement.classList.add('hide-important');
        rightsLink.parentElement.classList.remove('hide-important');
        indicators.classList.remove('hide-important');
        rightsLink.removeEventListener('click', showLink), true;
        rightsLink.addEventListener('click', showLink, true);
    };

    rightsAttribution.removeEventListener('click', showAttribution, true);
    rightsAttribution.addEventListener('click', showAttribution, true);

    const showLink = event => {
        rightsAttribution.parentElement.classList.remove('hide-important');
        rightsLink.parentElement.classList.add('hide-important');
        indicators.classList.add('hide-important');
        rightsAttribution.removeEventListener('click', showAttribution, true);
        rightsAttribution.addEventListener('click', showAttribution, true);
    };

    rightsLink.removeEventListener('click', showLink), true;
    rightsLink.addEventListener('click', showLink, true);

};