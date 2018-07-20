import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { scoringHandler, modalBackgroundImagesHandler } from 'ui/helpers/handlers';
import landscapeTemplates from 'ui/screens/text-entry/text-entry-templates.html';
import portraitTemplates from 'ui/screens/text-entry/text-entry-portrait-templates.html';

export const renderInput = (config, screen, question, callbackTime, item, renderHeader, hints) => {

    const { layouts } = store.getState();
    const templates = document.createElement('div');
    templates.innerHTML = config.isPortraitMode ? portraitTemplates : landscapeTemplates;

    const template = templates.querySelector(`.${screen.template}`);

    hints.forEach(hint => {
        const el = template.content.querySelector(hint.selector);
        if(el)
            template.content.querySelector(hint.selector).innerHTML = hint.value;  
    });

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        scoringHandler(question, document.querySelector('.js-txt-input').value, event, config.isPortraitMode, layouts.length, callbackTime, renderHeader);
    });

    const parent = DOM.rightBody;
    parent.innerHTML = '';
    
    parent.appendChild(clone);

    if(config.isPortraitMode) renderPortrait(item);

    document.querySelector('.js-txt-input').focus();
};

const renderPortrait = (item) => {
    const images = utils.shuffleArray(item.images).slice(0,4);

    const backgroundImages = images.map(image => {
            return `                
                <div style='background-image: url(https://media.eol.org/content/${image}); background-size: cover;' data-toggle="modal" data-target="#imageModal">                                      
                </div>
            `;
        }).join('');

    document.querySelector('.js-species-card-images').innerHTML = backgroundImages;

    modalBackgroundImagesHandler(document.querySelectorAll('.js-species-card-images div'), item);
};

