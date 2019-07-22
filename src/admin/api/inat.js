const getInatSpecies = (collection) => {
    let observations = collection.results;
    return observations;
};

const getInatObservations = async () => {
    const userId =  document.querySelector('#inputUserId').value;
    const collectionUrl = `https://api.inaturalist.org/v1/observations?user_id=${userId}&order=desc&order_by=created_at`;
    const response = await fetch(collectionUrl);
    const json = await response.json();
    return await getInatSpecies(json);
};

const parseInatImages = images => {
    return images;
};

const getInatImages = async (observation) => {
    const taxon = observation.taxon;
    if(!taxon) return [];
    const taxonId = taxon.id;
    const url = `https://api.inaturalist.org/v1/observations?id_please=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&taxon_id=${taxonId}&order=desc&order_by=created_at`;
    const response = await fetch(url);
    const json = await response.json();
    return await parseInatImages(json);
};

export const inat = {
    getInatImages,
    getInatObservations
}
