import { store } from 'redux/store';
import { renderSpecimenTiles } from 'ui/screens/landscape/specimen-tiles';

export const renderSpecimenTiles = bonusLayout => {

    const { collection } = store.getState();

    collection.nextItem = bonusLayout.item;

    renderSpecimenTiles(collection);
};