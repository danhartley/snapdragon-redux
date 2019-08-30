import "babel-polyfill";

import 'admin/css/admin.css';

import { listenForActiveSpecies } from 'admin/screens/taxa-pickers';
import { initMaterialize } from 'admin/scripts/materialize';
import { speciesHandler } from 'admin/screens/species-handler';
import { traitsHandler } from 'admin/screens/traits-handler';
import { addRelationship } from 'admin/screens/add-relationship';
import { addLookalike } from 'admin/screens/add-lookalike';
import { addPhotos } from 'admin/screens/add-photos';
import { addTaxon } from 'admin/screens/add-taxon';

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

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach(item => item.classList.remove('hide'));
    loggedOutLinks.forEach(item => item.classList.add('hide'));
    addTraits.click();
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
  
  const activeSpecies = document.querySelector('.js-active-species > span:nth-child(2)');
        activeSpecies.innerHTML = species.name;

  window.snapdragon.species = species;
});