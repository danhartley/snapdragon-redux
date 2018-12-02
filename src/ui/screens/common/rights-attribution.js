import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import rightsAttributionTemplate from 'ui/screens/common/rights-attribution-template.html';

export const handleRightsAttribution = (selectedItem, activeNode) => {

    const template = document.createElement('template');
    template.innerHTML = rightsAttributionTemplate;    

    const src = selectedItem.image;
    let text;

    switch(src.license) {
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
            text = src.license;
            break;
    };

    const licence = { text, url: src.license };
    const title = selectedItem.name;
    const author = src.rightsholder || src.rightsHolder;
    const source = src.source;

    renderTemplate({title,author,source,licence}, template.content, activeNode);

    const rightsAttribution = activeNode.querySelector('.rights-attribution');
    const rightsLink = activeNode.querySelector('.rights-link');

    rightsAttribution.addEventListener('click', event => {
        rightsAttribution.classList.add('hide-important');
        rightsLink.classList.remove('hide-important');
        rightsLink.style.display = 'inline-block';
        event.stopPropagation();
    });

    rightsLink.addEventListener('click', event => {
        rightsLink.classList.add('hide-important');
        rightsAttribution.classList.remove('hide-important');
        event.stopPropagation();
    });

};