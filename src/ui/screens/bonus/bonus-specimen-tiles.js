import * as R from 'ramda';

import { store } from 'redux/store';
import { renderSpecimenTiles } from 'ui/screens/landscape/specimen-tiles';
import { renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images';

export const renderBonusSpecimenTiles = bonusLayout => {

    const collection = R.clone(store.getState().collection);

    collection.nextItem = bonusLayout.item;

    if(bonusLayout.overrides && bonusLayout.overrides.trait && bonusLayout.overrides.trait.name === 'look-alikes') {
        collection.items = bonusLayout.overrides.trait.lookalikes;
        let noOfImagesPerItem = 6 / collection.items.length;
        renderMixedSpecimenImages(collection, noOfImagesPerItem, collection.items);
    } else {
        renderSpecimenTiles(collection);
    }

};