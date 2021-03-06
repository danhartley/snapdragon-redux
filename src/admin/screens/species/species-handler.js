import { contains } from 'ramda';

import autocomplete from 'autocompleter';

import { utils } from 'utils/utils';
import { matchTaxon, iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';
import { helpers } from 'admin/helpers';
import { eol } from 'admin/api/eol';
import { firestore } from 'api/firebase/firestore';
import { speciesPicker } from 'admin/screens/taxa-pickers';

import addSpeciesTemplate from 'admin/screens/species/add-species-template.html';
import updateSpeciesTemplate from 'admin/screens/species/update-species-template.html';
import updateSpeciesNamesTemplate from 'admin/screens/species/update-species-names-template.html';
import updateSpeciesNamesListTemplate from 'admin/screens/species/update-species-names-list-template.html';

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
          setTimeout(() => {
            inputSearch.focus();
          }, 250);
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
        if(imageIds) helpers.getImagesLayout(item, imageIds, false);
        document.querySelectorAll('.btnAddSpecies').forEach(btn => {
            btn.classList.remove('hide');
        });
    });

    document.querySelectorAll('.btnAddSpecies').forEach(btn => {
        btn.addEventListener('click', e => {
            addOrUpdateSpeciesToFirestore(item, imageIds, 'ADD_SPECIES');
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
    const chkStar = document.querySelector('.chkStar');

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
        chkStar.classList.remove('hide');
    };

    speciesPicker(input, listenForSpeciesSelection);

    const btnGetPhotos = document.querySelector('.btnGetPhotos');
    const btnUpdateSpecies = document.querySelector('.btnUpdateSpecies');

    btnGetPhotos.addEventListener('click', async e => {

        if(item.images.length === 0) {
            item.images = await eol.getSpeciesPhotos(item.eolId, 'pd|cc-by|cc-by-sa|cc-by-nd');                             
        }

        const imageIds = [];

        helpers.getImagesLayout(item, imageIds, true);

        btnUpdateSpecies.classList.remove('hide');

        btnUpdateSpecies.addEventListener('click', e => {
            addOrUpdateSpeciesToFirestore(item, imageIds, 'UPDATE_PHOTOS'); 
        });
    });

    if(item) {
        
        btnRemoveSpecies.classList.remove('hide');
        btnGetPhotos.classList.remove('hide');
        chkSafety.classList.remove('hide');
        chkStar.classList.remove('hide');

        btnGetPhotos.click();
    }
};

const updateSpeciesNames = () => {

    let item = window.snapdragon.species;

    const template = document.createElement('template');
    template.innerHTML = updateSpeciesNamesTemplate;

    const parent = document.querySelector('#content-container');
          parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    const inputLanguage = document.querySelector('#input-language-value');
    const inputVernacularName = document.querySelector('#input-vernacular-value');

    const options = [
        {label:'de', value:'de'},
        {label:'en', value:'en'},
        {label:'fr', value:'fr'},
        {label:'es', value:'es'},
        {label:'pt', value:'pt'},
        {label:'it', value:'it'},
    ];

    autocomplete({
        input: inputLanguage,
        fetch: function(text, update) {
            text = text.toLowerCase();
            const suggestions = options.filter(n => n.value.toLowerCase().startsWith(text))
            update(suggestions);
        },
        onSelect: function(item) {
            inputLanguage.value = item.label;
        },
        minLength: 0,
        debounceWaitMs: 200,
        className: 'autocomplete-options-container'
    });

    const input = document.querySelector('#input-species-to-update');
          input.focus();

    const vernacularNames = document.getElementById('vernacularNames');

    const renderNameslist = async (item, force = false) => {
        vernacularNames.innerHTML = '';
        template.innerHTML = updateSpeciesNamesListTemplate;
        const updatedItem = await firestore.getSpeciesByName(item.name, force);
        item.names = utils.sortAlphabeticallyBy(updatedItem.names, 'language');
        renderTemplate({names: item.names}, template.content, vernacularNames);
        M.updateTextFields();

        const deleteIcons = document.querySelectorAll('button');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', async e => {
                e.target.querySelector('svg').classList.add('alert');
                const name = e.target.id;                
                item.names = item.names.filter(n => n.vernacularName !== name);
                await firestore.updateSpeciesNames(item, item.names);
                renderNameslist(item, true);
            });
        });

        inputLanguage.value = '';
        inputLanguage.focus();
        inputVernacularName.value = '';
    }

    const listenForSpeciesSelection = async species => {
        item = species;                
        renderNameslist(item, true);
    };

    if(item) {
        renderNameslist(item, false);
    }

    speciesPicker(input, listenForSpeciesSelection);

    const updateSpeciesNames = async name => {

        item.names = [ name, ...item.names ];

        await firestore.updateSpeciesNames(item, item.names);

        renderNameslist(item, true);
    };

    inputVernacularName.addEventListener('keypress', event => {
        if(event.keyCode == 13) {
            const name = { language: inputLanguage.value, vernacularName: event.target.value };
            updateSpeciesNames(name);
        }
    });

    inputVernacularName.addEventListener('keydown', event => {
        if(event.keyCode == 9) {
            const highlightedText = document.querySelector('.selected');
            if(highlightedText) {
                inputKey.value = highlightedText.innerText;
                document.querySelector('.autocomplete-options-container').innerHTML = '';
                const name = { language: inputLanguage.value, vernacularName: highlightedText.innerText };
                updateSpeciesNames(name);
            }
        }
    });
};

export const speciesHandler = {
    addSpecies,
    updateSpecies,
    updateSpeciesNames
};

const addNewSpecies = async item => {

    item.iconicTaxon = matchTaxon(item.taxonomy, iconicTaxa).value;
    
    const response = await firestore.addSpecies(item);

    const btnAddTraits = document.querySelector('.btnAddTraits');
          btnAddTraits.classList.remove('hide');
          btnAddTraits.addEventListener('click', event => {                
            document.querySelector('#add-traits').click();
          });

    window.snapdragon.species = item;
};

const updateExistingSpecies = async item => {
    const response = await firestore.updateSpecies(item);
};

const addOrUpdateSpeciesToFirestore = (item, imageIds, action) => {

    const images = [];

    item.images.forEach((image,index) => {
        imageIds.forEach(id => {
            if(index === id) {
                images.push(image);
            }
        });
    });

    images.forEach(image => image.url = image.url.replace('https://content.eol.org/data/media/', ''));

    switch(action) {
        case 'ADD_SPECIES':       
            item.images = images;
            addNewSpecies(item);
            break;
        case 'UPDATE_PHOTOS':
            const setStarredImage = document.querySelector('.chkStar input').checked;
            const imageUrls = images.map(i => i.url);
            if(setStarredImage) {
                item.images.forEach(image => {
                    if(contains(image.url, imageUrls)) {
                        image.starred = true;
                    } else {
                        if(image.hasOwnProperty('starred')) {
                            image.starred = false;  
                        }
                    }
                });
            } else {                
                item.images = item.images.map(image => {
                    if(contains(image.url, imageUrls)) {
                        const index = imageUrls.indexOf(image.url);
                        if(index !== -1) imageUrls.splice(index, 1);
                    }
                    else {
                        return image;
                    }
                });

                item.images = item.images.filter(i => i);
            }
            updateExistingSpecies(item);
            break;
    }
};