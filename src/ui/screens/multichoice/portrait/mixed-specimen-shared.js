import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';

let items;

const randomiseItems = collection => {

    const { ui } = store.getState();

    if(!collection.nextItem) return;

    const rank = matchTaxon(collection.nextItem.taxonomy, iconicTaxa).toLowerCase();

    if(!collection.items) {
        if(!ui.sharedItems) return;
        items = ui.sharedItems.map(item => {
            return collection.items.find(i => i.name === item.name);
        });
    } else {
        const itemPool = collection.allItems || collection.items;
        const clonedItems = R.clone(itemPool.filter(item => matchTaxonKey(item.taxonomy,[rank])));
        items = R.take(5, utils.shuffleArray(clonedItems.filter(ci => ci.name !== collection.nextItem.name)));
        const nextItem = clonedItems.find(i => i.name === collection.nextItem.name);
        if(nextItem) items.push(nextItem);
        actions.boundUpdateUI({ sharedItems: items.map(item => item.name)});
    }
};

const getRandomImages = (currentItem, config, number) => {
    if(!items) return;
    items = items.filter(item => item.name !== currentItem.name);
    items = R.take(number-1, items);
    items.push(currentItem);

    let images;

    if(config.isPortraitMode) {
        images = items.map((item, index) => { 
            return { index: index + 1, srcs: item.images, itemName: item.name };
        } );
    } else {
        images = items.map((item, index) => { 
            return { index: index + 1, ...item.images[0], itemName: item.name };
        } );
    }

    images.forEach(i => {
        i.url = i.url.replace('.jpg', '.260x190.jpg');
    });
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