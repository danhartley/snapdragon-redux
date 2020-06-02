import autocomplete from 'autocompleter';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {ErrorBoundary} from 'react-error-boundary'

import { utils } from 'utils/utils';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';

import addTermTemplate from 'admin/screens/add-term-template.html';

const ErrorFallback = ({error, componentStack, resetErrorBoundary}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
};

export const addTerm = () => {

    const init = async () => {

        const template = document.createElement('template');
              template.innerHTML = addTermTemplate;

        const parent = document.querySelector('#content-container');
              parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        const branches = [
          { name: 'morphology', label: 'morphology' },
          { name: 'general', label: 'general' },
          { name: 'anatomy', label: 'anatomy' },
          { name: 'classification', label: 'classification' },
          { name: 'behaviour', label: 'behaviour' },
          { name: 'ecology', label: 'ecology' },
          { name: 'physiology', label: 'physiology' },
        ];

        const taxa = [
            { name: 'common', label: 'common' },
            { name: 'fungi', label: 'fungi' },
            { name: 'plantae', label: 'plantae' },
            { name: 'insecta', label: 'insecta' },
            { name: 'aves', label: 'aves' },
        ];
        
        // Function component
        const TermForm = props => {

          let [ editMode, setEditMode ] = useState(false);
          let [ addTerm, setAddTerm ] = useState('');
          let [ editTerm, setEditTerm ] = useState('');
          let [ definition, setDefinition ] = useState('');
          let [ wiki, setWiki ] = useState('');
          let [ isTechnical, setIsTechnical ] = useState(false);

          const handleModeChange = e => {

            const isEditMode = e.target.checked;
            isEditMode ? setEditTerm('') : setAddTerm('');
            inputEditTerm.value = '';
            inputAddTerm.value = '';
            setTimeout(() => {
              isEditMode ? inputEditTerm.focus() : inputAddTerm.focus();
            }, 500);
            setEditMode(isEditMode);
            setDefinition('');
            setWiki('');
            setIsTechnical(false);

            inputBranch.value = '';
            inputTaxon.value = '';
          };

          const savedText = document.querySelector('.js-saved'); // temp hack

          const handleAddTerm = async e => {

            if(e.key === 'Tab') {    

              const input = e.target;

              input.value = utils.capitaliseFirst(input.value);

                const definitions = await firestore.getDefinitionsWhere({
                    key: 'term',
                    operator: '==',
                    value: input.value
                });
                if(definitions[0]) {
                    input.value = '';
                    input.focus();
                    savedText.innerHTML = 'That term has already been defined! Try another.';
                    savedText.classList.remove('hide');
                    setTimeout(() => {
                        savedText.classList.add('hide');
                    }, 3000);
                }
            }
          };

          const handleEditTerm = async e => {

              if(e.key === 'Enter') {

                const input = e.target;
                
                const definitions = await firestore.getDefinitionsWhere({
                    key: 'term',
                    operator: '==',
                    value: input.value
                });

                const term = definitions[0];

                setEditTerm(term.term);
                setDefinition(term.definition);
                setWiki(term.wiki);
                isTechnical = term.technical;
                inputBranch.value = term.branch;
                inputTaxon.value = term.taxon;
              }
          };

          const addOrEditTermHandler = (e, input, message, action) => {

            const glossaryItem = {
                term: input.value,
                definition,
                taxon: inputTaxon.value,
                branch: inputBranch.value,
                technical: isTechnical
            };

            if(inputWiki.value.length > 0) glossaryItem.wiki = inputWiki.value;

            firestore[action](glossaryItem).then(docRef => {
                savedText.innerHTML = message;
                savedText.classList.remove('hide');
                setAddTerm('');
                setEditTerm('');
                input.value = '';                
                input.focus();
                setDefinition('');
                setWiki('');
                addToCollection(docRef);
            }).catch(e => {
                savedText.innerHTML = `Oops, something went wrong, namely: ${e}`;
                savedText.classList.remove('hide');
            });

            setTimeout(() => {
                savedText.classList.add('hide');
            }, 3000);
          };

          const handleSubmit = e => {

            e.preventDefault();

            if(e.key == "Enter") event.preventDefault();

            // hack validation to prevent submission after accepting term to edit
            if(inputDefinition.value.length === 0) return;

            ckhBoxEdit.checked
              ? addOrEditTermHandler(e, inputEditTerm, 'This term was updated successfully!', 'updateDefinition')
              : addOrEditTermHandler(e, inputAddTerm, 'The new term was added successfully!', 'addDefinition');   
          };

          useEffect(() => {
              autocomplete({
                input: inputBranch,
                fetch: function(text, update) {
                    text = text.toLowerCase();
                    const suggestions = props.branches.filter(t => t.name.toLowerCase().startsWith(text))
                    update(suggestions);
                },
                onSelect: function(item) {
                  inputBranch.value = item.label;
                },
                minLength: 0,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
            });
          }, []);

          useEffect(() => {
            autocomplete({
                input: inputTaxon,
                fetch: function(text, update) {
                    text = text.toLowerCase();
                    const suggestions = props.taxa.filter(t => t.name.toLowerCase().startsWith(text))
                    update(suggestions);
                },
                onSelect: function(item) {
                  inputTaxon.value = item.label;
                },
                minLength: 0,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
            });
          }, []);

          return (
            <form id="addOrEditTermForm">
              <div className="row">
                <div className="input-field col s4">
                    <label>
                        <input id="ckhBoxEdit" type="checkbox" onChange={handleModeChange} />
                        <span>Edit mode</span>
                    </label>
                </div>    
                <div className="input-field col s8">
                    <div>
                        <label>
                            <input id="chk-box-add-to-collection" type="checkbox" />
                            <span>Add to this collection:</span>
                        </label>
            
                        <input id="input-collection" className="autocomplete" type="text" placeholder="Start typing a collection name" autoFocus spellCheck="false" />
                        <label htmlFor="input-collection" className="active">Snapdragon collection finder</label>  
                    </div>
                </div>
            </div>

              <br />

              <div className={`js-add-term row ${editMode ? 'hide' : ''}`}>
                <div className="input-field col s2">
                    <input id="inputAddTerm" value={addTerm} onChange={e => setAddTerm(e.target.value)} onKeyDown={handleAddTerm} type="text" placeholder="Enter term" spellCheck="false" />            
                    <label htmlFor="inputAddTerm" className="active">Term</label>
                </div>  
              </div>                      
              <div className={`js-edit-term row ${editMode ? '' : 'hide'}`}>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <div className="input-field col s2">
                        <input id="inputEditTerm" onKeyPress={handleEditTerm} type="text" placeholder="Start typing term" spellCheck="false " />
                        <label htmlFor="inputEditTerm" className="active">Edit term</label>
                    </div>
                  </ErrorBoundary>
                  <div className="autocomplete-options-container hide-empty" id="snapdragon-term-autocomplete"></div>
              </div>
              <div className="row">
                  <div className="input-field col s2">
                      <input id="inputDefinition" type="text" placeholder="Enter definition" spellCheck="false" value={definition} onChange={e => setDefinition(e.target.value)} />      
                      <label htmlFor="inputDefinition" className="active">Definition</label>
                  </div>
              </div>
              <div className="row">
                  <div className="input-field col s2">
                      <input id="inputTaxon" type="text" placeholder="Start typing taxon" spellCheck="false" />
                      <label htmlFor="inputTaxon" className="active">Taxon</label>
                  </div>
                  <div className="autocomplete-options-container hide-empty" id="snapdragon-taxon-autocomplete"></div>      
                  <div className="input-field col s2">
                      <input id="inputBranch" type="text" placeholder="Start typing branch" spellCheck="false" />
                      <label htmlFor="inputBranch" className="active">Branch</label>
                  </div>
                  <div className="autocomplete-options-container hide-empty" id="snapdragon-branch-autocomplete"></div>
              </div>
              <div className="row">
                  <div className="input-field col s2">
                      <input id="inputWiki" defaultValue={wiki} type="text" placeholder="Enter web link" spellCheck="false" />            
                      <label htmlFor="inputWiki" className="active">Web link</label>
                  </div>
              </div>
              <div>
                <label>
                  <input id="chkBoxTechnical" type="checkbox" onChange={e => setIsTechnical(e.target.checked)} />
                  <span>Technical</span>
                </label>
              </div>
              
              <br />
    
              <div className="row">
                  <button type="button" onClick={handleSubmit} className="btn">{ editMode ? 'Edit term' : 'Add term'}</button>
                  <div className="margin-top hide feedback js-saved">Term saved</div>
              </div>
            </form>
          )
        };
      
        ReactDOM.render(<TermForm taxa={taxa} branches={branches} />, document.querySelector('.js-term-form'));

        const chkBoxAddToCollection = document.querySelector('#chk-box-add-to-collection');

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

        const addToCollection = docRef => {
            if(collection) {
                collection.terms.push(docRef.id);
                firestore.updateCollection(collection).then(response => {

                });
            }
        };

        let collection = window.snapdragon.collection;

        if(collection) {
            setTimeout(() => {
                chkBoxAddToCollection.checked = true;
                inputCollection.value = collection.name;
            }, 250);
        }

        const inputCollection = document.querySelector('#input-collection');
        collectionPicker(inputCollection, async selectedCollection => {
            collection = selectedCollection;
            chkBoxAddToCollection.checked = true;
        });
    };

    init();
};