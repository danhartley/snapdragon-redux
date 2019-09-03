import * as R from 'ramda';

import { utils } from 'utils/utils';
import { findRankByIconicTaxon } from 'api/snapdragon/iconic-taxa';
import { firestore } from 'api/firebase/firestore';

export const getPoolItems = async (item, poolSize = 5) => {

    const rank = findRankByIconicTaxon(item.taxonomy, item.iconicTaxon);
  
    let taxonicMatches = await firestore.getSpeciesByIconicTaxon(item);
  
    if(item.iconicTaxon.toLowerCase() === 'fungi') {
        const isLichen = item.lichen;
        taxonicMatches = isLichen ? taxonicMatches.filter(item => item.lichen) : taxonicMatches.filter(item => !item.lichen);
    }
  
    const speciesInSameTaxon = utils.shuffleArray(taxonicMatches.filter(ci => ci.name.toLowerCase() !== item.name.toLowerCase()));
    
    let speciesPool;
  
    if(speciesInSameTaxon) {
      speciesPool = speciesInSameTaxon;  
    }

    console.log('speciesPool:', speciesPool)

    if(!speciesPool) {
      getPoolItems(item);
    }
    // else if(speciesPool.length < poolSize) {
    //   getPoolItems(item);
    // } 
    else {

      const items = R.take(5, speciesPool);
    
      items.push(item);
    
      return items;
    }
  };