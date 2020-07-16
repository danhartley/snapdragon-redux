import { itemProperties } from 'ui/helpers/data-checking';

export const getMatchingEpithets = async (epithets, species) => {
  
  let epithet = epithets.find(e => {        
      const match = e.latin.find(part => part.toUpperCase() === species.toUpperCase());
      return match || '';
  });
  return epithet ? { ...epithet } : '';
};

export const getSpeciesEpithets = async (epithets, items) => {
    
    const addToArray = async obj => {

        const parts = [];

        let latin = await getMatchingEpithets(epithets, itemProperties.getGenusName(obj.name));
        if(latin) { parts.push(latin) };

        latin = await getMatchingEpithets(epithets, itemProperties.getSpeciesName(obj.name));
        if(latin) { parts.push(latin) };

        parts.forEach(part => { part.name = obj.name, part.index = obj.index });

        if(parts.length > 0) {
            return { parts: parts, index: obj.index };
        } else {
          return undefined;
        }
    }

    let latinEpithets = await Promise.all(items.map( async (item, index) => { 
        let i = Object.assign({}, { name: item.name, index: index } );
        return await addToArray(i);
    }));

    latinEpithets = latinEpithets.filter(e => e);

    return await latinEpithets;
};