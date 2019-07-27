import * as R from 'ramda';

import { getTraitTests } from 'snapdragon-engine/bonus/tests/trait-test';
import { getBirdsongTests } from 'snapdragon-engine/bonus/tests/birdsong-test';
import { getLookalikeTests } from 'snapdragon-engine/bonus/tests/lookalike-test';
import { getDefinitionTests } from 'snapdragon-engine/bonus/tests/definition-test';

export const getBonusTests = (collection, itemIndices, bonusLayouts, lessonName, levelName) => {

    const itemsInThisRound = collection.items.map((item, index) => {
        if(R.contains(index, itemIndices)) {
            return { ...item, itemIndex: index }
        } else return null;        
    }).filter(item => item);

    const addLayoutToTest = traitTests => {
        const lessonReadyTests = traitTests.map(traitTest => {             
            traitTest.itemIndex = traitTest.item ? traitTest.item.itemIndex : 0; 
            traitTest = { ...traitTest, ...layout, lessonName, levelName };            
            return traitTest;
        });
        return lessonReadyTests;
    };

    const getTraitTypeTests = itemsInThisRound => {
        let traitTests = getTraitTests(itemsInThisRound);
            traitTests = traitTests.length > 0 ? traitTests.filter(trait => trait.question) : [];
        return addLayoutToTest(traitTests);
    };

    const getTraitTypeBirdsongTests = itemsInThisRound => {
        let traitTests = getBirdsongTests(itemsInThisRound).filter(trait => trait.question);
            traitTests = traitTests.length > 0 ? traitTests.filter(trait => trait.question) : [];
        return addLayoutToTest(traitTests);
    };

    const getTraitTypeLookalikeTests = async itemsInThisRound => {
        let traitTests = await getLookalikeTests(itemsInThisRound);
        console.log('traitTests: ', traitTests);
            traitTests = traitTests.filter(trait => trait.question);
            traitTests = traitTests.length > 0 ? traitTests.filter(trait => trait.question) : [];
        return addLayoutToTest(traitTests);
    };

    const getDefinitionTypeTests = item => {
        let tests = getDefinitionTests(item);
        return addLayoutToTest(tests);
    };

    let traitTests = [], birdsongTests = [], lookalikeTests = [], definitionTests = [];
    let item = collection.items[0];

    let layout = bonusLayouts.find(layout => layout.name === "trait-property-match");

    if(layout) {

        if(layout.types) {

            layout.types.forEach(type => {
                switch(type) {
                    case 'traits':
                        traitTests = getTraitTypeTests(itemsInThisRound);
                        break;
                    case 'song':
                        birdsongTests = getTraitTypeBirdsongTests(itemsInThisRound);
                        break;
                    case 'look-alikes':
                        lookalikeTests = getTraitTypeLookalikeTests(itemsInThisRound);
                        break;
                    case 'definition':                        
                        definitionTests = getDefinitionTypeTests(item);
                        break;
                }
            });

        } else {
            traitTests = getTraitTypeTests(itemsInThisRound);
            birdsongTests = getTraitTypeBirdsongTests(itemsInThisRound);            
            lookalikeTests = getTraitTypeLookalikeTests(itemsInThisRound);
            definitionTests = getDefinitionTypeTests(item);
        }
    }

    const bonusTests = [ ...traitTests, ...birdsongTests, ...lookalikeTests, ...definitionTests ];

    return bonusTests;
};