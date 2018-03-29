import { store } from 'redux/store';

export const renderFamily = (gbifNode, binomial) => {
    const url = `https://api.gbif.org/v1/species/match?name=${binomial}`;
    fetch(url)
        .then(json => json.json())
        .then(taxonomy => {
            gbifNode.innerHTML = taxonomy.family;
        });
};