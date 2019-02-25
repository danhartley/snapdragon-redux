import { renderTemplate } from 'ui/helpers/templating';
import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';
import guidesTemplate from 'ui/create-guide-modal/guides-list-template.html';

export const renderGuides = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');
    const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
    const saveYourChangesBtn = createGuide.save(config, chosen, 'GUIDE');

    guideTxt.innerHTML = 'What do you want to concentrate on';

    if(config.guide.studyMethod) {
        setTimeout(() => {
            const preSelectedCollection = modal.querySelector(`#${config.guide.studyMethod}`).querySelectorAll('span')[1];
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
        config.guide.studyMethod = target.id;
        chosen.innerHTML = config.guide.studyMethod;
    }));
}