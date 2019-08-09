import * as R from 'ramda';

import autocomplete from 'autocompleter';

import { utils } from 'utils/utils';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import addTraitTemplate from 'admin/screens/add-trait-template.html';

export const renderAddTrait = (parent, callback) => {

    let inputKey, inputValue, inputUnit;

    const traitTriage = (traitValues, traitKey) => {

        inputUnit = document.querySelector('#input-unit-value');
        inputValue = document.querySelector('#input-trait-value');
        
        let units;

        traitValues.units.forEach(unit => {
            for (let [key, obj] of Object.entries(unit)) {
                if(key === utils.toCamelCase(traitKey)) {
                    units = obj;
                }
            }
        });
            
        if(units) {
            
            inputUnit.parentElement.classList.remove('hide');

            units = units.map(unit => { return { label: unit, value: unit }});

            initAutocomplete(inputUnit, units);

            const saveTrait = async () => {
                const savedText = document.querySelector('.js-saved');
                      savedText.classList.remove('hide');
                      savedText.innerHTML = `Trait, key: ${traitKey}, value: ${inputValue.value} ${inputUnit.value}, saved.`;
                const trait = { key: traitKey, value: inputValue.value, unit: inputUnit.value };
                callback(trait);
                inputKey.focus();
            };
        
            inputUnit.addEventListener('keypress', event => {
                if(event.keyCode == 13) {
                    saveTrait();
                }
            });
            inputUnit.addEventListener('keydown', event => {
                if(event.keyCode == 9) {
                    const highlightedText = document.querySelector('.selected');
                    if(highlightedText) {
                        inputUnit.value = highlightedText.innerText;
                        saveTrait();
                    }
                }
            });

        } else {

            inputUnit.parentElement.classList.add('hide');

            initTraitValues(traitValues, traitKey);
        }

    };

    const initTraitValues = async (traitValues, traitKey) => {

        let values = [];
    
        const exclude = [ 'help', 'name', 'type', 'units' ];
    
        for (let [key, obj] of Object.entries(traitValues[utils.toCamelCase(traitKey)])) {
            if(!R.contains(key, exclude)) {
                values.push({label: obj.toLowerCase(), value: obj.toLowerCase()});
            }
        }

        values = utils.sortAlphabeticallyBy(values, 'label');
    
        
        inputValue.value = '';
        
        setTimeout(() => {
            inputValue.focus();
        }, 250);
        
        initAutocomplete(inputValue, values);

        const saveTrait = async () => {
            const savedText = document.querySelector('.js-saved');
                  savedText.classList.remove('hide');
                  savedText.innerHTML = `Trait, key: ${traitKey}, value: ${inputValue.value}, saved.`;
            const trait = { key: traitKey, value: inputValue.value };
            callback(trait);
            inputKey.focus();
        };
    
        inputValue.addEventListener('keypress', event => {
            if(event.keyCode == 13) {
                saveTrait();
            }
        });
        inputValue.addEventListener('keydown', event => {
            if(event.keyCode == 9) {
                const highlightedText = document.querySelector('.selected');
                if(highlightedText) {
                    inputValue.value = highlightedText.innerText;
                    saveTrait();
                }
            }
        });
    };

    const init = async () => {

        let traitValues;

        const template = document.createElement('template');
        template.innerHTML = addTraitTemplate;

        parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        inputKey = document.querySelector('#input-trait-key');

        traitValues = await firestore.getTraitValues();

        let keys = [];

        for (let [key, obj] of Object.entries(traitValues['name'])) {
            keys.push({label: obj.toLowerCase(), value: obj.toLowerCase()});
        }

        keys = utils.sortAlphabeticallyBy(keys, 'label');

        initAutocomplete(inputKey, keys);

        inputKey.addEventListener('keypress', event => {
            if(event.keyCode == 13) {
                traitTriage(traitValues, event.target.value);
            }
        });

        inputKey.addEventListener('keydown', event => {
            if(event.keyCode == 9) {
                const highlightedText = document.querySelector('.selected');
                if(highlightedText) {
                    inputKey.value = highlightedText.innerText;
                    document.querySelector('.autocomplete-options-container').innerHTML = '';
                    traitTriage(traitValues, highlightedText.innerText);
                }
            }
        });
    }

    init();
};

const initAutocomplete = (input, options)  => {
    autocomplete({
        input: input,
        fetch: function(text, update) {
            text = text.toLowerCase();
            const suggestions = options.filter(n => n.value.toLowerCase().startsWith(text))
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item.label;
        },
        minLength: 0,
        debounceWaitMs: 200,
        className: 'autocomplete-options-container'
    });
};