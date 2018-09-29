import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';

let items;

// deliberately include the lookalikes?

const randomiseItems = collection => {

    const { ui } = store.getState();

    if(!collection.items) {
        if(!ui.sharedItems) return;
        items = ui.sharedItems.map(item => {
            return collection.items.find(i => i.name === item.name);
        });
    } else {
        items = R.take(4, utils.shuffleArray(collection.items));
        actions.boundUpdateUI({ sharedItems: items.map(item => item.name)});
    }
};

const getRandomImages = currentItem => {
    if(!items) return;
    items = items.filter(item => item !== currentItem);
    items = R.take(3, items);
    items.push(currentItem);

    const images = items.map((item, index) => { 
        return { index: index + 1, src: item.images[0], itemName: item.name };
    } );

    return images;
};

const selectImage = (selectedIndex, selectedName, isCorrectAnswer) => {
    subscriptions.forEach(sub => sub(selectedIndex, selectedName, isCorrectAnswer));
};

const subscriptions = [];

const subscribeToImageSelection = callback => {
    subscriptions.push(callback);
};

export const screenShare = {
    randomiseItems,
    getRandomImages,
    subscribeToImageSelection,
    selectImage
}