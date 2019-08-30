import { user } from "firebase-functions/lib/providers/auth";

const getInatSpecies = (collection) => {
    let observations = collection.results;
    return observations;
};

const getInatObservationsById = async (userId = 19829) => {
    const collectionUrl = `https://api.inaturalist.org/v1/observations?user_id=${userId}&order=desc&order_by=created_at`;
    const response = await fetch(collectionUrl);
    const json = await response.json();
    return await getInatSpecies(json);
};

const getInatObservations = async () => {
    const userId =  document.querySelector('#inputUserId').value;
    getInatObservationsById(userId);
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

const getTaxonDataIncPhotos = async (name, userId = 19829) => {
    const url = `https://www.inaturalist.org/observations.json?taxon_name=${name}&has[]=photos`;
    const response = await fetch(url);
    const json = await response.json();
    const userObservations = json.find(observation => observation.user_id === userId).photos;
    const userPhotos = userObservations.map(photo => {
        return {
            license: photo.license_name,
            rightsHolder: photo.native_username,
            source: photo.native_page_url,
            title: name,
            url: photo.medium_url
        }
    });
    return userPhotos;
}; 

export const inat = {
    getInatImages,
    getInatObservations,
    getTaxonDataIncPhotos
}
