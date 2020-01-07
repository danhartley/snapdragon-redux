import * as R from 'ramda';

import { utils } from 'utils/utils';
import { findRankByIconicTaxon } from 'api/snapdragon/iconic-taxa';
import { firestore } from 'api/firebase/firestore';

export const getPoolItems = async (collection, poolSize = 5) => {
  
  const item = collection.nextItem;

  if(collection.behaviour === 'static') {
    const otherItems = collection.items.filter(i => i.name !== item.name);
    if(otherItems) {
      return getItemsFromCollection(otherItems, item, poolSize);
    }
  }

  const rank = findRankByIconicTaxon(item.taxonomy, item.iconicTaxon);

  let taxonicMatches = await firestore.getSpeciesByIconicTaxon(item);

  if(item.iconicTaxon.toLowerCase() === 'fungi') {
      const isLichen = item.lichen;
      taxonicMatches = isLichen ? taxonicMatches.filter(item => item.lichen) : taxonicMatches.filter(item => !item.lichen);
  }

  const speciesPool = utils.shuffleArray(taxonicMatches.filter(ci => ci.name.toLowerCase() !== item.name.toLowerCase()));
  
  if(!speciesPool) {
    getPoolItems(collection);
  }

  // if not enough, only get the additional necessary number (but duplicates???)

  else if(speciesPool.length < poolSize) {
    getPoolItems(collection);
  } 
  else {

    const items = R.take(poolSize, speciesPool);

    console.log('pool items from getPoolItems: ', items);
    console.log('\x1b[32m', '------------------------------------------');
  
    items.push(item);
  
    return await items;
  }
};

  const getItemsFromCollection = (otherItems, item, poolSize) => {
    const items = R.take(poolSize, utils.shuffleArray(otherItems));
    return utils.shuffleArray([ ...items, item]);
  };