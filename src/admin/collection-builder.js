import "babel-polyfill";

import { initMaterialize } from 'admin/scripts/materialize';
import { addSpecies } from 'admin/screens/add-species';

const auth = firebase.auth();

addSpecies(document);

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

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach(item => item.classList.remove('hide'));
    loggedOutLinks.forEach(item => item.classList.add('hide'));
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

document.addEventListener("DOMContentLoaded", function() {

    document.querySelectorAll('#admin-menu li').forEach(action => {
        action.addEventListener('click', event => {

            document.getElementById('admin-menu').classList.add('hide');

            switch(event.target.id) {
                case 'speciesAdd': 
                    document.getElementById('species-add').classList.remove('hide');
                    break;
                case 'traitAdd': 
                    document.getElementById('trait-add').classList.remove('hide');
                    break;
            }
        });
    });
});