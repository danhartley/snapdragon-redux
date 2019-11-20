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
    const binomial = `${taxa[0]} ${taxa [1] || ''}`;
    return binomial;
};

const getImagesLayout = (species, imageIds) => {
    let images = '';
    if(!species.images) {
        console.log('No images!');
    };
    species.images.forEach((image, index) => {
        let prefix = image.provider === 'inat' ? 'https://static.inaturalist.org/photos/' : 'https://content.eol.org/data/media/';
        let url = image.provider === 'inat' ? image.url : image.url.replace('.jpg', '.260x190.jpg');
            url = prefix + url;
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

const parseSpeciesData = async (item) => {

    const languages = [ 'en', 'pt', 'es', 'de', 'fr', 'it', 'eng' ];
    const response = await fetch(item.detailsUrl);
    const json = await response.json();
    const taxonConcept = json.taxonConcept;
    if(!json.taxonConcept) return;
    const taxon = taxonConcept.dataObjects ? taxonConcept : taxonConcept.taxonConcepts[0];
    const imagesCollection = taxon.dataObjects ? taxon.dataObjects.filter(item => item.mediaURL || item.eolMediaURL).map(media => {
        return {
            title: media.title, // as original title
            rightsHolder: media.rightsHolder || '',
            source: media.source,
            license: media.license,
            url: media.eolMediaURL,
            photographer: media.agents.find(agent => agent.role === 'photographer'),
            provider: media.provider || ''    
        }
    }) : [];
    const namesCollection = helpers.parseNames(taxon.vernacularNames, languages);
    return { id: item.id,  name: taxon.scientificName, images: imagesCollection, names: namesCollection };
};

export const helpers = {
    parseNames,
    flatten,
    getBinomial,
    getImagesLayout,
    loadInatCollection,
    parseSpeciesData
};