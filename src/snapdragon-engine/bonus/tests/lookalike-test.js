import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { species } from 'api/species';
import { store } from 'redux/store';
import { getTraits } from 'api/traits/traits';

export const getLookalikeTests = itemsInThisRound => {

    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {

        const { question, answers, overrides } = getLookalikeTest(item);

        if(!question) return {};

        return {
            item,
            question,
            answers,
            overrides
        }
    });

    return tests;
}

const getLookalikeTest = item => {

    const { enums, config } = store.getState();

    const traits = getTraits(enums);
    let lookalikes = itemProperties.itemContextProperty(traits, item, 'look-alikes');

    if(lookalikes.length === 0) return {};

    lookalikes = species.filter(item => R.contains(item.name, lookalikes));
    lookalikes.push(item);

    if(lookalikes.length < 2) return {}; 

    const question = itemProperties.getVernacularName(item, config);
    const answers = lookalikes.map(item => itemProperties.getVernacularName(item, config));

    return { question, answers, overrides : { question: 'Avoid look-alikes', help: '(Pick one correct image)', binomial: 'Latin name', vernacularName: 'Common name', trait: { name: 'look-alikes', lookalikes } } };
};
