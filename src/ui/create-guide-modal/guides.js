import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';
import { renderInatUser } from 'ui/create-guide-modal/inat-user';
import { renderTemplate } from 'ui/helpers/templating';
import guidesTemplate from 'ui/create-guide-modal/guides.html';

export const renderGuides = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');

    const save = createGuide.save(config, 'GUIDE');

    guideTxt.innerHTML = 'Select a guide.';

    const template = document.createElement('template');
    template.innerHTML = guidesTemplate;
    const parent = modal.querySelector('.js-actions');

    const months = config.guide.season.observableMonths.map(month => month.name);
    const observableMonths = `${months[0]}-${months[months.length - 1]}`;

    renderTemplate({ observableMonths }, template.content, parent);

    const idSwitch = parent.querySelector('.inat-switch-slider');

    const switchCallback = position => {

        const currentType = config.guide.season.type;

        if(position === 'right') {
            config.guide.season.type = 'all_year';
        } else {
            config.guide.season.type = 'months';
        }

        actions.boundUpdateConfig(config);
        
        if(config.guide.season.type !== currentType) {
            save();
        }        
    };

    const position = config.guide.season.type === 'months' ? 'left' : 'right';

    switchHandler(idSwitch, position, switchCallback);

    renderInatUser(modal.querySelector('.js-inat'), config, save);

    createGuide.save(config, 'GUIDE', false)();
}