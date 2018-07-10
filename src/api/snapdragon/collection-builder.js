console.log('Collection builder says hello');


const encodeQuery = q => { 
    if(q === undefined) return q;
    if(Number.isInteger(q)) return q;
    return encodeURIComponent(q.trim()) 
};

const collectionId = 139051;
const collectionUrl = `http://eol.org/api/collections/1.0/${collectionId}.json?page=1&per_page=50&filter=&sort_by=recently_added&sort_field=&cache_ttl=&language=en`;

const speciesUrl = id => {
    return `http://eol.org/api/pages/1.0.json?
    batch=false&id=${encodeQuery(id)}&images_per_page=100&images_page=1
    &videos_per_page=0&videos_page=0&sounds_per_page=0&sounds_page=0&maps_per_page=0
    &maps_page=0&texts_per_page=1&texts_page=1&subjects=overview&licenses=all
    &details=true&common_names=true&synonyms=false&references=false&taxonomy=false&vetted=0&cache_ttl=&language=en`;
};

const getSpecies = (collection) => {
    let eolCollection = collection.collection_items.map(item => ({ id: item.object_id, name: item.name }));
    return eolCollection.map(species => {
        species.detailsUrl = speciesUrl(species.id);
        return species;
    });
};

async function getCollection() {
    const response = await fetch(collectionUrl);
    const json = await response.json();
    return await getSpecies(json);
}

async function getSpeciesData(item) {
    const languages = [ 'en', 'pt' ];
    const response = await fetch(item.detailsUrl);
    const json = await response.json();
    const imagesCollection = json.dataObjects.filter(item => item.mediaURL || item.eolMediaURL).map(media => media.eolMediaURL);
    const namesCollection = json.vernacularNames.filter(item => R.contains(item.language, languages));
    return { id: item.id,  name: item.name, images: imagesCollection, names: namesCollection };
}

const items = [];

async function getTaxonomy(binomial) {
    const url = `https://api.gbif.org/v1/species/match?name=${binomial}`;
    const result = await fetch(url);
    return await result.json();
}

const getBinomial = item => {
    const taxa = item.name.split(' ');
    const binomial = `${taxa[0]} ${taxa [1]}`;
    return binomial;
};

getCollection().then(collection => {
    collection.forEach(item => {
        getSpeciesData(item).then(data => {
            const binomial = getBinomial(item);
            getTaxonomy(binomial).then(taxonomy => {
                data.taxonomy = taxonomy;
                data.family = taxonomy.family;
                item.eolName = item.name; 
                item.name = binomial;
                items.push(data);
                console.log(data);
                selector(items);
            });
        });
    })
});

const selector = items => {
    let options = '<option value="0">Select species</option>';
    items.forEach(item => {
        options = options + `<option value="${item.id}">${item.name}</option>`;
    });
    document.querySelector('#names').innerHTML = options;
}

imageIds = [];

let currentItemId;

const getImages = obj => {
    imageIds = [];
    let images = '';
    currentItemId = parseInt(obj.value);
    const species = items.find(item => item.id === currentItemId);
    species.images.forEach((image, index) => {
        images = images + `<div><img id="${index}" width="300px" height="300px" style="cursor:pointer; object-fit: cover;" src="${image}"/></div>`
    });
    document.querySelector('#images').innerHTML = images;  
    document.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', event => {
            const imageId = parseInt(event.target.id);
            const index = imageIds.indexOf(imageId);
            if (index > -1) {
                imageIds.splice(index, 1);
            } else {
                imageIds.push(imageId);
            }
        });
    });
};

const newCollection = [];

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#btnAdd').addEventListener('click', event => {
        const item = items.find(i => i.id === currentItemId);
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
        console.log(newCollection);
    });
});