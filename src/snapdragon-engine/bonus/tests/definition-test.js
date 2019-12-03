import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { getGlossary } from 'api/glossary/glossary';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';

export const getDefinitionTests = itemsInThisRound => {
    
    if(itemsInThisRound === undefined) return [];

    const tests = itemsInThisRound.map(item => {

        return getDefinitionTest(item);

    });

    return tests;
};

const getDefinitionTest = item => {

    const { config } = store.getState();

    const number = config.isPortraitMode ? 4 : 4;

    const definitions = utils.shuffleArray(getGlossary([ matchTaxon(item.taxonomy, iconicTaxa).value, 'common' ]));

    const term = item.terms ? utils.shuffleArray(item.terms)[0] : null;

    const definition = !!term 
        ? definitions.find(definition => definition.term.toLowerCase() === term.toLowerCase())
        : definitions[0];

    const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(definitions)).filter(d => d.term.toLowerCase() !== definition.term.toLowerCase())).map(d => utils.capitaliseFirst(d.definition));
    
    const question = definition.definition;
    const answers = utils.shuffleArray([question, ...alternatives]);
    const help = config.isLandscapeMode ? 'Select the correct answer' : '(Tap on the answer.)';

    return { question, answers, overrides : { question: definition.term, help, binomial: 'Definition', vernacularName: 'Dictionary' } };
};