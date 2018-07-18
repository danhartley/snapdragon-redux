const getTaxa = (items, taxon) => {
    const taxa = items.filter(item => item[taxon]);
    return taxa;
};

export const getFamilies = items => {
    const families = getTaxa(items, 'family').map(item => item.family);
    return new Set(families);
};