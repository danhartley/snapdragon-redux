import * as R from 'ramda';

import { utils } from 'utils/utils'; 
import { store } from 'redux/store';

let items;

// deliberately include the lookalikes?

export const randomiseItems = collection => {
    if(!collection.items) return;
    items = R.take(4, utils.shuffleArray(collection.items));
};

export const getRandomItems = currentItem => {
    if(!items) return;
    items = items.filter(item => item !== currentItem);
    items = R.take(3, items);
    items.push(currentItem);
    return items;
};