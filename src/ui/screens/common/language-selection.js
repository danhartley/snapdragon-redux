import { renderTemplate } from 'ui/helpers/templating';

import languageSelectionTemplate from 'ui/screens/common/language-selection-template.html';

export const languagePicker = (config, parent, listener) => {

    const languages = config.languages;

    const template = document.createElement('template');
          template.innerHTML = languageSelectionTemplate;
    
    parent.innerHTML = '';

    renderTemplate({ languages }, template.content, parent);

    const taxonLanguageBtn = document.querySelector('#taxonLanguageBtn');
          taxonLanguageBtn.innerHTML = `Taxon language [ ${languages.find(l => l.lang === config.language).name} ] `;

    const taxonLanguageTxt = document.querySelector('#taxonLanguageTxt');
          taxonLanguageTxt.innerHTML = languages.find(l => l.lang === config.language).name;

    document.querySelectorAll('.dropdown-item').forEach(language => {
        language.addEventListener('click', event => {
            config.language = languages.find(l => l.lang === event.target.id).lang;
            const name = languages.find(l => l.lang === event.target.id).name;
            taxonLanguageBtn.innerHTML = `Taxon language [ ${name} ]`;
            taxonLanguageTxt.innerHTML = name;
            listener(config);
        });    
    });

};