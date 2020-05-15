import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';

import createDescriptionTemplate from 'admin/screens/video/create-video-description-template.html';
import notesTemplate from 'admin/screens/video/create-video-notes-template.html';

export const createVideoDescription = (collection, species) => {

    const init = async () => {

      const template = document.createElement('template');
            template.innerHTML = createDescriptionTemplate;

      let parent = document.querySelector('#js-collection-options');
          parent.innerHTML = '';

      renderTemplate({}, template.content, parent);

      const inputName = document.querySelector('#input-name');
      const inputDescription = document.querySelector('#input-description');
      const inputTime = document.querySelector('#input-time');
      const chkBoxTag = document.querySelector('#chk-box-tag');

      let item;

      if(species) {      
            item = collection.species.find(s => s.name === species.name);
            inputName.value = species.name;
            inputDescription.value = item.description ? item.description : '';
            inputTime.value = item.time ? item.time.join(',') : '';
      } else {
            chkBoxTag.click();
      }

      setTimeout(() => {
      inputTime.focus();
      }, 250);

      let isTagMode = false, isEditTagMode = false, activeTag;
      let tagsContainer = document.querySelector('.js-tags');
      
      chkBoxTag.addEventListener('change', e => {

            isTagMode = e.target.checked;
            inputName.parentNode.children[1].innerHTML = isTagMode ? 'Tag' : 'Name';
            if(isTagMode) {
            inputName.value = '';
            inputName.focus();
            inputTime.value = '';
            inputDescription.value = '';
            
            template.innerHTML = notesTemplate;

            tagsContainer.innerHTML = '';

            renderTemplate({ notes: collection.notes }, template.content, tagsContainer);

            const notes = document.querySelectorAll('.js-tags li');
                  notes.forEach(note => {
                        note.addEventListener('click', e => {
                              activeTag = collection.notes.find(note => note.tag === e.target.id);
                              inputDescription.value = activeTag.description;
                              isEditTagMode = true;
                              calcTextProperties(inputDescription);
                        });
                  });
            } else {
                  tagsContainer.innerHTML = '';
            }
            });

      const btnCreateDescription = document.querySelector('.btnCreateDescription');
            btnCreateDescription.addEventListener('click', async e => {

            if(isTagMode) {

                  let note;

                  if(isEditTagMode) {
                        note = { ...activeTag, description: inputDescription.value }; 
                        collection.notes = [ ...collection.notes.filter(n => n.tag !== note.tag), note ];
                  } else {
                        note = {
                              tag: inputName.value.trim(),
                              time: inputTime.value,
                              description: inputDescription.value
                        };
                        collection.notes = collection.notes || [];
                        collection.notes = [ ...collection.notes.filter(n => n.tag !== note.tag), note ];
                  }
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

      inputDescription.addEventListener('keyup', e => {
            calcTextProperties(inputDescription);
      });

      calcTextProperties(inputDescription);
        
    };

    init();
};

const calcTextProperties = inputDescription => {
      const count = inputDescription.value.length;
      const duration = Math.floor(count / 12);
      const display = document.querySelector('.js-audio-metrics');
      const seconds = Math.floor(duration % 60);
      const minutes = (duration-seconds) / 60;
      display.innerHTML = `count: ${count}; duration: ${minutes}:${seconds}`;
}
