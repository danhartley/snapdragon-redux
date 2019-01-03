import { renderTemplate } from 'ui/helpers/templating';
import { getLocation, getPlace } from 'geo/geo';
import { getInatTaxonStats, getInatPlaceId } from 'api/inat/inat';
import inatBoxTemplate from 'ui/screens/common/inat-box-template.html';

export async function renderInatDataBox(parent, item, config) {

    const template = document.createElement('template');

    template.innerHTML = inatBoxTemplate;

    parent.innerHTML = '';

    renderTemplate({}, template.content, parent);
    
    getInatTaxonStats(item).then(stats => {

        let taxonCount = 0, taxonId;

        stats.results.forEach(taxon => {
            taxonCount += Number.parseInt(taxon.count);
            taxonId = taxon.taxon.id;
        }); 

        const taxonLink = `https://www.inaturalist.org/taxa/${taxonId}`;

        document.querySelector('.js-taxon-count').innerHTML = taxonCount.toLocaleString();
        document.querySelector('.js-taxon-link').setAttribute('href', taxonLink);
    });

    const place = await getPlace(config);

    const country = place.country.place_name_en;

    const places = await getInatPlaceId(country);

    const placeId = places.results.find(place => place.display_name === country).id;
    
    getInatTaxonStats(item, placeId).then(stats => {

        let placeTaxonCount = 0;

        stats.results.forEach(taxon => {
            placeTaxonCount += Number.parseInt(taxon.count);
        }); 

        document.querySelector('.js-place').innerHTML = country;
        document.querySelector('.js-place-taxon-count').innerHTML = placeTaxonCount.toLocaleString();
    });
    
}