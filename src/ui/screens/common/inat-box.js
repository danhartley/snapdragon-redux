import { utils } from 'utils/utils';
import { renderTemplate } from 'ui/helpers/templating';
import { getLocation, getPlace } from 'geo/geo';
import { getInatTaxonStats, getInatPlaceId } from 'api/inat/inat';
import inatBoxTemplate from 'ui/screens/common/inat-box-template.html';

import { renderWiki } from 'wikipedia/wiki';
import { renderWikiModal } from 'wikipedia/wiki-modal';

export async function renderInatDataBox(parent, item, config, mode) {

    const template = document.createElement('template');

    template.innerHTML = inatBoxTemplate;

    parent.innerHTML = '';

    const native = item.establishmentMeans 
        ? {
            range: `${utils.capitaliseFirst(item.establishmentMeans.establishment_means)} to ${item.establishmentMeans.place.display_name}`
        }
        : {
            range: ''
        };

    native.font = native.range.length > 40 ? 'font-size:.8rem' : '';

    renderTemplate({native}, template.content, parent);
    
    getInatTaxonStats(item, config).then(stats => {

        let taxonCount = 0, taxonId;

        stats.results.forEach(taxon => {
            taxonCount += Number.parseInt(taxon.count);
            taxonId = taxon.taxon.id;
        }); 

        const taxonLink = `https://www.inaturalist.org/taxa/${taxonId}`;

        parent.querySelector('.js-taxon-count').innerHTML = taxonCount.toLocaleString();
        parent.querySelector('.js-taxon-link').setAttribute('href', taxonLink);
    });

    const place = await getPlace(config);

    const country = place.country.place_name_en || place.country;

    const places = await getInatPlaceId(country);

    const placeId = places.results.find(place => place.display_name === country).id;
    
    getInatTaxonStats(item, config, placeId).then(stats => {

        let placeTaxonCount = 0;

        stats.results.forEach(taxon => {
            placeTaxonCount += Number.parseInt(taxon.count);
        }); 

        parent.querySelector('.js-place').innerHTML = `${country} observations`;
        parent.querySelector('.js-world').innerHTML = 'Worldwide observations';
        // parent.querySelector('.js-world').innerHTML = mode === 'MODAL' ? 'Worldwide' : 'Worldwide observations';
        // parent.querySelector('.js-place').innerHTML = mode === 'MODAL' ? country : `${country} observations`;
        parent.querySelector('.js-place-taxon-count').innerHTML = placeTaxonCount.toLocaleString();
    });
    
    const eolPage = document.querySelector('.js-species-card-eol-link');
    
    eolPage.setAttribute('href', `http://eol.org/pages/${item.id}/overview`);
    eolPage.setAttribute('target', '_blank');
    eolPage.setAttribute('style', 'text-decoration: none');

    setTimeout(()=>{
        const wikiLink = document.querySelector('.js-species-card-wiki');            
        renderWikiModal(item, wikiLink, config);
    });    

    const wikiNode = document.querySelector('.js-species-card-wiki');

    wikiNode.innerHTML = '';

    renderWiki(wikiNode, item, config.language);
}