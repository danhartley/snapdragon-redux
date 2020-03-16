import autocomplete from 'autocompleter';

import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';

import editTermsTemplate from 'admin/screens/collection/edit-collection-terms-template.html';
import termsTemplate from 'admin/screens/collection/terms-collection-template.html';

export const editCollectionTerms = () => {

    const init = async () => {

        const template = document.createElement('template');
              template.innerHTML = editTermsTemplate;
    
        let parent = document.querySelector('#content-container');
            parent.innerHTML = '';
    
        renderTemplate({}, template.content, parent);

        const inputCollection = document.querySelector('#input-collection');
              setTimeout(() => {
                inputCollection.focus();   
              });

        const inputTerm = document.querySelector('#input-term');

        let collection;

        collectionPicker(inputCollection, async selectedCollection => {
            collection = selectedCollection;
            inputTerm.focus();
            getCollectionTerms(collection);
        });        

        let glossary = await firestore.getDefinitionsByTaxa(['common', 'plantae', 'aves', 'fungi', 'insecta']);

        let definitions = glossary.map(definition => { return { name: definition.term, label: definition.term } });

        autocomplete({
            input: inputTerm,
            fetch: function(text, update) {
                text = text.toLowerCase();
                const suggestions = definitions.filter(definition => definition.name.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function(item) {
                inputTerm.value = item.label;
            },
            minLength: 0,
            debounceWaitMs: 200,
            className: 'autocomplete-options-container'
        });
        
        const btnAddTermToCollection = document.querySelector('.btnAddTermToCollection');
              btnAddTermToCollection.addEventListener('click', e => {
                addTermToCollection();
              });

        inputTerm.addEventListener('keypress', event => {
            if(event.keyCode == 13) {
                addTermToCollection();
            }
        });
        
        inputTerm.addEventListener('keydown', event => {
            if(event.keyCode == 9) {
                const highlightedText = document.querySelector('.selected');
                if(highlightedText) {
                    inputTerm.value = highlightedText.innerText;
                    addTermToCollection();
                }
            }
        });
        
        const addTermToCollection = () => {

            const termToDelete = glossary.find(definition => definition.term === inputTerm.value).id;
                  
            if(collection) {
                collection.terms = collection.terms || [];
                collection.terms.push(termToDelete);
            }

            const savedText = document.querySelector('.js-saved');

            updateCollection(collection, savedText, inputTerm);

            setTimeout(() => {
                savedText.classList.add('hide');
            }, 2500);

            const definition = glossary.find(definition => definition.term === inputTerm.value);

            const termsList = document.querySelector('.js-terms-list');

            termsList.innerHTML += `<li>
                <div class="centred-block">
                    <span>${definition.term}</span>
                    <i id="${definition.id}" class="margin-left fas fa-trash"></i>
                </div>
            </li>`;

            handleDeleteTerm(collection);
        };

        const getCollectionTerms = async collection => {

            const collectinTerms = document.querySelector('.js-collection-terms');

            collectinTerms.innerHTML = '';

            if(collection) {

                if(collection.terms) {

                    const definitions = await firestore.getBatchDefinitionsById(collection.terms);

                    template.innerHTML = termsTemplate;

                    renderTemplate({ definitions }, template.content, document.querySelector('.js-collection-terms'));

                    handleDeleteTerm(collection);
                }

            }
        };
    }

    init();

};

const updateCollection = (collection, savedText, inputTerm) => {

    firestore.updateCollection(collection).then(response => {
        savedText.innerHTML = 'The term was added to collection successfully!';
        savedText.classList.remove('hide');
        inputTerm.value = '';
        inputTerm.focus();
    }).catch(e => {
        savedText.innerHTML = `Oops, something went wrong, nameley: ${e}`;
        savedText.classList.remove('hide');
    });
}
function handleDeleteTerm(collection) {
    const termDeleteIcons = document.querySelectorAll('.js-terms-list li i');
    termDeleteIcons.forEach(icon => {
        icon.addEventListener('click', e => {
            const termToDelete = e.target;
            collection.terms = collection.terms.filter(term => term !== termToDelete.id);
            firestore.updateCollection(collection);
            termToDelete.parentElement.parentElement.style.display = 'none';
        });
    });
}

