import { renderTemplate } from 'ui/helpers/templating';

import createDescriptionTemplate from 'admin/screens/video/create-video-description-template.html';
import { firestore } from 'api/firebase/firestore';

export const createVideoDescription = (collection, species) => {

    const init = async () => {

        const template = document.createElement('template');
              template.innerHTML = createDescriptionTemplate;

        const parent = document.querySelector('#js-collection-options');
              parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        const item = collection.species.find(s => s.name === species.name);

        const inputName = document.querySelector('#input-name');
              inputName.value = species.name;

        const inputDescription = document.querySelector('#input-description');
              inputDescription.value = item.description ? item.description : '';

        const inputTime = document.querySelector('#input-time');
              inputTime.value = item.time ? item.time.join(',') : '';

              setTimeout(() => {
                  inputTime.focus();
              }, 250);

        let isTagMode = false;    

        const chkBoxTag = document.querySelector('#chk-box-tag');
              chkBoxTag.addEventListener('change', e => {
                isTagMode = e.target.checked;
                inputName.parentNode.children[1].innerHTML = isTagMode ? 'Tag' : 'Name';
                if(isTagMode) {
                  inputName.value = '';
                  inputName.focus();
                  inputTime.value = '';
                  inputDescription.value = '';
                }           
              });

        const btnCreateDescription = document.querySelector('.btnCreateDescription');
              btnCreateDescription.addEventListener('click', async e => {

                  if(isTagMode) {
                        const note = {
                              tag: inputName.value.trim(),
                              time: inputTime.value,
                              description: inputDescription.value
                        };
                        collection.notes = collection.notes || [];
                        collection.notes = [ ...collection.notes.filter(n => n.tag !== note.tag), note ];
                  } else {
                        species.description = inputDescription.value;
                        species.time = inputTime.value.trim().split(',').map(t => parseInt(t));
                        collection.species = [ ...collection.species.filter(s => s.name !== species.name ), species ];
                  }

                  const response = await firestore.updateCollection(collection);

                  addOrUpateMessage.classList.remove('hide');
                  setTimeout(() => {
                      addOrUpateMessage.classList.add('hide');
                  }, 5000);

              });

        const addOrUpateMessage = document.querySelector('.js-add-video-message');

        btnCreateDescription.innerHTML = !!item.description ? 'Update video description' : 'Add video description';
        addOrUpateMessage.innerText = !!item.description ? 'Video description updated!' : 'Video description added!';
        
    };

    init();
};