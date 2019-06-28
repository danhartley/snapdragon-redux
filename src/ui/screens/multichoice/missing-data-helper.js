import * as R from 'ramda';

import { getGlossary } from 'api/glossary/glossary';
import { epithets } from 'api/botanical-latin';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { taxa } from 'api/snapdragon/taxa';
import { firestore } from 'api/firebase/firestore';

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

export const getPoolItems = collection => {

  const item = collection.items.find(i => i.name === collection.nextItem.name);

  const rank = matchTaxon(item.taxonomy, iconicTaxa).value;

  let taxonicMatches = firestore.getSpeciesByTaxonKey(item.taxonomy);

  if(rank === 'fungi') {
      const isLichen = item.lichen;
      taxonicMatches = isLichen ? taxonicMatches.filter(item => item.lichen) : taxonicMatches.filter(item => !item.lichen);
  }

  const speciesInSameTaxon = utils.shuffleArray(taxonicMatches.filter(ci => ci.name !== item.name));
  
  let speciesPool;

  // To do: Handle case where e.g. taxon group has only 2 items (should top up with kingdom items).
  // Can be solved by simply adding more data…

  if(speciesInSameTaxon) {
    speciesPool = speciesInSameTaxon;  
  }
  else {
    const kingdomItems = firestore.getSpeciesByRank('kingdom', item.taxonomy.kingdom);
    const speciesInSameKingdom = utils.shuffleArray(kingdomItems.filter(ci => ci.name !== item.name));
    if(speciesInSameKingdom) {
      speciesPool = speciesInSameKingdom;
    } else {
      const species = firestore.getSpecies();
      speciesPool = utils.shuffleArray(species.filter(ci => ci.name !== item));
    }
  }

  const items = R.take(5, speciesPool);
  
  // Add the item being tested
  items.push(item);

  return items;
};