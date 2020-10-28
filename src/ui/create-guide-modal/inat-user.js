import { inatAutocomplete } from 'ui/screens/common/inat/inat-autocomplete';
import { renderTemplate } from 'ui/helpers/templating';
import { enums } from 'ui/helpers/enum-helper';

import inatTemplate from 'ui/create-guide-modal/inat-user-template.html';

export const renderInatUser = (container, createGuide) => {

    const config = createGuide.getConfig();

    const template = document.createElement('template');
          template.innerHTML = inatTemplate;

    config.guide.guideMode = enums.guideMode.DYNAMIC.name;
    if(config.guide.inatId.key !== '-----') {
        if(config.guide.locationType !== 'inat') {
            config.guide.locationType = 'inat';
            createGuide.setConfig(config);
        }
        createGuide.saveStep('INAT');
    }

    const parent = container.querySelector('.js-actions');
          parent.innerHTML = '';
    
    renderTemplate({ }, template.content, parent);

    document.querySelector('.js-chosen > div > span:nth-child(2)').innerHTML += '<div class="delete-guide-link js-toggle-filter"><input class="hide" type="checkbox"></div>';

    let autocompleteRef;

    const inatIdentityInput = parent.querySelector('#inat-identity');
          inatIdentityInput.focus();

    const inatIdentityInputHandler = e => {
        inatIdentityInput.removeEventListener('keypress', inatIdentityInputHandler);
        autocompleteRef = inatAutocomplete(inatIdentityInput, config.guide.urlType, 'inat-autocomplete-options-container', '');
    }

    inatIdentityInput.addEventListener('keypress', inatIdentityInputHandler);

    inatIdentityInput.addEventListener('click', e => {
        e.preventDefault();
    });

    inatIdentityInput.addEventListener('keyup', e => {
        e.preventDefault();
    });

    document.getElementById('inatForm').addEventListener('submit', e => {
        e.preventDefault();
        if(inatIdentityInput.value !== '') {
            saveInatId(parent, config, createGuide, autocompleteRef);
        }
    });

    if(config.isPortraitMode) {
        inatIdentityInput.addEventListener('focusout', e => {
            const container = document.querySelector('.inat-autocomplete-options-container');
               if(container) {
                  setTimeout(() => {
                      saveInatId(parent, config, createGuide, autocompleteRef);
                  });
                  e.preventDefault();
               }
        });
    }

    const inatSelectors = parent.querySelectorAll('.js-inat-types input');
          inatSelectors.forEach(inatSelector => {
            inatSelector.addEventListener('click', e => {
              const type = e.target.id;
              config.guide.inatId.type = type;
              config.guide.inatId.param = type === 'user_id' ? 'iNat user ID' : 'iNat project ID';
              config.guide.urlType = type === 'user_id' ? 'users' : 'projects';      
              createGuide.setConfig(config); 
            })
        });
};

const saveInatId = (parent, config, createGuide, autocompleteRef) => {

    const input = parent.querySelector('#inat-identity');
    if (config.isLandsapeMode) {
        input.value = '';
        input.focus();
    }
    const key = input.value;
    const id = input.name;
    config.guide.inatId.key = key;
    config.guide.inatId.id = id;

    if (key !== '') {
        config.guide.locationType = 'inat';
        createGuide.setConfig(config);
        createGuide.saveStep('INAT');
        parent.querySelector('#inat-identity').value = '';
        if (autocompleteRef) {
            // autocompleteRef.destroy();
        }
    }
};
