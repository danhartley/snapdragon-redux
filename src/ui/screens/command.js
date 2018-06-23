import * as R from 'ramda';

import { store } from 'redux/store';
import { cutter } from 'ui/helpers/wordplay';
import { renderLetters } from 'ui/screens/common/letters';
import { renderSpecimenTiles } from 'ui/screens/left/specimen-tiles';

export const runTask = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { config, counter } = store.getState();

    if(counter.index >= collection.moduleSize) return;

    renderSpecimenTiles(collection);
    const letters = [];

    R.take(6, item.multipleNames.map(answer => {
        letters.push(cutter(answer.name, 5));
    }));

    renderLetters(letters, item, config.callbackTime); 
};