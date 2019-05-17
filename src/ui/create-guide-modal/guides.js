import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';
import { renderTemplate } from 'ui/helpers/templating';
import guidesTemplate from 'ui/create-guide-modal/guides.html';

export const renderGuides = (modal, config, createGuide) => {

    const template = document.createElement('template');
          template.innerHTML = guidesTemplate;
    const parent = modal.querySelector('.js-actions');

    const languages = config.languages;

    if(config.guide.season.observableMonths) {
        
        const months = config.guide.season.observableMonths.map(month => month.name);
        const observableMonths = `${months[0]}-${months[months.length - 1]}`;
        
        renderTemplate({ observableMonths,languages }, template.content, parent);

        const taxonLanguageBtn = document.querySelector('#taxonLanguageBtn');
              taxonLanguageBtn.innerHTML = `Taxon language [${languages.find(l => l.lang === config.language).name}] `;

        const taxonLanguageTxt = document.querySelector('#taxonLanguageTxt');
              taxonLanguageTxt.innerHTML = languages.find(l => l.lang === config.language).name;

        document.querySelectorAll('.dropdown-item').forEach(language => {
            language.addEventListener('click', event => {            
                actions.boundUpdateLanguage(languages.find(l => l.lang === event.target.id));
                const name = languages.find(l => l.lang === event.target.id).name;
                taxonLanguageBtn.innerHTML = `Taxon language [${name}]`;
                taxonLanguageTxt.innerHTML = name;
            });
        });
    }

    const idSwitch = parent.querySelector('.inat-switch-slider');

    const switchCallback = position => {

        const { config } = store.getState();

        const currentType = config.guide.season.type;

        if(position === 'right') {
            config.guide.season.type = 'all_year';
        } else {
            config.guide.season.type = 'months';
        }

        actions.boundUpdateConfig(config);
        
        if(config.guide.season.type !== currentType) {
            config.guide.operation = 'season';
            createGuide.save(config, 'GUIDE');
        }        
    };

    const position = config.guide.season.type === 'months' ? 'left' : 'right';

    switchHandler(idSwitch, position, switchCallback);

    createGuide.save(config, 'GUIDE', false)();    
}