import { returnTaxonIcon } from 'ui/helpers/icon-handler';
import { snapdragonCollections } from 'snapdragon-config/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import homeGuideTemplate from 'ui/screens/home/home-guide-summary-template.html';

export const renderGuideSummary = (config, parent, speciesCount) => {

    const location = config.guide.locationType === 'longLat' ? config.guide.locationLongLat : config.guide.locationPlace;
    const place = config.guide.locationType === 'longLat' ? config.guide.locationLongLat.split(',')[0] : config.guide.place.name;
    const range = (config.guide.locationType === 'inat' || config.guide.locationType === 'place') ? 0 : config.guide.speciesRange;

    speciesCount = speciesCount === 0 ? '' : speciesCount;
    
    const taxa = speciesCount 
        ? `${speciesCount} species` 
        : config.guide.iconicTaxa.length > 0 
            ? config.guide.iconicTaxa.map(taxon => taxon.common).join(', ') 
            : 'All species';

    const inatId = config.guide.inatId 
                        ? config.guide.locationType === 'inat'
                            ? config.guide.inatId.key 
                            : ''
                        : '';
    
    const getSeason = config => {
        if(config.guide.season.type === 'months') {
            const months = config.guide.season.observableMonths.map(month => month.name);
            const observableMonths = `${months[0]}-${months[months.length - 1]}`;
            return observableMonths;
        } else {
            return 'All Year';
        }
    };

    const season = getSeason(config);

    const template = document.createElement('template');
          template.innerHTML = homeGuideTemplate;
    const language = config.languages.find(language => language.lang === config.language).name;

    renderTemplate({ location, place, taxa, inatId, season, language }, template.content, parent);

    const taxaNode = document.querySelector('.js-taxa');

    let icons = '';
    if(config.guide.iconicTaxa.length > 0) {
        config.guide.iconicTaxa.forEach(taxon => {
            const icon = returnTaxonIcon(taxon.id.toLowerCase());
            icons += icon;
        })
        taxaNode.innerHTML = `${icons}<span class="hide-empty species-count js-species-count"> ${speciesCount}</span` ;
    } else {
        taxaNode.innerHTML = `All species<span class="hide-empty species-count js-species-count"> ${speciesCount}</span`;
    }
    
    const iNatId = document.querySelector('.js-iNatId');

    iNatId.innerHTML = inatId 
                ? `<span>${inatId}</span><span class="super-text">${config.guide.inatId.type}</span>`
                : '';

    if(config.isPortraitMode || config.guide.locationType === 'longLat' || config.guide.locationType === 'place' && config.guide.place.id === 'any') return;

    const within = range === 0 ? '' : `<span class="super-text">within ${range}km</span>`;
    
    const widgetLink = document.querySelector('.js-iNatWidget');
    
          widgetLink.innerHTML = `<span data-toggle="modal" data-target="#iNatWidgetModal" class="underline-link">${place}</span>${within}`;
    
    const collection = snapdragonCollections.find(collection => collection.id === config.guide.place.id);
    
    widgetLink.addEventListener('click', event => {

        if(config.guide.place && config.guide.place.type === 'users') return;

        const iconicTaxaCount = config.guide.iconicTaxa.length > 0 ? config.guide.iconicTaxa.map(taxon => taxon.common).join(', ') : 'All species';

        document.querySelector('#iNatWidgetModal .modal-header').innerHTML = 
        config.guide.iconicTaxa.length > 0
            ? `iNaturalist species observed in ${place} filtered by <span class="toUpperCase">${iconicTaxaCount}</span>`
            : `iNaturalist species observed in ${place}`;

        let params = collection ? collection.iNatWidget : config.guide.place.id;
        if(config.guide.iconicTaxa.length > 0) {
            params += `?taxon=${config.guide.iconicTaxa.map(taxon => taxon.id).join(',')}`;
        }
        const widget = `<iframe width="100%" height="500" scrolling="auto" src="https://www.inaturalist.org/places/guide_widget/${params}"></iframe>`;
        document.querySelector('#iNatWidgetModal .modal-body').innerHTML = widget;
    });
};