console.log('Collection builder says hello');


const encodeQuery = q => { 
    if(q === undefined) return q;
    if(Number.isInteger(q)) return q;
    return encodeURIComponent(q.trim()) 
};

const all = 'all';
const unrestrictedLicences = 'pd|cc-by|cc-by-sa|cc-by-nd|cc-by-nc';
const restrictedLicences = 'pd|cc-by|cc-by-sa|cc-by-nd';

const speciesUrl = id => {
    return `http://eol.org/api/pages/1.0.json?
    batch=true&id=${encodeQuery(id)}&images_per_page=75&images_page=1
    &videos_per_page=0&videos_page=0&sounds_per_page=0&sounds_page=0&maps_per_page=0
    &maps_page=0&texts_per_page=1&texts_page=1&subjects=all&licenses=${restrictedLicences}
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
    const collectionId =  parseInt(document.querySelector('#inputCollection').value);
    const collectionUrl = `http://eol.org/api/collections/1.0/${collectionId}.json?page=1&per_page=100&filter=&sort_by=recently_added&sort_field=&cache_ttl=&language=en`;
    const response = await fetch(collectionUrl);
    const json = await response.json();
    return await getSpecies(json);
}

async function getSpeciesData(item) {
    const languages = [ 'en', 'pt', 'es', 'de', 'fr', 'it' ];
    const response = await fetch(item.detailsUrl);
    const json = await response.json();
    const imagesCollection = json.dataObjects.filter(item => item.mediaURL || item.eolMediaURL).map(media => media.eolMediaURL);
    const namesCollection = json.vernacularNames.filter(item => R.contains(item.language, languages));
    const descriptions = [];
    const objs = json.dataObjects.filter(obj => {
        return (obj.mimeType === 'text/plain' || obj.mimeType === 'text/html') && obj.vettedStatus === "Trusted" }
    );
    objs.length > 0 ? objs.forEach(obj => {descriptions.push(obj.description)}) : [];
    return { id: item.id,  name: item.name, images: imagesCollection, names: namesCollection, descriptions: descriptions };
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

const init = () => {
    getCollection().then(collection => {
        collection.forEach(item => {
            getSpeciesData(item).then(data => {
                const binomial = getBinomial(item);
                getTaxonomy(item.name).then(taxonomy => {
                    data.taxonomy = taxonomy;
                    data.family = taxonomy.family;
                    data.eolName = item.name; 
                    data.name = binomial;
                    items.push(data);
                    console.log(data);
                    selector(items);
                });
            });
        })
    });
};

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

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#btnGet').addEventListener('click', event => {
        init();
    });
    document.querySelectorAll('.btnAdd').forEach(btn => {
            btn.addEventListener('click', event => {
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
            document.querySelectorAll('.collectionCount').forEach(counter => counter.innerHTML = newCollection.length);
            console.log(newCollection);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
// const test = "Sweet Basil (<i>Ocimum basilicum</i>) is unusual among the many culinary herbs in the mint family (Lamiaceae=Labiateae) in that it is thought to have its origins in India. This plant has been cultivated in India and the Middle East since ancient times and was known to the Greeks and Romans. In addition to its very familiar uses such as in tomato-based sauces and salads, it is an ingredient in the liqueur chartreuse. \r\n\r\nSweet Basil is an erect annual, up to 35 cm in height, with ovate, toothed or entire, leaves which are up to 8 cm in length. The flowers are white or purple-tinged, around 1 cm long, and borne in simple terminal <a href=\"http://en.wikipedia.org/wiki/Raceme\">racemes</a>. Some varieties have partly red or entirely purple leaves.\r\n\r\n(Vaughan and Geissler 1997)\r\n\r\nA great diversity of Sweet Basil varieties have been developed (see <a href=\"http://www.hort.purdue.edu/newcrop/proceedings1999/v4-499.html\">Simon et al.1999</a>). Several aroma compounds can be found in different <a href=\"http://en.wikipedia.org/wiki/Chemotype\">chemotypes </a>of basil, including <a href=\"http://en.wikipedia.org/wiki/Citral\">citral</a>, <a href=\"http://en.wikipedia.org/wiki/Eugenol\">eugenol</a>, <a href= http://en.wikipedia.org/wiki/Linalool\">linalool</a>, <a href=\"http://en.wikipedia.org/wiki/Methylchavicol\">methylchavicol</a>, and <a href=\"http://en.wikipedia.org/wiki/Methyl_cinnamate\">methyl cinnamate</a> and are traded in the international essential oil market. These chemotypes are commonly known by names based on geographical origins such as Egyptian, French, European, or Reunion basil. The European type, a sweet basil, contains linalool and methylchavicol as the major constituents. The Egyptian basil is very similar to the European, but contains a higher percentage of methylchavicol. The Reunion type, from the Comoro Islands, and more recently from Madagascar, Thailand, and Vietnam, is characterized by high concentrations of methylchavicol. Methyl cinnamate-rich basil has been commercially produced in Bulgaria, India, Guatemala, and Pakistan. A basil from Java, Russia, and North Africa is rich in eugenol.\r\n\r\n<a href=\"http://www.hort.purdue.edu/newcrop/proceedings1999/v4-499.html\">Simon et al. (1999)</a> note that the diversity in basil based on appearance; flavors; fragrances; industrial, edible, and drying oils; and natural pigments provides great opportunities for developing new culinary, ornamental, and industrial crops. They also suggest that the high variation among basil cultivars in susceptibility to damage by <a href=\"http://eol.org/pages/2866900/overview\">Japanese beetles</a> suggests the presence of active ingredients that either could be useful in commercial traps or serve as a deterrent.\r\n\r\n<a href=\"http://www.hort.purdue.edu/newcrop/proceedings1999/v4-499.html\">Simon et al. (1999)</a>\r\n\r\n<a href=\"http://www.uvm.edu/vtvegandberry/Crops/basil.html\">University of Vermont Extension</a> provides links to a number of useful sources on Basil production.\r\n\r\n\r\n";
// const test = "<br>Please see details, credits, terms of use and the latest version of the map at <a href='http://www.discoverlife.org/20/m?kind=Origanum+majorana&b=EOL/pages/579365'>Discover Life</a>.<br>Explore <a href='http://www.discoverlife.org/mp/20q?search=Origanum+majorana&b=EOL/pages/579365'><i>Origanum majorana</i></a> in Discover Life.";
const test = "";
document.querySelector('#test').innerHTML = test;
});