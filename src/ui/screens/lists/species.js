import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';

export const renderSpeciesCollection = (collections) => {

    const filteredCollections = collections.find(collection => collection.selected);
    const collectionId = filteredCollections ? filteredCollections.id : 0;

    if(collectionId === 0) return;

    const collection = collections.filter(collection => collection.id === collectionId)[0];
    collection.header = collection.name;

    renderSpeciesCollectionList(collection);
};