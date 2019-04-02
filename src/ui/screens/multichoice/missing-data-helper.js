import * as R from 'ramda';

import { getGlossary } from 'api/glossary/glossary';
import { epithets } from 'api/botanical-latin';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';

export const rebindLayoutState = (layout, item) => {
      
    const random = utils.getRandomInt(2);

    let definition, nextLayout, epithet;

    switch(random) {
      
      case 0:

      const epithet = utils.shuffleArray(epithets)[0];

      nextLayout = {
        name: "screen-epithets",
        type: "test",
        score: 1,
        screens: [
          {
            "name": "specimen-images",
            "domain": "collection"
          },
          {
            "name": "epithet",
            "domain": "collection"
          }
        ]
      };

      nextLayout.epithet = epithet;

      break;

      case 1: 

        const definitions = utils.shuffleArray(getGlossary([ matchTaxon(item.taxonomy, iconicTaxa), 'common' ]));

        definition = definitions[0];
    
        nextLayout = {
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

        nextLayout.definition = definition;

        break;
    }

    nextLayout = { ...R.clone(layout), ...nextLayout };

    actions.boundNextLayout(nextLayout);
};