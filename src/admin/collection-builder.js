import "babel-polyfill";
import { firestore } from 'api/firebase/firestore';

// import 'ui/css/snapdragon.css';

import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { helpers } from 'admin/helpers';

import { eol } from 'admin/api/eol';
import { inat } from 'admin/api/inat';
import { itis } from 'admin/api/itis';
import { gbif } from 'admin/api/gbif';

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

let selectedLicence = licenses[1].value;

// https://wiki.creativecommons.org/wiki/Best_practices_for_attribution#This_is_an_ideal_attribution

const getSpeciesData = async (item) => {

    const languages = [ 'en', 'pt', 'es', 'de', 'fr', 'it', 'eng' ];
    const response = await fetch(item.detailsUrl);
    const json = await response.json();
    const taxonConcept = json.taxonConcept;
    if(!json.taxonConcept) return;
    const taxon = taxonConcept.dataObjects ? taxonConcept : taxonConcept[1];
    const imagesCollection = taxon.dataObjects.filter(item => item.mediaURL || item.eolMediaURL).map(media => {
        return {
            title: media.title, // as original title
            rightsHolder: media.rightsHolder || '',
            source: media.source,
            license: media.license,
            url: media.eolMediaURL,
            photographer: media.agents.find(agent => agent.role === 'photographer')            
        }
    });
    const namesCollection = helpers.parseNames(taxon.vernacularNames, languages);
    return { id: item.id,  name: taxon.scientificName, images: imagesCollection, names: namesCollection };
};

const items = [];

const init = () => {
    eol.getCollection(selectedLicence).then(collection => {
        collection.forEach(item => {            
            getSpeciesData(item).then(data => {
                if(!data) return;
                item.name = data.name;
                const binomial = helpers.getBinomial(item);
                gbif.getTaxonomy(binomial).then(taxonomy => {
                    data.taxonomy = {
                        kingdom: taxonomy.kingdom,
                        phylum: taxonomy.phylum,
                        class: taxonomy.class,
                        order: taxonomy.order,
                        genus: taxonomy.genus,
                        family: taxonomy.family
                    };
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

    const speciesOptions = document.querySelector('#names');

    speciesOptions.addEventListener('change', event => {
        const images = helpers.getImages(items, event.target);
        imageIds = images.imageIds;
        currentItemId = images.currentItemId;
    });
}

const licenceSelector = licenses => {
    let options = '<option value="0">Select media licence rule</option>';
    licenses.forEach(licence => {
        options = options + `<option value="${licence.value}">${licence.key}</option>`;
    });
    document.querySelector('#licences').innerHTML = options;
}

let imageIds = [];

let currentItemId;

// client call - do not delete

const setLicence = obj => {
    selectedLicence = obj.value;
};

const newCollection = [];

// client call - do not delete

const jumpto = anchor => {
    window.location.href = "#" + anchor;
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#btnGet').addEventListener('click', event => {
        init();
    });
    document.querySelectorAll('.btnAdd').forEach(btn => {
        btn.addEventListener('click', event => {

            const currentItem = items.find(i => parseInt(i.id) === currentItemId);
            const item = {
                eolId: currentItem.id,
                eolName: currentItem.name,
                name: helpers.getBinomial(currentItem),
                images: currentItem.images,
                names: currentItem.names,
                taxonomy: currentItem.taxonomy                
            };
            item.iconicTaxon = matchTaxon(item.taxonomy, iconicTaxa).value;
            const images = [];
            item.images.forEach((image,index) => {
                imageIds.forEach(id => {
                    if(index === id) {
                        images.push(image);
                    }
                });
            });
            images.forEach(image => image.url = image.url.replace('https://content.eol.org/data/media/', ''));
            item.images = images;

            document.querySelectorAll('.collectionCount').forEach(counter => counter.innerHTML = newCollection.length);

            firestore.addSpecies(JSON.stringify(item));
        });
    });
    licenceSelector(licenses);
    document.querySelector('#inputCollection').focus();    
    document.getElementById('licences').value = noneExcludedFromCommercialUse;
});

const inatItems = [];

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#btnGetInatData').addEventListener('click', event => {
        inat.getInatObservations().then(observations => {
            observations.filter(i => i.taxon).forEach(observation => {
                inat.getInatImages(observation).then(photos => {
                    let images = [];
                    if(photos.results) {
                        images = helpers.flatten(photos.results.map(result => result.photos));
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
                            getSpeciesData({ detailsUrl : speciesUrl(eolId) }).then(data => {
                                const binomial = helpers.getBinomial(item);
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
        })            
    });
});

document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll('#admin-menu li').forEach(action => {
        action.addEventListener('click', event => {

            document.getElementById('admin-menu').classList.add('hide');

            switch(event.target.id) {
                case 'speciesAdd': 
                    document.getElementById('species-add').classList.remove('hide');
                    break;
                case 'traitAdd': 
                    document.getElementById('trait-add').classList.remove('hide');
                    break;
            }
        });
    });

});