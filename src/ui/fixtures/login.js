import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';

import loginTemplate from 'ui/fixtures/login-template.html';
import logoutTemplate from 'ui/fixtures/logout-template.html';

import firebase from 'firebase/app';
import 'firebase/auth';

export const renderLogin = user => {

  const init = () => {

    document.querySelector('#basicModal .js-modal-text').innerHTML = '';

    const template = document.createElement('template');
        
    if(user) {

        template.innerHTML = logoutTemplate

        renderTemplate({ email: user.email }, template.content, document.querySelector('#basicModal .js-modal-text'));

        document.querySelector('#basicModal .js-modal-text-title header').innerHTML = 'Snapdragon logout';

        const footer = document.querySelector('.js-modal-footer');

        const auth = firebase.auth();

        setTimeout(() => {
            
            const form = document.querySelector('#logout-form');
                  form.addEventListener('submit', e => {

                e.preventDefault();

                const logOut = document.querySelector('#js-logout-btn');
                      logOut.setAttribute('disabled', 'disabled');

                  auth.signOut()
                  .then(() => {
                    actions.boundUpdateUser(null);
                    logOut.innerHTML = 'Success';
                    setTimeout(() => {
                        footer.click();
                    }, 2500);
                  });
          });

        }, 500);


    } else {

        template.innerHTML = loginTemplate;

        renderTemplate({ }, template.content, document.querySelector('#basicModal .js-modal-text'));

        document.querySelector('#basicModal .js-modal-text-title header').innerHTML = 'Snapdragon login';

        const footer = document.querySelector('.js-modal-footer');

        const auth = firebase.auth();

        setTimeout(() => {

            const email = document.querySelector('#login-email');
                  email.focus();
            
            const password = document.querySelector('#login-password');   

            const form = document.querySelector('#login-form');
                  form.addEventListener('submit', e => {

                    e.preventDefault();

                    const logIn = document.querySelector('#js-login-btn');
                          logIn.setAttribute('disabled', 'disabled');              
                    
                    auth.signInWithEmailAndPassword(email.value, password.value)
                    .then((credentials) => {
                        actions.boundUpdateUser({
                            email: email.value,
                            password: password.value
                        });
                        logIn.innerHTML = 'Success';
                        setTimeout(() => {
                            footer.click();
                        }, 2500);
                    })
                    .catch( error => {
                        const notLoggedIn = document.querySelector('.js-not-logged-in');
                              if(notLoggedIn) notLoggedIn.classList.remove('hide-important');
                              if(notLoggedIn) notLoggedIn.querySelector('.js-message').innerHTML = error.message;
                    });
                });

        }, 500);

    }
  };

  init();
};

export const renderLoggedIn = user => {

    if(user) {
        const loggedIn = document.querySelector('.js-logged-in');
        if(loggedIn) loggedIn.classList.remove('hide-important');
    } else {
        const notLoggedIn = document.querySelector('.js-not-logged-in');
        if(notLoggedIn) notLoggedIn.classList.remove('hide-important');
        const loggedOut = document.querySelector('.js-logged-out');
        if(loggedOut) loggedOut.classList.remove('hide-important');
    }
};