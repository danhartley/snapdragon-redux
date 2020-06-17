import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { firestore } from 'api/firebase/firestore';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';

export const getDefinitionTests = itemsInThisRound => {
    
    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {

        return getDefinitionTest(item);

    });

    return tests;
};

const getDefinitionTest = async item => {

    const { config, collection, glossary } = store.getState();

    const number = config.isPortraitMode ? 4 : 4;

    const taxon = matchTaxon(item.taxonomy, iconicTaxa).value;

    let definitions = glossary.filter(definition => R.contains(definition.taxon, [ taxon, 'common' ]));

    definitions = utils.shuffleArray(definitions);

    const term = item.terms 
                    ? utils.shuffleArray(item.terms)[0] 
                    : item.genus
                        ? item.genus.terms
                            ? item.genus.terms[collection.itemIndex] 
                                ? item.genus.terms[collection.itemIndex] 
                                    : item.family
                                    ? item.family.terms
                                        ? utils.shuffleArray(item.family.terms)[0]
                                        : null
                                    : null
                            : null
                        : null;
                    

    const definition = !!term 
        ? definitions.find(definition => definition.term.toLowerCase() === term.toLowerCase())
        : definitions[0];

    const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(definitions)).filter(d => d.term.toLowerCase() !== definition.term.toLowerCase())).map(d => utils.capitaliseFirst(d.definition));
    
    const question = definition.definition;
    const answers = utils.shuffleArray([question, ...alternatives]);
    const help = config.isLandscapeMode ? 'Select the correct answer' : 'Select correct answer';

    return { question, answers, overrides : { question: definition.term, help, binomial: item.name, vernacularName: item.vernacularName } };
};