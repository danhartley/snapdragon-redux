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
  
    const speciesPool = utils.shuffleArray(taxonicMatches.filter(ci => ci.name.toLowerCase() !== item.name.toLowerCase()));
    
    if(!speciesPool) {
      getPoolItems(item);
    }

    // if not enough, only get the additional necessary number (but duplicates???)

    // else if(speciesPool.length < poolSize) {
    //   getPoolItems(item);
    // } 
    else {

      const items = R.take(5, speciesPool);

      console.log('items: ', items);
    
      items.push(item);
    
      return items;
    }
  };