const getTaxa = (items, taxon) => {
    const taxa = items.filter(item => item[taxon]) || [];
    return taxa;
};

const getFamilyNames = items => {
    const families = getTaxa(items, 'family').map(item => item.family);
    return families;
};

const getUniqueFamilies = items => {
    const families = getTaxa(items, 'family').map(item => item.family);
    return [ ...new Set(families) ];
};

const getUniqueFamiliesByIconicTaxon = (items, iconicTaxonRank, iconicTaxonValue) => {
    const matchingItems = items.map(item => {
        if(item.taxonomy && item.taxonomy[iconicTaxonRank] && item.taxonomy[iconicTaxonRank].toLowerCase() === iconicTaxonValue.toLowerCase()) {
            return item;
        }
    }).filter(item => item);
    const families = getTaxa(matchingItems, 'family').map(item => item.family);
    return [ ...new Set(families) ];
};

const reducer = function(obj,elem){
    obj[elem]=obj[elem] || 0;
    obj[elem]++;
    return obj;
};

const getFamilyStats = items => {
    return getFamilyNames(items).reduce(reducer,{});
}

export const familyProps = {
    getFamilyNames,
    getUniqueFamilies,
    getFamilyStats,
    getUniqueFamiliesByIconicTaxon
}