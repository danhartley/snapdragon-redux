import { utils } from 'utils/utils'; 

const notItem = (item, collection) => {    
    return collection.filter(other => other.id !== item.id);
};

const addMultipleNames = (collection, number) => {    
    return collection.map(item => {
        const others = 
            notItem(item, collection)
                .filter((other, index) => index + 1 < number)
                .map(other => {
                    const {id, name, names} = other;
                    return {id, name, names};
                });
        const { id, name, names } = item;
        item.multipleNames = utils.randomiseSelection([ ...others, { id, name, names } ], number );
        return item;
    });
};

const addMultipleImages = (collection, items, number) => {    
    return items.map(item => {
        const others = 
            notItem(item, collection)
                .filter((other, index) => index + 1 < number)
                .map(other => {
                    const {name, images} = other;
                    return {name, images};
                });
        const { name, images } = item;
        item.multipleImages = utils.randomiseSelection([ ...others, { name, images } ], number );
        return item;
    });
};

const spliceArrays = (items, itemNames) => {
    const collection = [];
    items.map(item => {
        itemNames.map(itemName => {
            if(itemName === item.name) {
                collection.push(item);
            }
        });
    });
    return collection;
};

const filterExcluded = collection => {
    return collection.filter(item => !item.exclude);
};

// const extractScientificNames = collection => {
//     return collection.map(item => {
//         const names = item.name.split(' ');
//         item.genus = names[0];
//         item.species = names[1];
//         item.name = names.slice(0,2).join(' ');        
//         return item;
//     });
// };

export const helpers = {
    notItem,
    addMultipleNames,
    addMultipleImages,
    spliceArrays,
    filterExcluded,
    // extractScientificNames
};