import autocomplete from 'autocompleter';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { utils } from 'utils/utils';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';

import addTermTemplate from 'admin/screens/add-term-template.html';

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
        
        const TermForm = () => {

          let [ editMode, setEditMode ] = useState(false);
          let [ addTerm, setAddTerm ] = useState('');
          let [ editTerm, setEditTerm ] = useState('');
          let [ definition, setDefinition ] = useState('');
          let [ branch, setBranch ] = useState('');
          let [ taxon, setTaxon ] = useState('');
          let [ wiki, setWiki ] = useState('');
          let [ isTechnical, setIsTechnical ] = useState(false);

          const handleModeChange = e => {

            console.log('handleModeChange');

            const isEditMode = e.target.checked;
            isEditMode ? setEditTerm('') : setAddTerm('');
            setTimeout(() => {
              isEditMode ? inputEditTerm.focus() : inputAddTerm.focus();
            }, 500);
            setEditMode(isEditMode);
            setBranch('');
            setTaxon('');
            setDefinition('');
            setWiki('');
            setIsTechnical(false);
          };

          const savedText = document.querySelector('.js-saved'); // temp hack

          console.log('branch set in re-render, ', branch);

          const handleAddTerm = async event => {

            console.log('handleAddTerm');

            if(event.key === 'Tab') {    

              const input = event.target;

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

          const handleEditTerm = async event => {

            console.log('handleEditTerm');

              if(event.key === 'Enter') {

                const input = event.target;
                
                const definitions = await firestore.getDefinitionsWhere({
                    key: 'term',
                    operator: '==',
                    value: input.value
                });

                const term = definitions[0];

                setEditTerm(term.term);
                setDefinition(term.definition);
                setBranch(term.branch);
                setTaxon(term.taxon);
                setWiki(term.wiki);
                isTechnical = term.technical;

                console.log('branch set in edit handler, ', term.branch);
              }
          };

          const actionHandler = (e, input, message, action) => {

            const glossaryItem = {
                term: input.value,
                definition,
                taxon,
                branch,
                technical: isTechnical
            };

            if(e.target.elements.inputWiki.value.length > 0) glossaryItem.wiki = e.target.elements.inputWiki.value;

            firestore[action](glossaryItem).then(docRef => {
                savedText.innerHTML = message;
                savedText.classList.remove('hide');
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

            console.log('handleSubmit');

            const form = e.target;
            const elements = form.elements;

            // hack validation to prevent submission after accepting term to edit
            if(form.elements.inputDefinition.value.length === 0) return;

            elements.ckhBoxEdit.checked
              ? actionHandler(e, inputEditTerm, 'This term was updated successfully!', 'updateDefinition')
              : actionHandler(e, inputAddTerm, 'The new term was added successfully!', 'addDefinition');   
          };

          useEffect(() => {
              autocomplete({
                input: inputBranch,
                fetch: function(text, update) {
                    text = text.toLowerCase();
                    const suggestions = branches.filter(t => t.name.toLowerCase().startsWith(text))
                    update(suggestions);
                },
                onSelect: function(item) {
                  setBranch(item.label);
                  inputBranch.value = item.label;
                },
                minLength: 0,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
            });
          }, [branch]);

          useEffect(() => {
            autocomplete({
                input: inputTaxon,
                fetch: function(text, update) {
                    text = text.toLowerCase();
                    const suggestions = taxa.filter(t => t.name.toLowerCase().startsWith(text))
                    update(suggestions);
                },
                onSelect: function(item) {
                  setTaxon(item.label);
                  inputTaxon.value = item.label;
                },
                minLength: 0,
                debounceWaitMs: 200,
                className: 'autocomplete-options-container'
            });
          }, [taxon]);

          return (
            <form onSubmit={handleSubmit}>
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
                  <div className="input-field col s2">
                      <input id="inputEditTerm" onKeyPress={handleEditTerm} type="text" placeholder="Start typing term" spellCheck="false " />
                      <label htmlFor="inputEditTerm" className="active">Edit term</label>
                  </div>
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
                      <input id="inputTaxon" defaultValue={taxon} type="text" placeholder="Start typing taxon" spellCheck="false" />
                      <label htmlFor="inputTaxon" className="active">Taxon</label>
                  </div>
                  <div className="autocomplete-options-container hide-empty" id="snapdragon-taxon-autocomplete"></div>      
                  <div className="input-field col s2">
                      <input id="inputBranch" defaultValue={branch} type="text" placeholder="Start typing branch" spellCheck="false" />
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
                  <button type="submit" className="btn">{ editMode ? 'Edit term' : 'Add term'}</button>
                  <div className="margin-top hide feedback js-saved">Term saved</div>
              </div>
            </form>
          )
        }
      
        ReactDOM.render(<TermForm />, document.querySelector('.js-term-form'));  

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
                    console.log(response);
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