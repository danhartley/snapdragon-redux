import "babel-polyfill";

import 'admin/scss/materialize.scss';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ui/css/snapdragon-colours.css';

import 'admin/css/admin.css';
import 'ui/css/common.css';

import { listenForActiveSpecies } from 'admin/screens/taxa-pickers';
import { initMaterialize } from 'admin/scripts/materialize';
import { speciesHandler } from 'admin/screens/species/species-handler';
import { traitsHandler } from 'admin/screens/traits-handler';
import { addRelationship } from 'admin/screens/species/add-relationship';
import { addLookalike } from 'admin/screens/species/add-lookalike';
import { addPhotos } from 'admin/screens/species/add-photos';
import { addTaxon } from 'admin/screens/add-taxon';
import { addId } from 'admin/screens/species/add-id';
import { editCollection } from 'admin/screens/collection/edit-collection';
import { editCollectionTerms } from 'admin/screens/collection/edit-collection-terms';
import { createQuestion } from 'admin/screens/questions/create-question';
import { addTerm } from 'admin/screens/add-term';

const auth = firebase.auth();

window.snapdragon = {};

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user);
    } else {
        console.log('logged out');
    }
    setupUI(user);
});

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const links = document.querySelectorAll('li');
      links.forEach(link => {
        link.addEventListener('click', e => {
          links.forEach(li => li.classList.remove('active'));
          e.target.parentElement.classList.add('active');
        });
      });

const addSpecies = document.querySelector('#add-species');
      addSpecies.addEventListener('click', speciesHandler.addSpecies);
 
const updateSpeciesClickHandler = e => {
    speciesHandler.updateSpecies();
};

const updateSpeciesNamesClickHandler = e => {
  speciesHandler.updateSpeciesNames();
};

const addTraitsClickHandler = e => {
  traitsHandler.addTraits();
};

const activeSpecies = document.querySelector('.js-active-species');

const actions = document.querySelectorAll('li a');
      actions.forEach(action => action.addEventListener('click', e => {

            activeSpecies.classList.remove('hide');

            const hideActiveSpecies = e.target.id === 'add-species' || e.target.id === 'add-taxon';

            if(hideActiveSpecies) {
                  activeSpecies.querySelector('span:nth-child(2)').innerHTML = 'N/A';
            }
            else {
                  activeSpecies.querySelector('span:nth-child(2)').innerHTML = window.snapdragon.species ? window.snapdragon.species.name : '';
            }
      }));
      
const updateSpecies = document.querySelector('#update-species');
      updateSpecies.addEventListener('click', updateSpeciesClickHandler);
      
const updateNames = document.querySelector('#update-names');
      updateNames.addEventListener('click', updateSpeciesNamesClickHandler);
  
const addTraits = document.querySelector('#add-traits');
      addTraits.addEventListener('click', addTraitsClickHandler);

const addRelationshipParent = document.querySelector('#add-relationship');
      addRelationshipParent.addEventListener('click', addRelationship);

const addLookalikeParent = document.querySelector('#add-lookalike');
      addLookalikeParent.addEventListener('click', addLookalike);

const addPhotosTab = document.querySelector('#add-photos');
      addPhotosTab.addEventListener('click', addPhotos);

const addTaxonTab = document.querySelector('#add-taxon');
      addTaxonTab.addEventListener('click', addTaxon);

const addIdTab = document.querySelector('#add-id');
      addIdTab.addEventListener('click', addId);

const editCollectionTab = document.querySelector('#edit-collection');
      editCollectionTab.addEventListener('click', editCollection);

const editCollectionTermsTab = document.querySelector('#edit-collection-terms');
      editCollectionTermsTab.addEventListener('click', editCollectionTerms);

const createQuestionTab = document.querySelector('#create-question');
      createQuestionTab.addEventListener('click', createQuestion);

const addTermTab = document.querySelector('#add-term');
      addTermTab.addEventListener('click', addTerm);

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach(item => item.classList.remove('hide'));
    loggedOutLinks.forEach(item => item.classList.add('hide'));
      addTermTab.click();
} else {    
    loggedInLinks.forEach(item => item.classList.add('hide'));
    loggedOutLinks.forEach(item => item.classList.remove('hide'));
  }
};

const loginForm = document.querySelector('#login-form');
      loginForm.addEventListener('submit', (e) => {
            
            e.preventDefault();
            
            const email = loginForm['login-email'].value;
            const password = loginForm['login-password'].value;

            auth.signInWithEmailAndPassword(email, password).then((cred) => {
                  const modal = document.querySelector('#modal-login');
                  M.Modal.getInstance(modal).close();
                  loginForm.reset();
            });
      });

const logout = document.querySelector('#logout');
      logout.addEventListener('click', (e) => {
            e.preventDefault();
            auth.signOut();
      });

initMaterialize();

listenForActiveSpecies(species => {
  activeSpecies.querySelectorAll('span:nth-child(2)').innerHTML = species.name;
  window.snapdragon.species = species;
});

var elems = document.querySelectorAll('.dropdown-trigger');
if(elems) M.Dropdown.init(elems, {});