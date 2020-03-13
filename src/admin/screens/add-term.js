import autocomplete from 'autocompleter';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import addTermTemplate from 'admin/screens/add-term-template.html';

export const addTerm = () => {

    const init = async () => {

        const template = document.createElement('template');
              template.innerHTML = addTermTemplate;

        const parent = document.querySelector('#content-container');
              parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        const inputTaxon = document.querySelector('#input-taxon');
        
        const taxa = [
            { name: 'common', label: 'common' },
            { name: 'fungi', label: 'fungi' },
            { name: 'plantae', label: 'plantae' },
            { name: 'insecta', label: 'insecta' },
            { name: 'aves', label: 'aves' },
        ];

        autocomplete({
            input: inputTaxon,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = taxa.filter(t => t.name.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                inputTaxon.value = item.label;
            },
            minLength: 0,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        const inputBranch = document.querySelector('#input-branch');

        const branches = [
            { name: 'morphology', label: 'morphology' },
            { name: 'general', label: 'general' },
            { name: 'anatomy', label: 'anatomy' },
            { name: 'classification', label: 'classification' },
            { name: 'behaviour', label: 'behaviour' },
            { name: 'ecology', label: 'ecology' },
            { name: 'physiology', label: 'physiology' },
        ];

        autocomplete({
            input: inputBranch,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = branches.filter(t => t.name.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                inputBranch.value = item.label;
            },
            minLength: 0,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        const btnAddTerm = document.querySelector('.btnAddTerm');
              btnAddTerm.addEventListener('click', e => {

                const inputTerm = document.querySelector('#input-term');
                const inputDefinition = document.querySelector('#input-definition');

                const definition = {
                    term: inputTerm.value,
                    definition: inputDefinition.value,
                    taxon: inputTerm.value,
                    branch: inputBranch.value
                };

                const savedText = document.querySelector('.js-saved');

                firestore.addDefinition(definition).then(response => {
                    savedText.innerHTML = 'new term successfully added!';
                    savedText.classList.remove('hide');
                }).catch(e => {
                    savedText.innerHTML = `Oops, something went wrong, nameley: ${e}`;
                    savedText.classList.remove('hide');
                });

                setTimeout(() => {
                    savedText.classList.add('hide');
                }, 3000);
              });
    };

    init();
};
