import * as R from 'ramda';

import autocomplete from 'autocompleter';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import addTraitTemplate from 'admin/screens/add-trait-template.html';

const initTraitValues = async (traitValues, traitKey) => {

    const values = [];

    const exclude = [ 'help', 'name', 'type' ];

    for (let [key, obj] of Object.entries(traitValues[traitKey])) {
        if(!R.contains(key, exclude)) {
            values.push({label: obj, value: obj});
        }
    }

    const input = document.querySelector('#input-trait-value');
          input.focus();

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
        minLength: 1,
        debounceWaitMs: 200,
        className: 'autocomplete-options-container'
    });

    input.addEventListener('keypress', event => {
        if(event.keyCode == 13) {
            document.querySelector('.js-saved').classList.remove('hide');
        }
    });
};

export const renderAddTrait = (species, parent) => {

    const init = async () => {

        let traitValues;

        const template = document.createElement('template');
        template.innerHTML = addTraitTemplate;

        parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        traitValues = await firestore.getTraitValues();

        const keys = [];

        for (let [key, obj] of Object.entries(traitValues['name'])) {
            keys.push({label: obj, value: obj});
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
            minLength: 1,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        input.addEventListener('keypress', event => {
            if(event.keyCode == 13) {
                initTraitValues(traitValues, event.target.value);
            }
        });
    }

    init();
};