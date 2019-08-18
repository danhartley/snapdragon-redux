import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';
import { helpers } from 'admin/helpers';
import { eol } from 'admin/api/eol';
import { firestore } from 'api/firebase/firestore';
import { speciesPicker } from 'admin/screens/species-picker';

import addSpeciesTemplate from 'admin/screens/add-species-template.html';
import updateSpeciesTemplate from 'admin/screens/update-species-template.html';
import updateNamesTemplate from 'admin/screens/update-species-names-template.html';

const addSpecies = () => {

    const template = document.createElement('template');
          template.innerHTML = addSpeciesTemplate;

    const parent = document.querySelector('#content-container');
          parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    let item, imageIds = [], autocompleteRef;

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
    
    const inputSearch = document.querySelector('#input-search');
    const asyncProgress = document.querySelector('.async-progress');

    const searchEOLCallback = (species, ref) => {
        item = species;
        autocompleteRef = ref;
        document.querySelectorAll('.btnAddSpecies').forEach(btn => {
            btn.classList.remove('hide');
        });
    };

    eol.searchEOL(inputSearch, asyncProgress, searchEOLCallback, selectedLicence, imageIds);

    const btnGetSpeciesById = document.querySelector('#btnGetSpeciesById');
    const input = document.querySelector('#input-species');

    btnGetSpeciesById.addEventListener('click', async e => {
        item = await eol.getSpecies(input.value, selectedLicence);
        if(imageIds) helpers.getImagesLayout(item, '', imageIds);
        document.querySelectorAll('.btnAddSpecies').forEach(btn => {
            btn.classList.remove('hide');
        });
    });

    const activateGetTraitsBtn = async item => {
        
        const response = await firestore.addSpecies(item);

        const btnAddTraits = document.querySelector('.btnAddTraits');
              btnAddTraits.classList.remove('hide');
              btnAddTraits.addEventListener('click', event => {                
                document.querySelector('#add-traits').click();
              });

        console.log('Add species response: ', response);

        window.snapdragon.species = item;
    };

    document.querySelectorAll('.btnAddSpecies').forEach(btn => {
        btn.addEventListener('click', e => {
            addOrUpdateSpeciesToFirestore(item, imageIds, activateGetTraitsBtn);
        });
    });

    document.querySelector('#licences').addEventListener('change', e => {
        selectedLicence = e.target.value;
    });
};

const updateSpecies = () => {

    let item = window.snapdragon.species;

    const template = document.createElement('template');
          template.innerHTML = updateSpeciesTemplate;

    const parent = document.querySelector('#content-container');
          parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    const btnRemoveSpecies = document.querySelector('.btnRemoveSpecies');
    const chkSafety = document.querySelector('.chkSafety');

    const removeSpecies = () => {
        firestore.deleteSpeciesByName(input.value);
    };

    const safety = document.querySelector("input[type='checkbox']");

    safety.addEventListener('click', () => {
        btnRemoveSpecies.disabled = !safety.checked;
    });

    btnRemoveSpecies.addEventListener('click', removeSpecies);

    const input = document.querySelector('#input-species-to-update');
          input.focus();

    const listenForSpeciesSelection = async species => {
            
        item = species;
        btnRemoveSpecies.classList.remove('hide');
        btnGetPhotos.classList.remove('hide');
        chkSafety.classList.remove('hide');

        const vernacularNames = document.getElementById('vernacularNames');
        template.innerHTML = updateNamesTemplate;
        renderTemplate({names: item.names}, template.content, vernacularNames);
        M.updateTextFields();
    };

    speciesPicker(input, listenForSpeciesSelection);

    const btnGetPhotos = document.querySelector('.btnGetPhotos');
    const btnUpdateSpecies = document.querySelector('.btnUpdateSpecies');

    btnGetPhotos.addEventListener('click', async e => {

        const prefix = item.images ? 'https://content.eol.org/data/media/' : '';

        if(item.images.length === 0) {
            item.images = await eol.getSpeciesPhotos(item.eolId, 'pd|cc-by|cc-by-sa|cc-by-nd');                                    
        }

        const imageIds = [];

        helpers.getImagesLayout(item, prefix, imageIds);

        btnUpdateSpecies.classList.remove('hide');

        btnUpdateSpecies.addEventListener('click', e => {
            addOrUpdateSpeciesToFirestore(item, imageIds, async () => {
                const response = await firestore.updateSpecies(item);
                console.log(response);
            }); 
        });
    });

    if(item) {
        
        btnRemoveSpecies.classList.remove('hide');
        btnGetPhotos.classList.remove('hide');
        chkSafety.classList.remove('hide');

        btnGetPhotos.click();
    }
};

export const speciesHandler = {
    addSpecies,
    updateSpecies
};

const addOrUpdateSpeciesToFirestore = (item, imageIds, callback) => {

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

    if(callback) callback(item);
};