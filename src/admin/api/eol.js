import { eolAutocomplete } from 'admin/api/eol-autocomplete';
import { gbif } from 'admin/api/gbif';
import { helpers } from 'admin/helpers';

const CACHE_SECONDS = 3600;

const getSpeciesUrl = (species, selectedLicence) => {
    const speciesUrl = `https://eol.org/api/pages/1.0/${species.id}.json?details=true&images_per_page=200&licenses=${selectedLicence}&common_names=true&cache_ttl=${CACHE_SECONDS}`;
    const speciesCors = `https://cors-anywhere.herokuapp.com/${speciesUrl}`;
    species.detailsUrl = speciesCors;
    return species;
};

const getSpeciesByName = async query => {
    const search = `https://eol.org/api/search/1.0.json?q=${query}&cache_ttl=${CACHE_SECONDS}`;
    const corsSearch = `https://cors-anywhere.herokuapp.com/${search}`;
    const result = await fetch(corsSearch);
    return await result.json();
};

const searchEOLByProvider = async (hierarchyId, Id) => {
    const url = `http://eol.org/api/search_by_provider/1.0.json?batch=false&id=${Id}&hierarchy_id=${hierarchyId}&cache_ttl=${CACHE_SECONDS}`;
    const result = await fetch(url);
    return await result.json();
};

const getSpecies = async (id, selectedLicence) => {
    const item = await helpers.parseSpeciesData(eol.getSpeciesUrl({id}, selectedLicence));
    item.eolName = item.name;
    item.name = helpers.getBinomial(item);
    item.eolId = id;
    gbif.getTaxonomy(item.name).then(taxonomy => {
        item.taxonomy = {
            kingdom: taxonomy.kingdom,
            phylum: taxonomy.phylum,
            class: taxonomy.class,
            order: taxonomy.order,
            genus: taxonomy.genus,
            family: taxonomy.family
        };
    });
    delete item.id;
    return item;
}

const getSpeciesPhotos = async (id, selectedLicence) => {
    const item = await helpers.parseSpeciesData(eol.getSpeciesUrl({id}, selectedLicence));
    return item.images;
};


const searchEOL = async (input, asyncProgress, callback, selectedLicence = 'pd|cc-by|cc-by-sa|cc-by-nd', imageIds) => {        
    let item;
    const autocompleteRef = eolAutocomplete(input, 'search', 'autocomplete-options-container', () => {
        asyncProgress.classList.contains('hide')
            ? asyncProgress.classList.remove('hide')
            : asyncProgress.classList.add('hide');
    }, async () => {
        
        item = await getSpecies(input.name, selectedLicence);
        
        if(imageIds) helpers.getImagesLayout(item, imageIds, false);
        
        asyncProgress.classList.remove('hide');
        asyncProgress.innerHTML = 'Fetching matching species…';

        callback(item, autocompleteRef);

        setTimeout(() => {
            asyncProgress.classList.add('hide');
        }, 2550);
    });
};

export const eol = {
    getSpeciesUrl,
    searchEOLByProvider,
    getSpeciesByName,
    getSpecies,
    getSpeciesPhotos,
    searchEOL
}