const getTaxonomy = async (binomial) => {
    const url = `https://api.gbif.org/v1/species/match?name=${binomial}`;
    const result = await fetch(url);
    return await result.json();
};

export const gbif = {
    getTaxonomy
}