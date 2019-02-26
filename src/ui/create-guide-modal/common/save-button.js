import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import saveButtonTemplate from 'ui/create-guide-modal/common/save-button-template.html';

export const saveButton = (parent, config, chosen, step, createGuide) => {

    const template = document.createElement('template');
    template.innerHTML = saveButtonTemplate;
    renderTemplate({}, template.content, parent);

    const btn = parent.querySelector('button');
    const txt = parent.querySelector('div');

    const handleSaveEvent = () => {

        if(chosen) {
            switch(step) {
                case 'LOCATION':
                    if(config.guide.locationType) {
                        chosen.innerHTML = config.guide.locationType === 'user'
                            ? config.guide.userLocation
                            : config.guide.autoLocation;
                    }
                    break;
                case 'PLACE':
                    if(config.guide.place) {
                        chosen.innerHTML = config.guide.place.name;                        
                    }
                    break;
                case 'GUIDE':
                    if(config.guide.studyMethod) {
                        chosen.innerHTML = config.guide.studyMethod.replace('_', ' ');
                    }
                    break;
            }
        }

        actions.boundUpdateConfig(config);
        btn.disabled = true;
        txt.innerHTML = 'Your choice was saved';
        setTimeout(() => {
            txt.innerHTML = '';
        }, 1500);
    }

    btn.addEventListener('click', handleSaveEvent);

    return btn;
}