import { contains } from 'ramda';

import autocomplete from 'autocompleter';
  
import { itemProperties } from 'ui/helpers/data-checking';
import { utils } from 'utils/utils';
import { firestore } from 'api/firebase/firestore';
import { traitValues } from 'admin/api/trait-values';
import { renderTemplate } from 'ui/helpers/templating';

import addTraitTemplate from 'admin/screens/add-trait-template.html';

export const renderAddTrait = (parent, callback) => {

    let inputKey, inputValue, inputUnit;

    const traitTriage = async (traitValues, traitKey) => {

        inputUnit = document.querySelector('#input-unit-value');
        inputValue = document.querySelector('#input-trait-value');
        
        let _units = await firestore.getUnits();

        let units = _units.map(unit => {
            for (let [key, obj] of Object.entries(unit)) {
                if(key === utils.toCamelCase(traitKey)) {
                    return obj;
                }
            }
        });
            
        if(units.filter(u => u).length > 0) {
            
          let unit = units.find(u => u);
          unit = unit.map(u => {
            return {
              label: u,
              value: u
            }
          });

          inputUnit.parentElement.classList.remove('hide');

          initAutocomplete(inputUnit, unit);

          const saveTrait = async () => {
              const trait = { key: traitKey, value: inputValue.value, unit: inputUnit.value };
              callback(trait);
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

        let traitKeyValues = traitValues[utils.toCamelCase(traitKey)];

        if(!traitKeyValues) {
            traitKeyValues = traitValues[itemProperties.getRootTraitValue(utils.toCamelCase(traitKey), 'start')];
        }

        if(!traitKeyValues) {
            traitKeyValues = traitValues[itemProperties.getRootTraitValue(utils.toCamelCase(traitKey), 'end')];
        }

        if(traitKeyValues) {
        
            for (let [key, obj] of Object.entries(traitKeyValues)) {
                if(!contains(key, exclude)) {
                    values.push({label: obj.trim().toLowerCase(), value: obj.trim().toLowerCase()});
                }
            }

            values = utils.sortAlphabeticallyBy(values, 'label');
            
            inputValue.value = '';
            
            setTimeout(() => {
                inputValue.focus();
            }, 250);
            
            initAutocomplete(inputValue, values);
        }

        const saveTrait = async () => {
            const trait = { key: traitKey, value: inputValue.value };
            callback(trait);
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

        // let traitValues;

        const template = document.createElement('template');
              template.innerHTML = addTraitTemplate;

        parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        inputKey = document.querySelector('#input-trait-key');

        // traitValues = await firestore.getUnits();

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
            const suggestions = options.filter(n => n.value.toLowerCase().startsWith(text));
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