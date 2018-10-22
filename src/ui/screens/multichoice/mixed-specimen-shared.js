import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';

let items;

const randomiseItems = collection => {

    const { ui } = store.getState();

    if(!collection.nextItem) return;

    if(!collection.items) {
        if(!ui.sharedItems) return;
        items = ui.sharedItems.map(item => {
            return collection.items.find(i => i.name === item.name);
        });
    } else {
        const clonedItems = R.clone(collection.items);
        items = R.take(3, utils.shuffleArray(clonedItems.filter(ci => ci.name !== collection.nextItem.name)));
        items.push(clonedItems.find(i => i.name === collection.nextItem.name));
        actions.boundUpdateUI({ sharedItems: items.map(item => item.name)});
    }
};

const getRandomImages = (currentItem, config) => {
    if(!items) return;
    items = items.filter(item => item !== currentItem);
    items = R.take(3, items);
    items.push(currentItem);

    let images;

    if(config.isPortraitMode) {
        images = items.map((item, index) => { 
            return { index: index + 1, srcs: item.images, itemName: item.name };
        } );
    } else {
        images = items.map((item, index) => { 
            return { index: index + 1, src: item.images[0], itemName: item.name };
        } );
    }

    return images;
};

const selectImage = (selectedIndex, selectedName, isCorrectAnswer, correctAnswer) => {
    subscriptions.forEach(sub => sub(selectedIndex, selectedName, isCorrectAnswer, correctAnswer));
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