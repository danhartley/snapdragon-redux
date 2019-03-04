import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import saveButtonTemplate from 'ui/create-guide-modal/common/save-button-template.html';

export const saveButton = (parent, config, chosen, step, createGuide) => {

    const template = document.createElement('template');
    template.innerHTML = saveButtonTemplate;
    renderTemplate({}, template.content, parent);

    const txt = parent.querySelector('div');

    const handleSaveEvent = () => {

        if(chosen) {
            switch(step) {
                case 'LOCATION':
                    if(config.guide.locationType) {
                        chosen.innerHTML = config.guide.locationType === 'place'
                            ? config.guide.locationPlace
                            : config.guide.locationLongLat;
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
        txt.innerHTML = 'Your preferences have been updated';
        setTimeout(() => {
            txt.innerHTML = '';
        }, 1500);
    }

    return handleSaveEvent;
}