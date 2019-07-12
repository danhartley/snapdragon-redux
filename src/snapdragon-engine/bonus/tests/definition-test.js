import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { getGlossary } from 'api/glossary/glossary';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';

export const getDefinitionTests = item => {

    const { config } = store.getState();

    const number = config.isPortraitMode ? 4 : 4;

    const definitions = utils.shuffleArray(getGlossary([ matchTaxon(item.taxonomy, iconicTaxa).value, 'common' ]));

    const definition = definitions[0];

    const alternatives = R.take(number-1, R.take(number, utils.shuffleArray(definitions)).filter(d => d.term.toLowerCase() !== definition.term.toLowerCase())).map(d => utils.capitaliseFirst(d.definition));
    
    const question = definition.definition;
    const answers = utils.shuffleArray([question, ...alternatives]);

    return [{ question, answers, overrides : { question: 'Select the definition.', help: '(Tap on a definition.)', binomial: '', vernacularName: definition.term } }];
};