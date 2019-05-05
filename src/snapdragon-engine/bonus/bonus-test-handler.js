import * as R from 'ramda';

import { getTraitTests } from 'snapdragon-engine/bonus/tests/trait-test';

export const getBonusTests = (collection, itemIndices, bonusLayouts, lessonName, levelName) => {

    const itemsInThisRound = collection.items.map((item, index) => {
        if(R.contains(index, itemIndices)) {
            return { ...item, itemIndex: index }
        } else return null;        
    }).filter(item => item);

    let traitTests = [];

    // Get the rest and iterate over names, etc. and use spread operator to add to bonusTests

    let layout = bonusLayouts.find(layout => layout.name === "trait-property-match");

    if(layout) {
        traitTests = getTraitTests(collection, itemsInThisRound).filter(trait => trait.question);
        traitTests = traitTests.map(traitTest => {             
            traitTest.itemIndex = traitTest.item.itemIndex;
            traitTest = { ...traitTest, ...layout, lessonName, levelName };
            return traitTest;
         });
    }

    const bonusTests = [ ...traitTests ];

    return bonusTests;
};