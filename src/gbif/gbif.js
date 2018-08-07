import { store } from 'redux/store';

export const renderFamily = (gbifNode, binomial) => {
    const url = `https://api.gbif.org/v1/species/match?name=${binomial}`;
    fetch(url)
        .then(json => json.json())
        .then(taxonomy => {
            gbifNode.innerHTML = taxonomy.family;
        });
};

export const speciesCount = (gbifNode) => {
    const url = `https://api.gbif.org/v1/species/search?advanced=true&dataset_key=7ddf754f-d193-4cc9-b351-99906754a03b&facet=rank&facet=dataset_key&facet=constituent_key&facet=highertaxon_key&facet=name_type&facet=status&facet=issue&facet=origin&facetMultiselect=true&issue.facetLimit=100&locale=en&name_type.facetLimit=100&rank=SPECIES&rank.facetLimit=100&status=ACCEPTED&status.facetLimit=100`;
    fetch(url)
        .then(json => json.json())
        .then(species => {
            gbifNode.innerHTML = `<span>${ species.count.toLocaleString() }</span> species have been formally described.`;
        });
};