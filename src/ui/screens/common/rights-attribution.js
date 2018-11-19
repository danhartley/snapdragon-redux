import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import rightsAttributionTemplate from 'ui/screens/common/rights-attribution-template.html';

export const handleRightsAttribution = (selectedItem) => {

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
        default: 
            text = src.license;
            break;
    };

    const licence = { text, url: src.license };
    const title = selectedItem.name;
    const author = src.rightsholder || src.rightsHolder;
    const source = src.source;

    DOM.modalImageRightsAttribution.innerHTML = '';

    renderTemplate({title,author,source,licence}, template.content, DOM.modalImageRightsAttribution);

};