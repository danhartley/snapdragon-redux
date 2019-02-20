import { renderTemplate } from 'ui/helpers/templating';
import { saveButton } from 'ui/create-guide-modal/common/save-button';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';
import guidesTemplate from 'ui/create-guide-modal/guides-list-template.html';

export const renderGuides = (config, modal) => {

    const guideTxt = modal.querySelector('.guide-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');

    const saveYourChangesBtn = saveButton(modal.querySelector('.js-save-your-changes'), config);

    guideTxt.innerHTML = 'Choose a guide type';

    if(config.studyMethod) {
        setTimeout(() => {
            const preSelectedCollection = modal.querySelector(`#${config.studyMethod}`).querySelectorAll('span')[1];
            if(preSelectedCollection) {
                preSelectedCollection.click();
            }
        });
    }

    const template = document.createElement('template');
    template.innerHTML = guidesTemplate;
    const parent = modal.querySelector('.js-actions');
    
    renderTemplate({ }, template.content, parent);

    modal.querySelectorAll('.btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {        
        const target = rbEventHandler(modal, event);
        saveYourChangesBtn.disabled = false;
        config.studyMethod = target.id;
        chosen.innerHTML = config.studyMethod;
    }));
}