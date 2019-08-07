import { gbif } from 'admin/api/gbif';
import { helpers } from 'admin/helpers';

const getSpeciesUrl = (species, selectedLicence) => {
    const speciesUrl = `https://eol.org/api/pages/1.0/${species.id}.json?details=true&images_per_page=200&licenses=${selectedLicence}&common_names=true`;
    const speciesCors = `https://cors-anywhere.herokuapp.com/${speciesUrl}`;
    species.detailsUrl = speciesCors;
    return species;
};

const getSpeciesByName = async query => {
    const search = `https://eol.org/api/search/1.0.json?q=${query}`;
    const corsSearch = `https://cors-anywhere.herokuapp.com/${search}`;
    const result = await fetch(corsSearch);
    return await result.json();
};

const searchEOLByProvider = async (hierarchyId, Id) => {
    const url = `http://eol.org/api/search_by_provider/1.0.json?batch=false&id=${Id}&hierarchy_id=${hierarchyId}&cache_ttl=`;
    const result = await fetch(url);
    return await result.json();
};

const getSpecies = async (id, selectedLicence) => {
    const item = await helpers.parseSpeciesData(eol.getSpeciesUrl({id}, selectedLicence));
    const binomial = helpers.getBinomial(item);
    gbif.getTaxonomy(binomial).then(taxonomy => {
        item.taxonomy = {
            kingdom: taxonomy.kingdom,
            phylum: taxonomy.phylum,
            class: taxonomy.class,
            order: taxonomy.order,
            genus: taxonomy.genus,
            family: taxonomy.family
        };
    });
    return item;
}

const getSpeciesPhotos = async (id, selectedLicence) => {
    const item = await helpers.parseSpeciesData(eol.getSpeciesUrl({id}, selectedLicence));
    return item.images;
}

export const eol = {
    getSpeciesUrl,
    searchEOLByProvider,
    getSpeciesByName,
    getSpecies,
    getSpeciesPhotos
}