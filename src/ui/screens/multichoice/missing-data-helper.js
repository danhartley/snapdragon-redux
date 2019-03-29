import * as R from 'ramda';

import { getGlossary } from 'api/glossary/glossary';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';

export const rebindLayoutState = (layout, config, item) => {
      
    const definitions = utils.shuffleArray(getGlossary([ matchTaxon(item.taxonomy, iconicTaxa), 'common' ]));

    const definition = definitions[0];

    let _layout = {
        name: "screen-definitions",
        type: "test",
        score: 1,
        screens: [
          {
            "name": "specimen-images",
            "domain": "collection"
          },
          {
            "name": "definition",
            "domain": "collection"
          }
        ]
    };

    _layout.definition = definition;

    _layout = { ...R.clone(layout), ..._layout };

    actions.boundNextLayout(_layout);
    // Use different test… e.g. epithet, definition, etc. and unlimite`d…
};