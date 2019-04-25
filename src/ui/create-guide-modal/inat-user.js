import { actions } from 'redux/actions/action-creators';
import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';
import { renderTemplate } from 'ui/helpers/templating';
import inatTemplate from 'ui/create-guide-modal/inat-user-template.html';
import inatPortraitTemplate from 'ui/create-guide-modal/inat-user-template-portrait.html';

export const renderInatUser = (parent, config, save) => {

    const template = document.createElement('template');
    template.innerHTML = config.isLandscapeMode
                            ? inatTemplate
                            : inatPortraitTemplate;
    
    renderTemplate({ }, template.content, parent);

    let autocompleteRef;

    const setiNatIdentityBtn = parent.querySelector('.js-set-inat-identity-btn');

    setiNatIdentityBtn.addEventListener('click', event => {        
        
        const key = parent.querySelector('#inat-identity').value;
        const id = parent.querySelector('#inat-identity').name;
        config.guide.inatId.key = key;
        config.guide.inatId.id = id;

        if(key !== '') {
            actions.boundUpdateConfig(config);
            config.guide.operation = 'inat';
            save();

            parent.querySelector('#inat-identity').value = '';

            if(autocompleteRef) {
                autocompleteRef.destroy();
            }
        }
    });

    const position = config.guide.inatId.param === 'user_id' ? 'left' : 'right';

    let byType = 'users';

    const inatIdentityInput = parent.querySelector('#inat-identity');

    inatIdentityInput.addEventListener('keyup', event => {
        autocompleteRef = inatAutocomplete(inatIdentityInput, byType, 'inat-identity-autocomplete', '');
    });

    const idSwitch = parent.querySelector('.inat-switch-slider');

    const switchCallback = position => {
        
        setiNatIdentityBtn.innerHTML = position === 'left'
            ? 'Save iNat User'
            : 'Save iNat Project'

        byType = position === 'left' ? 'users' : 'projects';

        const type = position === 'left' ? 'iNat user ID' : 'iNat project ID';
        const param = position === 'left' ? 'user_id' : 'project_id';

        config.guide.inatId = { type, param };
    };

    switchHandler(idSwitch, position, switchCallback);
};