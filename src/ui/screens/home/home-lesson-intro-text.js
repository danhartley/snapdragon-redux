import { DOM } from 'ui/dom';
import { renderTemplate } from 'ui/helpers/templating';

import textIntroTemplate from 'ui/screens/home/home-lesson-intro-text-template.html';

export const textSetup = (collection, config) => {

    let speciesCount = getSpeciesCount(collection);

    const iconicTaxa = collection.iconicTaxa 
                            ? collection.iconicTaxa
                            : [ ...new Set(collection.items.map(i => i.iconicTaxon)) ];

    const language = config.languages.find(l => l.lang === config.language).name;

    const template = document.createElement('template');
          template.innerHTML = textIntroTemplate;

    const months = config.guide.season.observableMonths.map(month => month.name);
    const observableMonths = `${months[0]}-${months[months.length - 1]}`;
    const season = config.guide.season 
                    ? 'Species observations are drawn from the whole year.'
                    : config.guide.season === 'all_year'
                        ? 'Species observations are drawn from the whole year.'
                        : `Species observations are from ${observableMonths}.`;

    let speciesSummary = getSpeciesSummary(iconicTaxa, speciesCount);

    const summary = {
        speciesCount,
        iconicTaxa,
        title: collection.name,
        language,
        observableMonths,
        season,
        speciesSummary
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

function handleSpeciesUpdate(speciesCount, collection, speciesSummary, iconicTaxa) {
    if (speciesCount === '--') {
        speciesCount = getSpeciesCount(collection);
        document.querySelector('.js-species-summary').innerHTML = speciesSummary = getSpeciesSummary(iconicTaxa, speciesCount);
    }
    return { speciesCount, speciesSummary };
}

function getSpeciesSummary(iconicTaxa, speciesCount) {
    return iconicTaxa.length === 1
        ? `${speciesCount} species in ${iconicTaxa.length} taxon.`
        : `${speciesCount} species in ${iconicTaxa.length} taxa.`;
}

function getSpeciesCount(collection) {
    let count = (collection.itemNames && collection.itemNames.length > 0)
        ? collection.itemNames.length
        : collection.items.length;
    return count === 0 ? '--' : count;
}
