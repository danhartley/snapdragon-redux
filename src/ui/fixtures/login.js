import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';

import loginTemplate from 'ui/fixtures/login-template.html';
import logoutTemplate from 'ui/fixtures/logout-template.html';

export const renderLogin = user => {

    const auth = firebase.auth();
    
    DOM.modalText.innerHTML = '';

    const template = document.createElement('template');
        
    if(user) {

        template.innerHTML = logoutTemplate

        renderTemplate({ email: user.email }, template.content, DOM.modalText);

        DOM.modalTextTitle.innerHTML = 'Snapdragon logout';

        setTimeout(() => {
            
            const form = document.querySelector('#logout-form');
                  form.addEventListener('submit', e => {

                  e.preventDefault();
              
                  auth.signOut().then(() => {
                    actions.boundUpdateUser(null);
                  });
          });

        }, 1000);


    } else {

        template.innerHTML = loginTemplate;

        renderTemplate({ }, template.content, DOM.modalText);

        DOM.modalTextTitle.innerHTML = 'Snapdragon login';

        setTimeout(() => {

            const email = document.querySelector('#login-email');
                  email.focus();
            
            const password = document.querySelector('#login-password');   

            const form = document.querySelector('#login-form');
                  form.addEventListener('submit', e => {

                    e.preventDefault();
                    
                    auth.signInWithEmailAndPassword(email.value, password.value).then((credentials) => {
                        console.log('login credentials: ', credentials);
                        actions.boundUpdateUser({
                            email: email.value,
                            password: password.value
                        });
                    });
                });

        }, 1000);

    }
};