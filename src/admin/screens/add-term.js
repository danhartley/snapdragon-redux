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

        const chkBoxTechnical = document.querySelector('#chk-box-technical');

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

        const inputTerm = document.querySelector('#input-term');
              inputTerm.focus();

        const inputDefinition = document.querySelector('#input-definition');

        const actionHandler = (e, inputValue, message, action) => {

            const definition = {
                term: inputValue,
                definition: inputDefinition.value,
                taxon: inputTaxon.value,
                branch: inputBranch.value,
                technical: chkBoxTechnical.checked
            };

            const savedText = document.querySelector('.js-saved');

            firestore[action](definition).then(response => {
                savedText.innerHTML = message;
                savedText.classList.remove('hide');
            }).catch(e => {
                savedText.innerHTML = `Oops, something went wrong, nameley: ${e}`;
                savedText.classList.remove('hide');
            });

            setTimeout(() => {
                savedText.classList.add('hide');
            }, 3000);
        };
        
        const btnAddTerm = document.querySelector('.btnAddTerm');
              btnAddTerm.addEventListener('click', e => {
                actionHandler(e, inputTerm.value, 'new term successfully added!', 'addDefinition');
              });
        const btnEditTerm = document.querySelector('.js-btn-edit');
              btnEditTerm.addEventListener('click', e => {
                actionHandler(e, inputEditTerm.value, 'existing term successfully updated!', 'updateDefinition');
              });

        const addTerm = document.querySelector('.js-add-term');
        const editTerm = document.querySelector('.js-edit-term');

        const inputEditTerm = document.querySelector('#input-edit-term');

        const definitions = await firestore.getDefinitionsWhere({});
              definitions.forEach(definition => {
                definition.name = definition.term;
                definition.label = definition.term;
              });

        autocomplete({
            input: inputEditTerm,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = definitions.filter(d => d.name.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                inputEditTerm.value = item.label;
            },
            minLength: 0,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        const chkBoxEdit = document.querySelector('#chk-box-edit');
              chkBoxEdit.addEventListener('change', e => {
                  if(e.target.checked) {
                      addTerm.classList.add('hide');
                      editTerm.classList.remove('hide');
                      inputEditTerm.focus();
                      btnEditTerm.classList.remove('hide');
                      btnAddTerm.classList.add('hide');
                  } else {
                    addTerm.classList.remove('hide');
                    editTerm.classList.add('hide');
                    inputDefinition.value = '';
                    inputBranch.value = '';
                    inputTaxon.value = '';
                    inputEditTerm.value = '';
                    chkBoxTechnical.checked = false;
                    inputTerm.focus();
                    btnEditTerm.classList.add('hide');
                    btnAddTerm.classList.remove('hide');
                  }
              });

        inputEditTerm.addEventListener('keypress', async event => {
            if(event.keyCode == 13) {
                const definitions = await firestore.getDefinitionsWhere({
                    key: 'term',
                    operator: '==',
                    value: inputEditTerm.value
                });
                const definition = definitions[0];

                inputDefinition.value = definition.definition;
                inputBranch.value = definition.branch;
                inputTaxon.value = definition.taxon;
                chkBoxTechnical.checked = definition.technical;
            }
        });
    };

    init();
};