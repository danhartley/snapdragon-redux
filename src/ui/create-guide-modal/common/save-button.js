import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import saveButtonTemplate from 'ui/create-guide-modal/common/save-button-template.html';

export const saveButton = (parent, config, chosen, step) => {

    const template = document.createElement('template');
    template.innerHTML = saveButtonTemplate;
    renderTemplate({}, template.content, parent);

    const btn = parent.querySelector('button');
    const txt = parent.querySelector('div');
    
    const handleSaveEvent = () => {

        if(chosen) {
            switch(step) {
                case 'LOCATION':
                    if(config.locationType) {
                        chosen.innerHTML = config.locationType === 'user'
                            ? config.userLocation
                            : config.autoLocation;
                    }
                    break;
                case 'ECOSYSTEM':
                    if(config.ecosystem) {
                        chosen.innerHTML = config.ecosystem.name;
                    }
                    break;
                case 'GUIDE':
                    if(config.studyMethod) {
                        chosen.innerHTML = config.studyMethod;
                    }
                    break;
            }
        }

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