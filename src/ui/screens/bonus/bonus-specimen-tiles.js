import * as R from 'ramda';

import { store } from 'redux/store';
import { renderSpecimenTiles } from 'ui/screens/landscape/specimen-tiles';
import { renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images';

export const renderBonusSpecimenTiles = bonusLayout => {

    const collection = R.clone(store.getState().collection);
          collection.nextItem = bonusLayout.item;
          collection.nextItem = collection.nextItem || collection.items[collection.itemIndex];
    
    const lookalikesCount = bonusLayout.item 
            ? bonusLayout.overrides.trait.lookalikes ? bonusLayout.overrides.trait.lookalikes.length + 1 : 0 // lookalikes + item itself
            : 0;

    if(lookalikesCount > 0) {
        let noOfImagesPerItem = 6 / lookalikesCount;
        renderMixedSpecimenImages(collection, noOfImagesPerItem, [ collection.nextItem, ...bonusLayout.overrides.trait.lookalikes]);
    } else {
        renderSpecimenTiles(collection);
    }

};