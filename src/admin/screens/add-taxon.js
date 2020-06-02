import autocomplete from 'autocompleter';

import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';

import addTaxonTemplate from 'admin/screens/add-taxon-template.html';

export const addTaxon = () => {

    const init = async () => {
    
      const template = document.createElement('template');
            template.innerHTML = addTaxonTemplate;

      const parent = document.querySelector('#content-container');
            parent.innerHTML = '';

      renderTemplate({}, template.content, parent);

      M.updateTextFields();

      const inputTaxonRank = document.querySelector('#input-taxon-rank');
            inputTaxonRank.focus();

      const options = [
          {label:'class', value:'class'},
          {label:'order', value:'order'},
          {label:'family', value:'family'},
          {label:'genus', value:'genus'}
      ];
  
      autocomplete({
          input: inputTaxonRank,
          fetch: function(text, update) {
              text = text.toLowerCase();
              const suggestions = options.filter(n => n.value.toLowerCase().startsWith(text))
              update(suggestions);
          },
          onSelect: function(item) {
              inputTaxonRank.value = item.label;
          },
          minLength: 0,
          debounceWaitMs: 200,
          className: 'autocomplete-options-container'
      });

      const taxonLatinName = document.querySelector('#input-taxon-latin-name');
      const taxonVernacularName = document.querySelector('#input-taxon-vernacular-name');
      const generaCount = document.querySelector('#input-genera-count');
      const speciesCount = document.querySelector('#input-species-count');
      const taxonSummary = document.querySelector('#input-taxon-summary');
      const taxonIdentification = document.querySelector('#input-taxon-identification');
      
      
      const btnAddTaxon = document.querySelector('.btnAddTaxon');

      btnAddTaxon.addEventListener('click', e => {

          const rank = inputTaxonRank.value;
          const name = taxonLatinName.value;
          const vernacularNames = [ taxonVernacularName.value ];
          const names = [
              {
                  language: 'en',
                  names: vernacularNames
              }
          ];            
          const summary = taxonSummary.value;
          const identification = taxonIdentification.value;
          
          // const descriptions = [
          //     {
          //         language: 'en',
          //         summary,
          //         identification
          //     }
          // ];

          const taxon = {
              taxon: rank,
              name,
              names,
              summary,
              identification
          }


          const genera = generaCount.value;
          const species = speciesCount.value;

          if(genera) taxon.genera = genera;
          if(species) taxon.species = species;

          const savedText = document.querySelector('.js-saved');

          const response = firestore.addTaxon({ taxon });

          savedText.innerHTML = response;
          savedText.classList.remove('hide');

      });
  };

    init();
};