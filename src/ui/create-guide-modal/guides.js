import { renderTemplate } from 'ui/helpers/templating';
import { saveButton } from 'ui/modals/common/save-button';
import guidesTemplate from 'ui/modals/guides-list-template.html';

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
        const target = event.target.id ? event.target : event.target.parentElement;
        modal.querySelectorAll('.lesson-icon').forEach(icon => icon.innerHTML = '<i class="far fa-circle"></i>');
        target.querySelector('i').classList.remove('fa-circle');
        target.querySelector('i').classList.add('fa-dot-circle');
        saveYourChangesBtn.disabled = false;
        config.studyMethod = target.id;
        chosen.innerHTML = config.studyMethod;
    }));
}