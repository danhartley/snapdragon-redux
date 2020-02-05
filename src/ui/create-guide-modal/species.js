import { renderTemplate } from 'ui/helpers/templating';

import speciesTemplate from 'ui/create-guide-modal/species-template.html';

export const renderSpecies = createGuide => {

    const header = createGuide.modal.querySelector('.js-modal-title > div');
          header.innerHTML = 'Create your own lesson';

    const options = [
        {
            text: 'By location and season',
            id: 'A'
        },
        {
            text: 'From iNaturalist observations',
            id: 'B'
        },
        {
            text: 'By using a name-based search',
            id: 'C'
        }
    ];

    const template = document.createElement('template');
          template.innerHTML = speciesTemplate;
    const parent = createGuide.modal.querySelector('.js-actions');
          parent.innerHTML = '';

    const config = createGuide.getConfig();

    const languages = config.languages;

    renderTemplate({ options, languages }, template.content, parent);

    const handleNextStepAction = event => {
        createGuide.startLesson = false;
        createGuide.goToNextStep(createGuide.getCurrentStep() + 1, 'NEXT', event.currentTarget.dataset.optionId);
        createGuide.listeners.push( { element: createGuide.nextStepAction, handler: handleNextStepAction });
    };

    const lessonOptions = document.querySelectorAll('.custom-lesson-species-list li');
          lessonOptions.forEach((option, index) => {
            option.addEventListener('click', handleNextStepAction, true);
        });

        const taxonLanguageBtn = document.querySelector('#taxonLanguageBtn');
        taxonLanguageBtn.innerHTML = `Taxon language [ ${languages.find(l => l.lang === config.language).name} ] `;

        const taxonLanguageTxt = document.querySelector('#taxonLanguageTxt');
                taxonLanguageTxt.innerHTML = languages.find(l => l.lang === config.language).name;

        document.querySelectorAll('.dropdown-item').forEach(language => {
            language.addEventListener('click', event => {
                config.language = languages.find(l => l.lang === event.target.id).lang;
                createGuide.setConfig(config);
                const name = languages.find(l => l.lang === event.target.id).name;
                taxonLanguageBtn.innerHTML = `Taxon language [ ${name} ]`;
                taxonLanguageTxt.innerHTML = name;
            });
        });
};