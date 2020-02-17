import autocomplete from 'autocompleter';

import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import addQuestionTemplate from 'admin/screens/questions/add-question-template.html';

export const addQuestion = species => {

    const init = async () => {

        let item = window.snapdragon.species;

        const template = document.createElement('template');
              template.innerHTML = addQuestionTemplate;

        let parent = document.querySelector('#content-container');
            parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        // iconic taxon
        
        const inputIconicTaxon = document.querySelector('#input-iconic-taxon-key');
        const iconicTaxa = [ 'fungi', 'plantae', 'mollusca', 'aves', 'amphibia', 'reptilia', 'mammalia', 'insecta', 'actinopterygii', 'arachnida', 'lepidoptera' ];

        let keys = [];
        
        iconicTaxa.forEach(taxon => {
            keys.push({ label: taxon, value: taxon });
        });

        autocomplete({
            input: inputIconicTaxon,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = keys.filter(n => n.value.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                inputIconicTaxon.value = item.label;
            },
            minLength: 1,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        // keyCodes: 9 - tab; 13 - enter

        // rank

        const inputTaxonRank = document.querySelector('#input-taxon-rank');
              inputTaxonRank.focus();

        const ranks = [
            {label:'class', value:'class'},
            {label:'order', value:'order'},
            {label:'family', value:'family'},
            {label:'genus', value:'genus'}
        ];

        autocomplete({
            input: inputTaxonRank,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = ranks.filter(n => n.value.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                inputTaxonRank.value = item.label;
            },
            minLength: 0,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        // taxon

        const inputTaxon = document.querySelector('#input-taxon');

        if(item) {
            inputTaxon.value = item.name; // need to update with rank
        }

    };

    init();
};