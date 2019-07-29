import * as R from 'ramda';

import { getTraitTests } from 'snapdragon-engine/bonus/tests/trait-test';
import { getBirdsongTests } from 'snapdragon-engine/bonus/tests/birdsong-test';
import { getLookalikeTests } from 'snapdragon-engine/bonus/tests/lookalike-test';
import { getDefinitionTests } from 'snapdragon-engine/bonus/tests/definition-test';

export const getBonusTests = async (collection, itemIndices, bonusLayouts, lessonName, levelName) => {

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
        return new Promise(resolve => resolve(getTraitTests(itemsInThisRound)));
    };

    const getTraitTypeBirdsongTests = itemsInThisRound => {
        return new Promise(resolve => resolve(getBirdsongTests(itemsInThisRound)));
    };

    const getTraitTypeLookalikeTests = itemsInThisRound => {
        return getLookalikeTests(itemsInThisRound);     
    };

    const getDefinitionTypeTests = item => {
        return new Promise(resolve => resolve(getDefinitionTests(item)));
    };

    let traitTests = [], birdsongTests = [], lookalikeTests = [], definitionTests = [];
    let item = collection.items[0];

    let layout = bonusLayouts.find(layout => layout.name === "trait-property-match");

    if(layout) {

        if(layout.types) {

            const getResolvedPromises = async () => {
            const promises = await layout.types.map(async type => {
                switch(type) {
                    case 'traits':
                        return getTraitTypeTests(itemsInThisRound);
                    case 'song':
                        return getTraitTypeBirdsongTests(itemsInThisRound);
                    case 'look-alikes':
                        return getTraitTypeLookalikeTests(itemsInThisRound);
                    case 'definition':                        
                        return getDefinitionTypeTests(item);
                }
            });

            const testGroups = await Promise.all(promises);

            const tests = testGroups.map(group => {
                group = group.filter(g => g.question);
                return addLayoutToTest(group);
            });

            return tests;
        };

        traitTests = await getResolvedPromises();

        } else {
            traitTests = getTraitTypeTests(itemsInThisRound);
            birdsongTests = getTraitTypeBirdsongTests(itemsInThisRound);            
            lookalikeTests = getTraitTypeLookalikeTests(itemsInThisRound);
            definitionTests = getDefinitionTypeTests(item);
        }
    }

    return R.flatten(traitTests);
};