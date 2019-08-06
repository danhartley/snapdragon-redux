import * as R from 'ramda';
import autocomplete from 'autocompleter';

import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/species-picker';
import { renderAddTrait } from 'admin/screens/add-trait';

import addTraitsTemplate from 'admin/screens/add-traits-template.html';
import addTraitsFieldsTemplate from 'admin/screens/add-traits-fields-template.html';

const addTraits = () => {

    let name;
    let item = global.species;

    const template = document.createElement('template');
          template.innerHTML = addTraitsTemplate;

    let parent = document.querySelector('#content-container');
        parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

    const renderTraits = async item => {
        
        const itemTraits = await firestore.getTraitsBySpeciesName(item.name);
        const itemFamily = await firestore.getItemTaxonByName({language: 'en'}, item.taxonomy.family);
              
        item.traits = itemTraits
        item.family = itemFamily;                
        
        const fields = [];

        if(item.traits) {

            for (let [key, obj] of Object.entries(item.traits)) {

                if(key !== 'name') {
                    const value = obj.value ? obj.value.join(', ') : '';
                    const unit = obj.unit || '';
                    fields.push({key,value, unit});
                }
            }
        }

        template.innerHTML = addTraitsFieldsTemplate;

        parent = document.querySelector('.js-traits');
        parent.innerHTML = '';

        renderTemplate({ fields }, template.content, parent);

        M.updateTextFields();

        const deleteIcons = document.querySelectorAll('i');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', async e => {
                const field = e.target.id;
                const response = await firestore.deleteSpeciesTraitField(item.name, field);
                console.log(response);
                renderTraits(item);
            });
        });
    };

    const appendAutoTraitValue = (input, traitFields) => {
        autocomplete({
            input: input,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = traitFields.filter(field => field.value.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                input.value = item.label;
            },
            minLength: 1,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });
    };

    const addFieldListeners = traits => {
        document.querySelectorAll('.trait-value').forEach(input => {
            if(input.dataset.field !== 'name') {
                let traitFields = traits.find(trait => trait.key === input.dataset.field);
                if(traitFields && traitFields.value) {
                    traitFields = traitFields.value.map(name => {
                        return {
                            label: name,
                            value: name
                        }
                    });
                    appendAutoTraitValue(input, traitFields);
                }
            }
        });
    };

    const addTrait = document.querySelector('.js-add-trait');

    const callback = async pair => {
        
        let trait = {};
              
        if(item.traits && item.traits[pair.key]) {
            trait[pair.key] = { value: [ ...item.traits[pair.key].value, pair.value ] };
        } else {
            trait[pair.key] = { value: [ pair.value ] };
        }

        console.log(trait);

        const log = await firestore.addSpeciesTraits(name, trait);

        renderTraits(item);
        renderAddTrait(addTrait, callback);
    };

    renderAddTrait(addTrait, callback);

    const inputSpecies = document.querySelector('#input-species-for-traits');
          inputSpecies.focus();

    if(item) inputSpecies.value = item.name;

    const init = async () => {

        const listenForSpeciesSelection = async event => {
            name = inputSpecies.value;
            item = await firestore.getSpeciesByName(name);
            renderTraits(item);
        };

        speciesPicker(inputSpecies, listenForSpeciesSelection);

        let traitValues = await firestore.getTraitValues();

        const traits = [];

        const meta = [ 'name', 'help', 'type' ];

        for (let [key, obj] of Object.entries(traitValues)) {

            if(key !== 'name') {

                const value = [];
                
                const trait = {};

                for(let [_key, _obj] of Object.entries(obj)) {
                    if(R.contains(_key, meta)) {
                        trait[_key.toLowerCase()] = _obj.toLowerCase();
                    } else {
                        value.push(_obj.toLowerCase());
                    }
                }

                trait.key = key.toLowerCase();
                trait.value = value;

                traits.push(trait);
            }
        };

        M.updateTextFields();

        console.log(traits);

        addFieldListeners(traits);
    };

    init();
};

export const traitsHandler = {
    addTraits
};