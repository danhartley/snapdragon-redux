import { itemProperties } from 'ui/helpers/data-checking';

export const getSpeciesEpithets = items => {
    
    const epithets = [];

    const addToArray = (obj) => {

        const parts = [];

        let latin = itemProperties.latin(itemProperties.genusName(obj.name));
        if(latin) { parts.push(latin) };

        latin = itemProperties.latin(itemProperties.speciesName(obj.name));
        if(latin) { parts.push(latin) };

        parts.forEach(part => { part.name = obj.name, part.index = obj.index });

        if(parts.length > 0) {
            epithets.push({ parts: parts, index: obj.index });
        }        
    }

    items.forEach( (item, index) => {        
        let i = Object.assign({}, { name: item.name, index: index } );
        addToArray(i)
    });

    return epithets;
};