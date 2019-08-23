import * as R from 'ramda';
import autocomplete from 'autocompleter';

import { utils } from 'utils/utils';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/species-picker';
import { renderAddTrait } from 'admin/screens/add-trait';

import addTraitsTemplate from 'admin/screens/add-traits-template.html';
import addTraitsFieldsTemplate from 'admin/screens/add-traits-fields-template.html';

const addTraits = () => {

    let item = window.snapdragon.species;

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
        
        const fields = [], relationships = [];

        if(item.traits) {

            const traitsToIgnore = [ 'name', 'relationships', 'units' ];

            for (let [key, obj] of Object.entries(item.traits)) {

                if(!R.contains(key, traitsToIgnore)) {
                    const value = obj.value ? obj.value.join(', ') : '';
                    const unit = obj.unit || '';
                    fields.push({key,value, unit});
                }
                if(key === 'relationships') {
                    obj.forEach(relationship => {
                        relationships.push({
                            key: key,
                            type: relationship.value[0],
                            speciesA: relationship.symbiont.name,
                            speciesARole: relationship.symbiont.role,
                            speciesB: item.name,
                            speciesBRole: relationship.type,
                            description: relationship.description
                        })
                    });
                }
            }
        }

        template.innerHTML = addTraitsFieldsTemplate;

        parent = document.querySelector('.js-traits');
        parent.innerHTML = '';

        renderTemplate({ fields, relationships }, template.content, parent);

        M.updateTextFields();

        document.getElementById('input-trait-key').focus();

        const deleteIcons = document.querySelectorAll('i');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', async e => {
                e.target.classList.add('alert');
                const field = e.target.id;
                const response = await firestore.deleteSpeciesTraitField(item.name, field);         
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

    const addTraitParent = document.querySelector('.js-add-trait');

    const callback = async pair => {
        
        let trait = {};
              
        if(item.traits && item.traits[pair.key]) {
            trait[pair.key] = { value: [ ...item.traits[pair.key].value, utils.capitaliseFirst(pair.value) ] };
        } else {
            trait[pair.key] = { value: [ utils.capitaliseFirst(pair.value) ] };
        }

        if(pair.unit) trait[pair.key].unit = pair.unit;

        console.log(trait);

        const log = await firestore.addSpeciesTraits(item.name, trait);

        renderTraits(item);
        renderAddTrait(addTraitParent, callback);

        const savedText = document.querySelector('.js-saved');
        savedText.classList.remove('hide');
        savedText.innerHTML = pair.unit 
            ? `Trait, key: ${pair.key}, value: ${pair.value} ${pair.value}, saved.`
            : `Trait, key: ${pair.key}, value: ${pair.value}, saved.`

        setInterval(() => {
            savedText.classList.add('hide');
        }, 5000);
    };

    renderAddTrait(addTraitParent, callback);

    const inputSpecies = document.querySelector('#input-species-for-traits');
          inputSpecies.focus();

    const init = async () => {

        const listenForSpeciesSelection = async species => {
            item = species;
            renderTraits(item);
        };

        speciesPicker(inputSpecies, listenForSpeciesSelection);

        let traitValues = await firestore.getTraitValues();

        const traits = [];

        const meta = [ 'name', 'help', 'type', 'units' ];

        for (let [key, obj] of Object.entries(traitValues)) {

            if(!R.contains(key['name', 'units'])) {

                const value = [];
                
                const trait = {};

                for(let [_key, _obj] of Object.entries(obj)) {
                    if(R.contains(_key, meta)) {
                        trait[_key.toLowerCase()] = _obj.toLowerCase();
                    } else {
                        try {
                            value.push(_obj.toLowerCase());
                        } catch (e) {
                            console.log("_key", _key);
                            console.log("_obj", _obj);
                        }
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

    if(item) {
        inputSpecies.value = item.name;
        renderTraits(item);
    }
};

export const traitsHandler = {
    addTraits
};