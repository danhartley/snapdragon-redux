import { store } from 'redux/store';
import { renderCollections } from 'ui/screens/right/collections';
import { renderLessons } from 'ui/screens/right/lessons';

export const renderHome = (counter) => {

    const { collections } = store.getState();

    const filteredCollections = collections.find(collection => collection.selected);
    const collectionId = filteredCollections ? filteredCollections.id : 0;

    collectionId === 0 ? renderCollections(counter) : renderLessons();

};