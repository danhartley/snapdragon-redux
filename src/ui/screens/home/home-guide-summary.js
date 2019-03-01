import { snapdragonCollections } from 'snapdragon/snapdragon-collections';
import { renderTemplate } from 'ui/helpers/templating';
import homeGuideTemplate from 'ui/screens/home/home-guide-summary-template.html';

export const renderGuideSummary = (config, parent, speciesCount) => {

    const location = config.guide.locationType === 'longLat' ? config.guide.locationLongLat : config.guide.locationPlace;
    const place = config.guide.place.name;
    const range = config.guide.speciesRange;
    const taxa = speciesCount 
        ? `${speciesCount} species` 
        : config.guide.iconicTaxa.length > 0 
            ? config.guide.iconicTaxa.map(taxon => taxon.common).join(', ') 
            : 'All species';
    const guide = config.guide.studyMethod.replace('_', ' ');

    const template = document.createElement('template');
    template.innerHTML = homeGuideTemplate;

    renderTemplate({ location, place, taxa, guide }, template.content, parent);

    return;

    const widgetLink = document.querySelector('.js-iNatWidget');

    widgetLink.innerHTML = `<span data-toggle="modal" data-target="#iNatWidgetModal" class="underline-link">${place}</span><span class="species-range">within ${range}km range</span>`;

    const collection = snapdragonCollections.find(collection => collection.id === config.guide.place.id);

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