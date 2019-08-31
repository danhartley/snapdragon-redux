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
  
    if(speciesInSameTaxon) {
      speciesPool = speciesInSameTaxon;  
    }

    if(speciesPool.length < 5) {
      getPoolItems(collection);
    }

    const items = R.take(5, speciesPool);
    
    items.push(item);
  
    return items;
  };