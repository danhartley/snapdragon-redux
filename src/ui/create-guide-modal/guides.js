import { actions } from 'redux/actions/action-creators';
import { switchHandler } from 'ui/create-guide-modal/common/snapdragon-switch';
import { renderInatUser } from 'ui/create-guide-modal/inat-user';
import { renderTemplate } from 'ui/helpers/templating';
import guidesTemplate from 'ui/create-guide-modal/guides.html';

export const renderGuides = (modal, config, createGuide) => {

    const guideTxt = modal.querySelector('.guide-text');

    const save = createGuide.save(config, 'GUIDE');

    guideTxt.innerHTML = 'Filter by language & season.';

    const genericSelectedtext = modal.querySelector('.js-chosen');
          genericSelectedtext.classList.add('hide');

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

        document.querySelectorAll('.dropdown-item').forEach(language => {
            language.addEventListener('click', event => {
                actions.boundUpdateLanguage(languages.find(l => l.lang === event.target.id));
                taxonLanguageBtn.innerHTML = `Taxon language [${languages.find(l => l.lang === event.target.id).name}] `;
            });
        });
    }

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
            config.guide.operation = 'season';
            save();
        }        
    };

    const position = config.guide.season.type === 'months' ? 'left' : 'right';

    switchHandler(idSwitch, position, switchCallback);

    renderInatUser(modal.querySelector('.js-inat'), config, save);

    createGuide.save(config, 'GUIDE', false)();    
}