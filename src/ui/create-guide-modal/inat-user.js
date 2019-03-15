import { actions } from 'redux/actions/action-creators';
import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';
import { renderTemplate } from 'ui/helpers/templating';
import inatTemplate from 'ui/create-guide-modal/inat-user-template.html';

export const renderInatUser = (parent, config, save) => {

    const template = document.createElement('template');
    template.innerHTML = inatTemplate;
    
    renderTemplate({ }, template.content, parent);

    let autocompleteRef;

    const setiNatIdentityBtn = parent.querySelector('.js-set-inat-identity-btn');
    setiNatIdentityBtn.disabled = true;

    setiNatIdentityBtn.addEventListener('click', event => {        
        
        const key = parent.querySelector('#inat-identity').value;
        const type = position === 'left' ? 'iNat user ID' : 'iNat project ID';
        const param = position === 'left' ? 'user_id' : 'project_id';
        const id = parent.querySelector('#inat-identity').name;
        config.guide.inatId = { key, type, param, id };

        actions.boundUpdateConfig(config);
        save();

        parent.querySelector('#inat-identity').value = '';
        setiNatIdentityBtn.disabled = true;

        if(autocompleteRef) {
            autocompleteRef.destroy();
        }        
    });

    const position = config.guide.inatId.param === 'user_id' ? 'left' : 'right';

    let byType = 'users';

    const inatIdentityInput = parent.querySelector('#inat-identity');

    inatIdentityInput.addEventListener('keyup', event => {
        autocompleteRef = inatAutocomplete(inatIdentityInput, byType, 'inat-identity-autocomplete', '');
        setiNatIdentityBtn.disabled = false;
    });

    const idSwitch = parent.querySelector('.snapdragon-switch');

    const switchCallback = position => {
        
        setiNatIdentityBtn.innerHTML = position === 'left'
            ? 'Save iNat User'
            : 'Save iNat Project'

        byType = position === 'left' ? 'users' : 'projects';
    };

    switchHandler(idSwitch, position, switchCallback);
};