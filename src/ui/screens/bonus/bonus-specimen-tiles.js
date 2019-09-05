import * as R from 'ramda';

import { store } from 'redux/store';
import { renderSpecimenTiles } from 'ui/screens/landscape/specimen-tiles';
import { renderMixedSpecimenImages } from 'ui/screens/multichoice/landscape/mixed-specimen/left/mixed-specimen-images';

export const renderBonusSpecimenTiles = bonusLayout => {

    const collection = R.clone(store.getState().collection);
          collection.nextItem = bonusLayout.item;
    
    const lookalikesCount = bonusLayout.item ? bonusLayout.item.traits.lookalikes.length + 1 : 0; // lookalikes + item itself

    if(lookalikesCount > 0) {
        let noOfImagesPerItem = 6 / lookalikesCount;
        renderMixedSpecimenImages(collection, noOfImagesPerItem, [ collection.nextItem, ...bonusLayout.overrides.trait.lookalikes]);
    } else {
        renderSpecimenTiles(collection);
    }

};