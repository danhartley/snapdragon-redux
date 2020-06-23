import{ clone } from 'ramda';

import { store } from 'redux/store';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';
import { renderMixedSpecimenQuestion } from 'ui/screens/multichoice/landscape/mixed-specimen/right/mixed-specimen-question';

export const renderBonusTest = bonusLayout => {

    const collection = clone(store.getState().collection);

    collection.nextItem = bonusLayout.item;

    if(bonusLayout.overrides && bonusLayout.overrides.trait && bonusLayout.overrides.trait.name === 'lookalikes') {
        collection.items = [ ...bonusLayout.overrides.trait.lookalikes, collection.nextItem ];
        renderMixedSpecimenQuestion(collection, bonusLayout);
    } else {        
        renderMultiStrips(collection, bonusLayout);
    }

};
