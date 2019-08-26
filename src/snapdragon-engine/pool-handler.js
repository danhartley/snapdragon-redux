import * as R from 'ramda';

import { utils } from 'utils/utils';
import { findRankByIconicTaxon } from 'api/snapdragon/iconic-taxa';
import { firestore } from 'api/firebase/firestore';

export const getPoolItems = async collection => {

    const item = collection.items.find(i => i.name === collection.nextItem.name);
  
    const rank = findRankByIconicTaxon(item.taxonomy, item.iconicTaxon);
  
    let taxonicMatches = await firestore.getSpeciesByIconicTaxon(item);
  
    if(item.iconicTaxon.toLowerCase() === 'fungi') {
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
    // else {
    //   const kingdomItems = firestore.getSpeciesByRank('kingdom', item.taxonomy.kingdom);
    //   const speciesInSameKingdom = utils.shuffleArray(kingdomItems.filter(ci => ci.name !== item.name));
    //   if(speciesInSameKingdom) {
    //     speciesPool = speciesInSameKingdom;
    //   } else {
    //     const species = firestore.getAllSpecies();
    //     speciesPool = utils.shuffleArray(species.filter(ci => ci.name !== item));
    //   }
    // }
  
    const items = R.take(5, speciesPool);
    
    // Add the item being tested
    items.push(item);
  
    return items;
  };