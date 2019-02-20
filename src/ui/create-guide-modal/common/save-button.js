import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import saveButtonTemplate from 'ui/create-guide-modal/common/save-button-template.html';

export const saveButton = (parent, config) => {

    const template = document.createElement('template');
    template.innerHTML = saveButtonTemplate;
    renderTemplate({}, template.content, parent);

    const btn = parent.querySelector('button');
    const txt = parent.querySelector('div');
    
    const handleSaveEvent = () => {

        actions.boundUpdateConfig(config);
        btn.disabled = true;
        txt.innerHTML = 'Your changes were saved';
        setTimeout(() => {
            txt.innerHTML = '';
        }, 1500);
    }

    btn.addEventListener('click', handleSaveEvent);

    return btn;
}