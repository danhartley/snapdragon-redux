import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';
import { helpers } from 'admin/helpers';
import { eol } from 'admin/api/eol';
import { inat } from 'admin/api/inat';
import { itis } from 'admin/api/itis';
import { gbif } from 'admin/api/gbif';
import { firestore } from 'api/firebase/firestore';
import { eolAutocomplete } from 'admin/api/eol-autocomplete';
import { speciesPicker } from 'admin/screens/species-picker';

import addSpeciesTemplate from 'admin/screens/add-species-template.html';
import updateSpeciesTemplate from 'admin/screens/update-species-template.html';

const addSpecies = () => {

    const template = document.createElement('template');
          template.innerHTML = addSpeciesTemplate;

    const parent = document.querySelector('#content-container');
          parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    const items = [], inatItems = [], newCollection = [];
    let imageIds = [], currentItemId;

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

    const licenceSelector = licenses => {
        let options = '<option value="0">Select media licence rule</option>';
        licenses.forEach(licence => {
            options = options + `<option value="${licence.value}">${licence.key}</option>`;
        });
        document.querySelector('#licences').innerHTML = options;
    }

    licenceSelector(licenses);

    document.getElementById('licences').value = noneExcludedFromCommercialUse;

    const parseSpeciesData = async (item) => {

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
    
    const inputSearch = document.querySelector('#input-search');
    const asyncProgress = document.querySelector('.async-progress');

    let autocompleteRef;

    const searchEOL = async () => {        
        autocompleteRef = eolAutocomplete(inputSearch, 'search', 'autocomplete-options-container', () => {
            asyncProgress.classList.contains('hide')
                ? asyncProgress.classList.remove('hide')
                : asyncProgress.classList.add('hide');
        }, () => {
            getSpecies({id: document.getElementById('input-search').name});
            asyncProgress.classList.remove('hide');
            asyncProgress.innerHTML = 'Fetching matching species…';
            setTimeout(() => {
                asyncProgress.classList.add('hide');
            }, 2550);
        });
    };

    searchEOL();

    const getSpecies = async id => {
        const item = await parseSpeciesData(eol.getSpeciesUrl(id, selectedLicence));
        const binomial = helpers.getBinomial(item);
        gbif.getTaxonomy(binomial).then(taxonomy => {
            item.taxonomy = {
                kingdom: taxonomy.kingdom,
                phylum: taxonomy.phylum,
                class: taxonomy.class,
                order: taxonomy.order,
                genus: taxonomy.genus,
                family: taxonomy.family
            };
        });
        const images = helpers.getImagesLayout(item, '');
        imageIds = images.imageIds;
        currentItemId = images.currentItemId;
        document.querySelectorAll('.btnAddSpecies').forEach(btn => {
            btn.classList.remove('hide');
        });
    }

    const addOrUpdateSpeciesToFirestore = (btn, callback) => {

        btn.addEventListener('click', async event => {

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

            // document.querySelectorAll('.collectionCount').forEach(counter => counter.innerHTML = newCollection.length);
        
            if(callback) callback(item);            
        });
    };

    const activateGetTraitsBtn = async item => {
        
        const response = await firestore.addSpecies(item);

        const btnAddTraits = document.querySelector('.btnAddTraits');
              btnAddTraits.classList.remove('hide');
              btnAddTraits.addEventListener('click', event => {
                global.species = item;
                document.querySelector('#add-traits').click();
              });

        console.log('Add species response: ', response);
    };

    document.querySelectorAll('.btnAddSpecies').forEach(btn => {
        addOrUpdateSpeciesToFirestore(btn, activateGetTraitsBtn);
    });

    document.querySelector('#licences').addEventListener('change', e => {
        selectedLicence = e.target.value;
    });
};

const updateSpecies = () => {

    let imageIds = [], currentItemId;
    
    const template = document.createElement('template');
          template.innerHTML = updateSpeciesTemplate;

    const parent = document.querySelector('#content-container');
          parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    const btnRemoveSpecies = document.querySelector('.btnRemoveSpecies');
    const chkSafety = document.querySelector('.chkSafety');

    const removeSpecies = () => {
        // const input = document.querySelector('#input-species-to-update');              
        firestore.deleteSpeciesByName(input.value);
    };

    const safety = document.querySelector("input[type='checkbox']");

    safety.addEventListener('click', () => {
        btnRemoveSpecies.disabled = !safety.checked;
    });

    btnRemoveSpecies.addEventListener('click', removeSpecies);

    const input = document.querySelector('#input-species-to-update');
          input.focus();

    const listenForSpeciesSelection = async event => {
            
        btnRemoveSpecies.classList.remove('hide');
        btnGetPhotos.classList.remove('hide');
        chkSafety.classList.remove('hide');
    };

    speciesPicker(input, listenForSpeciesSelection);

    const btnGetPhotos = document.querySelector('.btnGetPhotos');

    btnGetPhotos.addEventListener('click', async e => {

        const item = await firestore.getSpeciesByName(input.value);

        const prefix = item.images ? 'https://content.eol.org/data/media/' : '';

        if(images.length === 0) {
            
        }

        const images = helpers.getImagesLayout(item, prefix);
        imageIds = images.imageIds;
        currentItemId = images.currentItemId;
    });

    document.querySelectorAll('.btnUpdateSpecies').forEach(btn => {
        addOrUpdateSpeciesToFirestore(btn, async () => {
            const response = await firestore.udpateSpecies(item);
            console.log(response);
        });
    });

}

export const speciesHandler = {
    addSpecies,
    updateSpecies
};