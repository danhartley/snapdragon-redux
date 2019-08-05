import "babel-polyfill";

import 'admin/css/admin.css';

import { initMaterialize } from 'admin/scripts/materialize';
import { speciesHandler } from 'admin/screens/species-handler';
import { traitsHandler } from 'admin/screens/traits-handler';

const auth = firebase.auth();
const global = {};

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
 
const removeSpeciesClickHandler = e => {
    speciesHandler.updateSpeciesPicker();
};

const addTraitsClickHandler = e => {
  traitsHandler.addTraits();
};
      
const updateSpeciesPicker = document.querySelector('#update-species');
      updateSpeciesPicker.addEventListener('click', removeSpeciesClickHandler);
  
const addTraits = document.querySelector('#add-traits');
      addTraits.addEventListener('click', addTraitsClickHandler);

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach(item => item.classList.remove('hide'));
    loggedOutLinks.forEach(item => item.classList.add('hide'));
    addSpecies.click();
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