import * as R from 'ramda';

import { getGlossary } from 'api/glossary/glossary';
import { epithets } from 'api/botanical-latin';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { taxa } from 'api/snapdragon/taxa';

export const rebindLayoutState = (layout, item) => {
      
    const random = utils.getRandomInt(4);

    let nextLayout, taxon;

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

        const definitions = utils.shuffleArray(getGlossary([ matchTaxon(item.taxonomy, iconicTaxa).value, 'common' ]));

        const definition = definitions[0];
    
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

        case 2:

        taxon = taxa.find(taxon => taxon.name === item.name);

        nextLayout = {
          name: "familyMatch",
          type: "test",
          score: 1,
          screens: [
            {
              name: "specimen-images",
              domain: "collection"
            },
            {
              name: "family",
              domain: "collection"
            }
          ]
      };

      break;

        case 3:

        taxon = taxa.find(taxon => taxon.name === item.name);

        nextLayout = {
          name: "family",
          type: "test",
          score: 1,
          screens: [
            {
              name: "specimen-images",
              domain: "collection"
            },
            {
              name: "family-strips",
              domain: "collection"
            }
          ]
      };

      break;
    }

    nextLayout = { ...R.clone(layout), ...nextLayout };

    actions.boundNextLayout(nextLayout);
};