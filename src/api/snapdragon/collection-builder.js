console.log('Collection builder says hello');

const encodeQuery = q => { 
    if(q === undefined) return q;
    if(Number.isInteger(q)) return q;
    return encodeURIComponent(q.trim()) 
};

// https://creativecommons.org/licenses/
// CC BY:       Attribution                 (commerical allowed)
// CC BY-SA:    Attribution-ShareAlike      (commerical allowed)
// CC BY-ND:    Attribution-NoDerivs        (commerical allowed)
// CC BY-NC:    Attribution-NonCommercial   (commerical NOT allowed)

const all = 'all';
const someMayExcludeCommercialUse = 'pd|cc-by|cc-by-sa|cc-by-nd|cc-by-nc';
const noneExcludedFromCommercialUse = 'pd|cc-by|cc-by-sa|cc-by-nd';
const licenses = [
    { key: 'no restriction - including not for commercial use', value: someMayExcludeCommercialUse },
    { key: 'snapdragon default - excluding not for commercial use', value: noneExcludedFromCommercialUse }
];

let selectedLicence = licenses[1].key;

const getSpecies = (collection) => {
    
    let eolCollection = collection.collection_items.map(item => ({ id: item.object_id }));
        
    return eolCollection.map(species => {
        const speciesUrl = `https://eol.org/api/pages/1.0/${species.id}.json?details=true&images_per_page=100&licenses=${selectedLicence}&common_names=true`;
        const speciesCors = `https://cors-anywhere.herokuapp.com/${speciesUrl} q:A`;
        species.detailsUrl = speciesCors;
        return species;
    });
};

function getCollectionFromSpeciesList(speciesList) {
    const ids = speciesList.split(',');
    const collection = {};
    collection.collection_items = ids.map(id => {
        return { object_id: id.trim() };
    });
    return new Promise(resolve => {
        resolve(collection);
    });
}

async function getCollection() {

    const speciesList = document.getElementById('inputSpecies').value;

    let collection = {};

    if(speciesList !== '') {
        collection = await getCollectionFromSpeciesList(speciesList);
    } else {
        const collectionId =  parseInt(document.querySelector('#inputCollection').value);
        const collectionUrl = `http://eol.org/api/collections/1.0/${collectionId}.json?page=1&per_page=100&filter=&sort_by=recently_added&sort_field=&cache_ttl=&language=en`;
        const collectionCors = `https://cors-anywhere.herokuapp.com/${collectionUrl} q:A`;
        const response = await fetch(collectionCors);
        collection = await response.json();
    }

    return await getSpecies(collection);
}

// https://wiki.creativecommons.org/wiki/Best_practices_for_attribution#This_is_an_ideal_attribution

async function getSpeciesData(item) {
    const languages = [ 'en', 'pt', 'es', 'de', 'fr', 'it', 'eng' ];
    const response = await fetch(item.detailsUrl);
    const json = await response.json();
    const imagesCollection = json.dataObjects ? json.dataObjects.filter(item => item.mediaURL || item.eolMediaURL).map(media => {
        return {
            title: media.title, // as original title
            rightsHolder: media.rightsHolder,
            source: media.source,
            license: media.license,
            url: media.eolMediaURL,
            photographer: media.agents.find(agent => agent.role === 'photographer')            
        }
    }) : [];
    const namesCollection = json.vernacularNames ? json.vernacularNames.filter(item => R.contains(item.language, languages)) : [];
    // const descriptions = [];
    // const objs = json.dataObjects.filter(obj => {
    //     return (obj.mimeType === 'text/plain' || obj.mimeType === 'text/html') && obj.vettedStatus === "Trusted" }
    // );
    // objs.length > 0 ? objs.forEach(obj => {descriptions.push(obj.description)}) : [];
    // return { id: item.id,  name: item.name, images: imagesCollection, names: namesCollection, descriptions: descriptions };
    return { id: item.id,  name: json.scientificName, images: imagesCollection, names: namesCollection };
}

const items = [];

async function getTaxonomy(binomial) {
    const url = `https://api.gbif.org/v1/species/match?name=${binomial}`;
    const result = await fetch(url);
    return await result.json();
}

const getBinomial = item => {
    if(!item.name) return;
    if(!item.name.length > 0) return;
    const taxa = item.name.split(' ');
    const binomial = `${taxa[0]} ${taxa [1]}`;
    return binomial;
};

const init = () => {
    getCollection().then(collection => {
        collection.forEach(item => {
            getSpeciesData(item).then(data => {
                item.name = data.name;
                const binomial = getBinomial(item);
                getTaxonomy(item.name).then(taxonomy => {
                    data.taxonomy = taxonomy;
                    data.family = taxonomy.family;
                    data.eolName = item.name; 
                    data.name = binomial;
                    items.push(data);
                    itemSelector(items);
                });
            });
        })
    });
};

