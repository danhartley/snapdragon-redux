import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';

import textIntroTemplate from 'ui/screens/home/home-lesson-intro-text-template.html';

export const textSetup = (collection, config) => {

    const speciesCount = collection.itemNames.length > 0
                            ? collection.itemNames.length 
                            : collection.items.length;
    const iconicTaxa = collection.iconicTaxa 
                            ? collection.iconicTaxa
                            : [ ...new Set(collection.items.map(i => i.iconicTaxon)) ];

    const language = config.languages.find(l => l.lang === config.language).name;

    const template = document.createElement('template');
          template.innerHTML = textIntroTemplate;

    const months = config.guide.season.observableMonths.map(month => month.name);
    const observableMonths = `${months[0]}-${months[months.length - 1]}`;
    const season = config.guide.season === 'all_year'
                    ? 'Species observations drawn from the whole year.'
                    : `Species observations are from ${observableMonths}.`;

    const summary = {
        speciesCount,
        iconicTaxa,
        title: collection.name,
        language,
        observableMonths,
        season
    };

    DOM.rightBody.innerHTML = '';

    renderTemplate(summary, template.content, DOM.rightBody);
};