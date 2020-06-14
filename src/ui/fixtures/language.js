import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';
import { languagePicker } from 'ui/screens/common/language-selection';

import languageTemplate from 'ui/fixtures/language-template.html';

export const renderLanguagePicker = () => {

    const { config } = store.getState();

    const parent = document.querySelector('#basicModal .js-modal-text');
          parent.innerHTML = '';

    const template = document.createElement('template');    
          template.innerHTML = languageTemplate;

    renderTemplate({ }, template.content, parent);

    document.querySelector('#basicModal .js-modal-text-title header').innerHTML = 'Vernacular language';

    languagePicker(config, document.querySelector('.js-language-selection-container'), (config) => {
        actions.boundUpdateConfig(config);
    });
};