import * as R from 'ramda';

import autocomplete from 'autocompleter';

import { utils } from 'utils/utils';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import addTraitTemplate from 'admin/screens/add-trait-template.html';

export const renderAddTrait = (parent, callback) => {

    const initTraitValues = async (traitValues, traitKey) => {

        const values = [];
    
        const exclude = [ 'help', 'name', 'type' ];
    
        for (let [key, obj] of Object.entries(traitValues[utils.toCamelCase(traitKey)])) {
            if(!R.contains(key, exclude)) {
                values.push({label: obj.toLowerCase(), value: obj.toLowerCase()});
            }
        }
    
        const input = document.querySelector('#input-trait-value');
              input.value = '';
        
        setTimeout(() => {
            input.focus();    
        }, 250);
        
        autocomplete({
            input: input,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = values.filter(n => n.value.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                input.value = item.label;
            },
            minLength: 0,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });
    
        const saveTrait = async () => {
            const savedText = document.querySelector('.js-saved');
                  savedText.classList.remove('hide');
                  savedText.innerHTML = `Trait, key: ${traitKey}, value: ${input.value}, saved.`;
            const trait = { key: traitKey, value: input.value };
            callback(trait);
        };
    
        input.addEventListener('keypress', event => {
            if(event.keyCode == 13) {
                saveTrait();
            }
        });
        input.addEventListener('keydown', event => {
            if(event.keyCode == 9) {
                const highlightedText = document.querySelector('.selected').innerText;
                if(highlightedText) {
                    input.value = highlightedText;
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

        traitValues = await firestore.getTraitValues();

        const keys = [];

        for (let [key, obj] of Object.entries(traitValues['name'])) {
            keys.push({label: obj.toLowerCase(), value: obj.toLowerCase()});
        }

        const input = document.querySelector('#input-trait-key');

        autocomplete({
            input: input,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = keys.filter(n => n.value.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                input.value = item.label;
            },
            minLength: 0,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        input.addEventListener('keypress', event => {
            if(event.keyCode == 13) {
                initTraitValues(traitValues, event.target.value);
            }
        });

        input.addEventListener('keydown', event => {
            if(event.keyCode == 9) {
                const highlightedText = document.querySelector('.selected').innerText;
                if(highlightedText) {
                    input.value = highlightedText;
                    document.querySelector('.autocomplete-options-container').innerHTML = '';
                    initTraitValues(traitValues, highlightedText);
                }
            }
        });
    }

    init();
};