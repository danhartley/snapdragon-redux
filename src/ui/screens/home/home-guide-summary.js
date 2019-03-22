import { returnTaxonIcon } from 'ui/helpers/icon-handler';
import { snapdragonCollections } from 'snapdragon/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import homeGuideTemplate from 'ui/screens/home/home-guide-summary-template.html';

export const renderGuideSummary = (config, parent, speciesCount) => {

    const location = config.guide.locationType === 'longLat' ? config.guide.locationLongLat : config.guide.locationPlace;
    const place = config.guide.locationType === 'longLat' ? config.guide.locationLongLat.split(',')[0] : config.guide.place.name;
    const range = config.guide.speciesRange;
    
    const taxa = speciesCount 
        ? `${speciesCount} species` 
        : config.guide.iconicTaxa.length > 0 
            ? config.guide.iconicTaxa.map(taxon => taxon.common).join(', ') 
            : 'All species';

    const inatId = config.guide.inatId ? config.guide.inatId.key : '';
    
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

    renderTemplate({ location, place, taxa, inatId, season }, template.content, parent);

    if(config.isPortraitMode) {

        const taxa = document.querySelector('.js-taxa');

        let icons = '';
        if(config.guide.iconicTaxa.length > 0) {
            config.guide.iconicTaxa.forEach(taxon => {
                const icon = returnTaxonIcon(taxon.id.toLowerCase());
                icons += icon;
            })
            taxa.innerHTML = icons;
        } else {
            taxa.innerHTML = 'All species';
        }
    }

    const iNatId = document.querySelector('.js-iNatId');

    iNatId.innerHTML = inatId 
                ? `<span>${inatId}</span><span class="super-text">${config.guide.inatId.type}</span>`
                : '';

    const widgetLink = document.querySelector('.js-iNatWidget');
    
    widgetLink.innerHTML = `<span data-toggle="modal" data-target="#iNatWidgetModal">${place}</span><span class="super-text">within ${range}km</span>`;
    
    const collection = snapdragonCollections.find(collection => collection.id === config.guide.place.id);
    
    return; // THIS COULD BE AVAILABLE SOMETIMES, NO?

    widgetLink.addEventListener('click', event => {

        if(config.guide.place && config.guide.place.type === 'users') return;

        document.querySelector('#iNatWidgetModal .modal-header').innerHTML = 
        config.guide.iconicTaxa.length > 0
            ? `iNaturalist species observed within ${range}km of ${place} filtered by <span class="toUpperCase">${taxa}</span>`
            : `iNaturalist species observed within ${range}km of ${place}`;

        let params = collection ? collection.iNatWidget : config.guide.place.id;
        if(config.guide.iconicTaxa.length > 0) {
            params += `?taxon=${config.guide.iconicTaxa.map(taxon => taxon.id).join(',')}`;
        }
        const widget = `<iframe width="100%" height="500" scrolling="auto" src="https://www.inaturalist.org/places/guide_widget/${params}"></iframe>`;
        document.querySelector('#iNatWidgetModal .modal-body').innerHTML = widget;
    });
};