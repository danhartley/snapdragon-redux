import { renderTemplate } from 'ui/helpers/templating';
import { getPlace } from 'geo/geo';
import { getInatTaxonStats, getInatPlaceId } from 'api/inat/inat';
import { renderWiki } from 'wikipedia/wiki';
import { renderWikiModal } from 'wikipedia/wiki-modal';

import inatBoxTemplate from 'ui/screens/common/inat/inat-box-template.html';

export async function renderInatDataBox(parent, item, config, mode) {

    const template = document.createElement('template');

    template.innerHTML = inatBoxTemplate;

    parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    const eolPage = document.querySelector('.js-test-card-container-eol-link');
    
    eolPage.setAttribute('href', `http://eol.org/pages/${item.id}/overview`);
    eolPage.setAttribute('target', '_blank');
    eolPage.setAttribute('style', 'text-decoration: none');

    setTimeout(()=>{
        const wikiLink = document.querySelector('.js-test-card-container-wiki');            
        renderWikiModal(item, wikiLink, config);
    });    

    const wikiNode = document.querySelector('.js-test-card-container-wiki');
          wikiNode.innerHTML = '';

    renderWiki(wikiNode, item, config.language);
    
    getInatTaxonStats(item, config).then(stats => {

        if(!stats.results) return;

        const taxonId = stats.results.find(stat => stat.taxon.name === item.name).taxon.id;
        const taxonCount = stats.results.find(stat => stat.taxon.name === item.name).count;

        const taxonLink = `https://www.inaturalist.org/taxa/${taxonId}`;

        parent.querySelector('.js-taxon-count').innerHTML = taxonCount.toLocaleString();
        parent.querySelector('.js-taxon-link').setAttribute('href', taxonLink);
    });

    const place = await getPlace(config);

    const country = place.country.place_name_en || place.country;

    const places = await getInatPlaceId(country);

    if(places.results.length === 0) return;

    const placeId = places.results.find(place => place.display_name === country).id;
    
    getInatTaxonStats(item, config, placeId).then(stats => {

        if(stats.results.length === 0) return;

        const itemStats = stats.results.find(stat => stat.taxon.name === item.name);

        if(!itemStats) return;

        const placeTaxonCount = itemStats.count;
        const establishment = itemStats.taxon.preferred_establishment_means;

        document.querySelector('.js-native-container').innerHTML = establishment || '';

        parent.querySelector('.js-world').innerHTML = mode === 'MODAL' ? 'Worldwide' : 'Worldwide sightings';
        parent.querySelector('.js-place').innerHTML = mode === 'MODAL' ? country : `${country} sightings`;
        parent.querySelector('.js-place-taxon-count').innerHTML = placeTaxonCount.toLocaleString();
    });
}