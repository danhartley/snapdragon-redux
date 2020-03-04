import autocomplete from 'autocompleter';

import { firestore } from 'api/firebase/firestore';
import { matchTaxon, iconicTaxa  } from 'api/snapdragon/iconic-taxa';
import { renderTemplate } from 'ui/helpers/templating';

import createQuestionTemplate from 'admin/screens/questions/create-question-template.html';

export const createQuestion = (collection, activeSpecies, parent = null) => {

    const init = async () => {

        let species = activeSpecies || !!window.snapdragon.species ? window.snapdragon.species : null;
        let taxonomy = species ? species.taxonomy : null;

        const template = document.createElement('template');
              template.innerHTML = createQuestionTemplate;

        parent = parent || document.querySelector('#content-container');
        parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        // iconic taxon
        
        const inputIconicTaxon = document.querySelector('#input-iconic-taxon');
              inputIconicTaxon.focus();              

        let keys = [];

        let iconicTaxaKeys = Object.keys(iconicTaxa).map(key => key.toLowerCase());
        
        iconicTaxaKeys.forEach(taxon => {
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

        const ranks = [
            {label:'class', value:'class'},
            {label:'order', value:'order'},
            {label:'family', value:'family'},
            {label:'genus', value:'genus'},
            {label:'species', value:'species'}
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
                if(taxonomy) {
                    inputTaxon.value = taxonomy[item.label]
                        ? taxonomy[item.label]
                        : species.name;
                }
            },
            minLength: 0,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });

        if(species) {
            inputIconicTaxon.value = matchTaxon(species.taxonomy, iconicTaxa).value;
            inputTaxonRank.value = ranks[4].value;
        }

        // taxon

        const inputTaxon = document.querySelector('#input-taxon');

        if(species) {
            inputTaxon.value = species.name;
        }
        
        const inputStatement = document.querySelector('#input-statement');
        const inputQuestion = document.querySelector('#input-question');
        const inputAnswer = document.querySelector('#input-answer');
        const inputAnswers1 = document.querySelector('#input-answers1');
        const inputAnswers2 = document.querySelector('#input-answers2');
        const inputAnswers3 = document.querySelector('#input-answers3');

        inputStatement.focus();

        var elems = document.querySelectorAll('.has-character-counter');
        M.CharacterCounter.init(elems);
        
        const getQuestion = () => {
            return {
                provider: 'snapdragon',
                iconicTaxon: inputIconicTaxon.value,
                rank: inputTaxonRank.value,
                taxon: inputTaxon.value,
                statement: inputStatement.value,
                question: inputQuestion.value,
                answer: inputAnswer.value,
                answers: [
                    inputAnswers1.value,
                    inputAnswers2.value,
                    inputAnswers3.value,
                ]
            };
        };

        const btnCreateQuestion = document.querySelector('.btnCreateQuestion');
              btnCreateQuestion.addEventListener('click', async e => {
                const question = getQuestion();
                console.log('question: ', question);
                const questionDocRef = await firestore.addQuestion(question);
                if(questionDocRef) {
                    console.log('questionDocRef: ', questionDocRef);                    
                }   
                collection.species.forEach(species => {
                    if(species.name === activeSpecies.name) {
                        species.questions = species.questions || [];
                        species.questions.push(question);
                    }
                });
                console.log('collection: ', collection);
                const collectionDocRef = await firestore.updateCollection(collection);
              });
    };

    setTimeout(() => {
        init();   
    },500);
};