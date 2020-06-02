import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';

import textIntroTemplate from 'ui/screens/home/home-lesson-intro-text-template.html';

export const textSetup = (collection, config) => {

    let speciesCount = getSpeciesCount(collection);

    const iconicTaxa = collection.guide.iconicTaxa 
                            ? collection.guide.iconicTaxa
                            : [ ...new Set(collection.items.map(i => i.iconicTaxon)) ];

    const language = config.languages.find(l => l.lang === config.language).name; // place in guide, and copy to collection

    const template = document.createElement('template');
          template.innerHTML = textIntroTemplate;

    const months = collection.guide.season.observableMonths ? collection.guide.season.observableMonths.map(month => month.name) : [];
    const observableMonths = months.length > 0 ? `${months[0]}-${months[months.length - 1]}` : '';
    const season = months.length === 0
                    ? 'Species observations are drawn from the whole year.'
                    : collection.guide.season === 'all_year'
                        ? 'Species observations are drawn from the whole year.'
                        : `Species observations are from ${observableMonths}.`;

    let speciesSummary = getSpeciesSummary(iconicTaxa, speciesCount);

    let lessonIntro = collection.intro || '';

    const summary = {
        speciesCount,
        iconicTaxa,
        title: collection.name,
        language,
        observableMonths,
        season,
        speciesSummary,
        lessonIntro
    };

    DOM.rightBody.innerHTML = '';

    renderTemplate(summary, template.content, DOM.rightBody);

    setTimeout(() => {
        ({ speciesCount, speciesSummary } = handleSpeciesUpdate(speciesCount, collection, speciesSummary, iconicTaxa));
    }, 500);
    
    setTimeout(() => {
        ({ speciesCount, speciesSummary } = handleSpeciesUpdate(speciesCount, collection, speciesSummary, iconicTaxa));
    }, 1500);
};

const handleSpeciesUpdate = (speciesCount, collection, speciesSummary, iconicTaxa) => {
    if (speciesCount === '--') {
        speciesCount = getSpeciesCount(collection);
        document.querySelector('.js-species-summary').innerHTML = speciesSummary = getSpeciesSummary(iconicTaxa, speciesCount);
    }
    return { speciesCount, speciesSummary };
};

const getSpeciesSummary = (iconicTaxa, speciesCount) => {
    return iconicTaxa.length === 1
        ? `${speciesCount} species in ${iconicTaxa.length} taxon.`
        : `${speciesCount} species in ${iconicTaxa.length} taxa.`;
};

const getSpeciesCount = collection => {
    let count = (collection.itemNames && collection.itemNames.length > 0)
        ? collection.itemNames.length
        : collection.items ? collection.items.length : 0;
    return count === 0 ? '--' : count;
};