import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import saveButtonTemplate from 'ui/create-guide-modal/common/save-button-template.html';

export const saveButton = (parent, config, chosen, step, createGuide) => {

    const template = document.createElement('template');
    template.innerHTML = saveButtonTemplate;
    renderTemplate({}, template.content, parent);

    const txt = parent.querySelector('div');

    const handleSaveEvent = () => {

        const { config: currentConfig } = store.getState();
        let userPreferencesHaveChanged = false;

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
                    if(config.guide.inatId) {
                        chosen.innerHTML = config.guide.inatId.key || '';
                    }
                    break;
            }
        }

        actions.boundUpdateConfig(config);
        txt.innerHTML = 'Your preference has been updated';
        setTimeout(() => {
            txt.innerHTML = '';
        }, 2000);
    }

    return handleSaveEvent;
}