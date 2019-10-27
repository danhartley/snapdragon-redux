import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';
import { renderTemplate } from 'ui/helpers/templating';

import guidesTemplate from 'ui/create-guide-modal/season.html';

export const renderSeason = (modal, createGuide) => {

    const config = createGuide.getConfig();

    const template = document.createElement('template');
          template.innerHTML = guidesTemplate;
    const parent = modal.querySelector('.js-actions');

    const languages = config.languages;

    // config.guide.season.observableMonths = config.guide.season.observableMonths || config.season.observableMonths;

    // if(config.guide.season.observableMonths) {

        // const months = config.guide.season.observableMonths.map(month => month.name);
        // const observableMonths = `${months[0]}-${months[months.length - 1]}`;
        
        renderTemplate({ languages }, template.content, parent);

        const taxonLanguageBtn = document.querySelector('#taxonLanguageBtn');
              taxonLanguageBtn.innerHTML = `Taxon language [${languages.find(l => l.lang === config.language).name}] `;

        const taxonLanguageTxt = document.querySelector('#taxonLanguageTxt');
              taxonLanguageTxt.innerHTML = languages.find(l => l.lang === config.language).name;

        document.querySelectorAll('.dropdown-item').forEach(language => {
            language.addEventListener('click', event => {
                config.language = languages.find(l => l.lang === event.target.id).lang;
                createGuide.setConfig(config);
                const name = languages.find(l => l.lang === event.target.id).name;
                taxonLanguageBtn.innerHTML = `Taxon language [${name}]`;
                taxonLanguageTxt.innerHTML = name;
            });
        });
    // }

    // const idSwitch = parent.querySelector('.inat-switch-slider');

    // const switchCallback = position => {

    //     const config = createGuide.getConfig();

    //     const currentType = config.guide.season.type;

    //     if(position === 'right') {
    //         config.guide.season.type = 'all_year';
    //     } else {
    //         config.guide.season.type = 'months';
    //     }

    //     createGuide.setConfig(config);
        
    //     if(config.guide.season.type !== currentType) {
    //         createGuide.saveStep('SEASON');
    //     }        
    // };

    // const position = config.guide.season.type === 'months' ? 'left' : 'right';

    // switchHandler(idSwitch, position, switchCallback);

    createGuide.saveStep('SEASON', false);
}