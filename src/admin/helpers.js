import * as R from 'ramda';

import { utils } from 'utils/utils';

const parseNames = (names, languages) => {
    
    if(!names) return [];
    
    let parsedNames = names.filter(item => R.contains(item.language, languages));
    parsedNames = parsedNames.map(name => {
        return {
            language: name.language,
            vernacularName: name.vernacularName.toLowerCase()     
        }
    });

    const uniqueParsedNames = [ ...new Set(parsedNames.map(name => name.vernacularName)) ]; // distinct names

    const uniqueNames = uniqueParsedNames.map(name => {
        const obj = {
            vernacularName: name,
            language: parsedNames.find(n => {
                return n.vernacularName === name;
            }).language
        };
        return obj;
    });

    uniqueNames.forEach(name => {
        name.vernacularName = utils.capitaliseFirst(name.vernacularName);
    });

    return uniqueNames;
};

const flatten = array => {
    const flattenedArray = array.reduce(
      function(accumulator, currentValue) {
        return accumulator.concat(currentValue);
      },
      []
    );
    return flattenedArray;
};

const getBinomial = item => {
    if(!item.name) return;
    if(!item.name.length > 0) return;
    const taxa = item.name.split(' ');
    const binomial = `${taxa[0]} ${taxa [1]}`;
    return binomial;
};

const getImagesLayout = (species, prefix) => {
    let imageIds = [];
    let images = '';
    if(!species.images) {
        console.log('No images!');
    };
    species.images.forEach((image, index) => {
        const url = prefix + image.url.replace('.jpg', '.260x190.jpg');
        images = images + `<div><img id="${index}" width="260px" height="190px" style="cursor:pointer; object-fit: cover;" src="${url}"/></div>`;
    });
    document.querySelector('#images').innerHTML = images;  
    document.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', event => {
            const image = event.target;
            const imageId = parseInt(event.target.id);
            const index = imageIds.indexOf(imageId);
            if (index > -1) {
                image.style.filter = 'saturate(100%)';
                image.style.opacity = 1;
                imageIds.splice(index, 1);
            } else {
                image.style.filter = 'saturate(10%)';
                image.style.opacity = .3;
                imageIds.push(imageId);
            }
        });
    });

    return imageIds;
};

const getSpeciesSelector = items => {

    let options = '<option value="0">Select species</option>';
    items.forEach(item => {
        options = options + `<option value="${item.id}">${item.name}</option>`;
    });
    document.querySelector('#names').innerHTML = options;

    const speciesOptions = document.querySelector('#names');

    speciesOptions.addEventListener('change', event => {
        const item = items.find(item => parseInt(item.id) === event.target.value);
        const images = getImagesLayout(item);
        imageIds = images.imageIds;
        currentItemId = images.currentItemId;
        document.querySelectorAll('.btnAddSpecies').forEach(btn => {
            btn.classList.remove('hide');
        });
    });

    const species = document.querySelector('#names');
    const instances = M.FormSelect.init(species);
};

const loadInatCollection = (inat, itis, eol, parseSpeciesData, gbif, inatItems) => {
    inat.getInatObservations().then(observations => {
        observations.filter(i => i.taxon).forEach(observation => {
            inat.getInatImages(observation).then(photos => {
                let images = [];
                if(photos.results) {
                    images = flatten(photos.results.map(result => result.photos));
                }
                const item = {
                    id: observation.taxon.id,
                    name: observation.taxon.name,
                    images,
                    names: {
                        vernacularName: observation.taxon.preferred_common_name,
                        language: 'en'
                    }
                };
                itis.binomialLookup(item.name).then(response => {
                    if(response.scientificNames[0] === null) {
                        console.log(item.name);
                        return;
                    }
                    const itisId = response.scientificNames[0].tsn;
                    eol.searchEOLByProvider(903, itisId).then(response => {
                        if(response.length === 0) {
                            console.log('response: ', response);
                            return;
                        }
                        const eolId = response[0].eol_page_id;
                        parseSpeciesData({ detailsUrl : speciesUrl(eolId) }).then(data => {
                            const binomial = getBinomial(item);
                            gbif.getTaxonomy(binomial).then(taxonomy => {
                                data.taxonomy = {
                                    kingdom: taxonomy.kingdom,
                                    phylum: taxonomy.phylum,
                                    class: taxonomy.class,
                                    order: taxonomy.order,
                                    genus: taxonomy.genus,
                                    family: taxonomy.family
                                };
                                data.eolName = item.name; 
                                data.name = binomial;
                                data.images = [ ...data.images, ...item.images ];
                                inatItems.push(data);
                            });                                
                        });                            
                    });                            
                });                    
            });                
        });
    });
};

export const helpers = {
    parseNames,
    flatten,
    getBinomial,
    getImagesLayout,
    getSpeciesSelector,
    loadInatCollection
};