import { actions } from 'redux/actions/action-creators';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';
import { renderTemplate } from 'ui/helpers/templating';
import inatTemplate from 'ui/create-guide-modal/inat-user-template.html';

export const renderInatUser = (modal, config, saveYourChangesBtn, chosen) => {

    const template = document.createElement('template');
    template.innerHTML = inatTemplate;
    const parent = modal.querySelector('.js-actions');
    
    renderTemplate({ }, template.content, parent);

    let autocompleteRef;

    const setiNatIdentityBtn = modal.querySelector('.js-set-inat-identity-btn');
    setiNatIdentityBtn.disabled = true;

    chosen.innerHTML = config.guide.inatId.key;

    setiNatIdentityBtn.addEventListener('click', event => {        

        const id = modal.querySelector('#inat-identity').value;
        const type = position === 'left' ? 'iNat user ID' : 'iNat project ID';
        config.guide.inatId = { key: id, type: type };
        actions.boundUpdateConfig(config);

        saveYourChangesBtn();
        modal.querySelector('#inat-identity').value = '';
        setiNatIdentityBtn.disabled = true;

        if(autocompleteRef) {
            autocompleteRef.destroy();
        }        
    });

    let position = 'left';
    let byType = 'users';

    const inatIdentityInput = modal.querySelector('#inat-identity');

    inatIdentityInput.addEventListener('keyup', event => {
        autocompleteRef = inatAutocomplete(inatIdentityInput, byType, 'inat-identity-autocomplete', '');
        setiNatIdentityBtn.disabled = false;
    });

    const idSwitch = modal.querySelector('.inat-id-switch');
    const idSwitchBtn = idSwitch.querySelector('div');

    idSwitch.addEventListener('click', event => {
        if(position === 'left') {
            idSwitchBtn.parentElement.classList.add('right');
            idSwitchBtn.parentElement.classList.remove('left');
            position = 'right';
        } else {
            idSwitchBtn.parentElement.classList.add('left');
            idSwitchBtn.parentElement.classList.remove('right');
            position = 'left';
        }

        setiNatIdentityBtn.innerHTML = position === 'left'
                ? 'Save iNat User'
                : 'Save iNat Project'

        byType = position === 'left' ? 'users' : 'projects';
    });

};