const itemSelector = items => {
    let options = '<option value="0">Select species</option>';
    items.forEach(item => {
        options = options + `<option value="${item.id}">${item.name}</option>`;
    });
    document.querySelector('#names').innerHTML = options;
    document.querySelector('#speciesCount').innerHTML = items.length;
}

const licenceSelector = licenses => {
    let options = '<option value="0">Select media licence rule</option>';
    licenses.forEach(licence => {
        options = options + `<option value="${licence.value}">${licence.key}</option>`;
    });
    document.querySelector('#licences').innerHTML = options;
}

imageIds = [];

let currentItemId;

const setLicence = obj => {
    selectedLicence = obj.value;
}

const getImages = obj => {
    imageIds = [];
    let images = '';
    currentItemId = parseInt(obj.value);
    const species = items.find(item => parseInt(item.id) === currentItemId);
    if(!species.images) {
        console.log('No images!');
    };
    species.images.forEach((image, index) => {
        images = images + `<div><img id="${index}" width="300px" height="300px" style="cursor:pointer; object-fit: cover;" src="${image.url}"/></div>`
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

const newCollection = [];

const jumpto = anchor => {
    window.location.href = "#" + anchor;
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#btnGet').addEventListener('click', event => {
        init();
    });
    document.querySelectorAll('.btnAdd').forEach(btn => {
            btn.addEventListener('click', event => {
            const item = items.find(i => parseInt(i.id) === currentItemId);
            const images = [];
            item.images.forEach((image,index) => {
                imageIds.forEach(id => {
                    if(index === id) {
                        images.push(image);
                    }
                });
            });
            item.images = images;
            newCollection.push(item);
            document.querySelectorAll('.collectionCount').forEach(counter => counter.innerHTML = newCollection.length);
            console.log(newCollection);
        });
    });
    licenceSelector(licenses);
    document.querySelector('#inputCollection').focus();    
    document.getElementById('licences').value = noneExcludedFromCommercialUse;
});

const getInatSpecies = (collection) => {
    let observations = collection.results;
    return observations;
};


async function getInatObservations() {
    const userId =  document.querySelector('#inputUserId').value;
    const collectionUrl = `https://api.inaturalist.org/v1/observations?user_id=${userId}&order=desc&order_by=created_at`;
    const response = await fetch(collectionUrl);
    const json = await response.json();
    return await getInatSpecies(json);
}

const parseInatImages = images => {
    return images;
};

async function getInatImages(observation) {
    const taxon = observation.taxon;
    if(!taxon) return [];
    const taxonId = taxon.id;
    const url = `https://api.inaturalist.org/v1/observations?id_please=true&photos=true&license=cc-by-nc&photo_license=cc-by-nc&taxon_id=${taxonId}&order=desc&order_by=created_at`;
    const response = await fetch(url);
    const json = await response.json();
    return await parseInatImages(json);
}

const inatItems = []

const flatten = array => {
    const flattenedArray = array.reduce(
      function(accumulator, currentValue) {
        return accumulator.concat(currentValue);
      },
      []
    );
    return flattenedArray;
}

async function binomialLookup(binomial) {
    const request = `https://collectionCors-anywhere.herokuapp.com/https://www.itis.gov/ITISWebService/jsonservice/searchByScientificName?srchKey=${binomial}`;
    const result = await fetch(request);
    return await result.json();
}

async function searchEOLByProvider(hierarchyId, Id) {
    const url = `http://eol.org/api/search_by_provider/1.0.json?batch=false&id=${Id}&hierarchy_id=${hierarchyId}&cache_ttl=`;
    const result = await fetch(url);
    return await result.json();
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#btnGetInatData').addEventListener('click', event => {
        getInatObservations().then(observations => {
            observations.filter(i => i.taxon).forEach(observation => {
                getInatImages(observation).then(photos => {
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
                    binomialLookup(item.name).then(response => {
                        if(response.scientificNames[0] === null) {
                            console.log(item.name);
                            return;
                        }
                        const itisId = response.scientificNames[0].tsn;
                        searchEOLByProvider(903, itisId).then(response => {
                            if(response.length === 0) {
                                console.log('response: ', response);
                                return;
                            }
                            const eolId = response[0].eol_page_id;
                            getSpeciesData({ detailsUrl : speciesUrl(eolId) }).then(data => {
                                const binomial = getBinomial(item);
                                getTaxonomy(item.name).then(taxonomy => {
                                    // data.taxonomy = taxonomy;
                                    data.family = taxonomy.family;
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
        })            
    });
});