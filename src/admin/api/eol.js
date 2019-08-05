const getSpecies = (collection, selectedLicence) => {
    
    let eolCollection = collection.collection_items.map(item => ({ id: item.object_id }));
        
    return eolCollection.map(species => {
        const speciesUrl = `https://eol.org/api/pages/1.0/${species.id}.json?details=true&images_per_page=200&licenses=${selectedLicence}&common_names=true`;
        const speciesCors = `https://cors-anywhere.herokuapp.com/${speciesUrl}`;
        species.detailsUrl = speciesCors;
        return species;
    });
};

const getSpecisByName = async query => {
    const search = `https://eol.org/api/search/1.0.json?q=${query}`;
    const corsSearch = `https://cors-anywhere.herokuapp.com/${search}`;
    const result = await fetch(corsSearch);
    return await result.json();
};

const getCollectionFromSpeciesList = (speciesList) => {
    const ids = speciesList.split(',');
    const collection = {};
    collection.collection_items = ids.map(id => {
        return { object_id: id.trim() };
    });
    return new Promise(resolve => {
        resolve(collection);
    });
};

const getCollection = async (selectedLicence, speciesList) => {

    let collection = {};

    if(speciesList !== '') {
        collection = await getCollectionFromSpeciesList(speciesList);
    } else {
        const collectionId =  parseInt(document.querySelector('#inputCollection').value);
        const collectionUrl = `http://eol.org/api/collections/1.0/${collectionId}.json?page=1&per_page=200&filter=&sort_by=recently_added&sort_field=&cache_ttl=&language=en`;
        const collectionCors = `https://cors-anywhere.herokuapp.com/${collectionUrl}`;
        const response = await fetch(collectionCors);
        collection = await response.json();
    }

    return await getSpecies(collection, selectedLicence);
};

const searchEOLByProvider = async (hierarchyId, Id) => {
    const url = `http://eol.org/api/search_by_provider/1.0.json?batch=false&id=${Id}&hierarchy_id=${hierarchyId}&cache_ttl=`;
    const result = await fetch(url);
    return await result.json();
};

export const eol = {
    getSpecies,
    getCollection,
    searchEOLByProvider,
    getSpecisByName
}