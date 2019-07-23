import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';
import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';
import { renderTemplate } from 'ui/helpers/templating';
import { renderLocation } from 'ui/create-guide-modal/location';

import inatTemplate from 'ui/create-guide-modal/inat-user-template.html';

export const renderInatUser = (modal, createGuide) => {

    const config = createGuide.getConfig();

    const template = document.createElement('template');

    template.innerHTML = inatTemplate;

    if(config.guide.inatId.key !== '-----') {
        if(config.guide.locationType !== 'inat') {
            config.guide.locationType = 'inat';
            createGuide.setConfig(config);
        }
        createGuide.saveStep('INAT');
    }

    const parent = modal.querySelector('.js-actions');
          parent.innerHTML = '';
    
    renderTemplate({ }, template.content, parent);

    document.querySelector('.js-chosen > div > span:nth-child(2)').innerHTML += '<div class="delete-guide-link js-toggle-filter"><input class="hide" type="checkbox"></div>';

    let autocompleteRef;

    const setiNatIdentityBtn = parent.querySelector('.js-set-inat-identity-btn');

    setiNatIdentityBtn.addEventListener('click', event => {        
        
        const key = parent.querySelector('#inat-identity').value;
        const id = parent.querySelector('#inat-identity').name;
        config.guide.inatId.key = key;
        config.guide.inatId.id = id;

        if(key !== '') {
            config.guide.locationType = 'inat';

            createGuide.setConfig(config);
            createGuide.saveStep('INAT');

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
            ? 'Save iNaturalist User'
            : 'Save iNaturalist Project'

        byType = position === 'left' ? 'users' : 'projects';

        const type = position === 'left' ? 'iNat user ID' : 'iNat project ID';
        const param = position === 'left' ? 'user_id' : 'project_id';

        config.guide.inatId.type = type;
        config.guide.inatId.param = param;

        createGuide.setConfig(config);
    };

    switchHandler(idSwitch, position, switchCallback);

    const linktoStandardOptions = parent.querySelector('.js-location-options1 span:nth-child(1)');

    const renderLookupLocation = () => {
        const config = createGuide.getConfig();
              config.guide.locationType = 'longLat';
        createGuide.setConfig(config);
        renderLocation(createGuide.modal, createGuide);
    };

    linktoStandardOptions.removeEventListener('click', renderLookupLocation, true);
    linktoStandardOptions.addEventListener('click', renderLookupLocation, true);
};