const binomialLookup = async (binomial) => {
    const request = `https://collectionCors-anywhere.herokuapp.com/https://www.itis.gov/ITISWebService/jsonservice/searchByScientificName?srchKey=${binomial}`;
    const result = await fetch(request);
    return await result.json();
};

export const itis = {
    binomialLookup
}