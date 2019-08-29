import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/taxa-pickers';
import { inat } from 'admin/api/inat';

import addPhotosTemplate from 'admin/screens/add-photos.html';
import addphotosGalleryTemplate from 'admin/screens/add-photos-gallery.html';

export const addPhotos = () => {

    const init = async () => {

        let item = window.snapdragon.species;

        const template = document.createElement('template');
              template.innerHTML = addPhotosTemplate;
    
        const parent = document.querySelector('#content-container');
              parent.innerHTML = '';
    
        renderTemplate({}, template.content, parent);

        const input = document.querySelector('#input-species-to-update');
              input.focus();

        const renderPhotos = photos => {

            const smallPhotos = photos.map((photo, index) => {
                return { ...photo, url: photo.url.replace('medium', 'small'), index };       
            });

            const parent = document.getElementById('photosGallery');
  
            template.innerHTML = addphotosGalleryTemplate;

            const context = { photos: smallPhotos };

            renderTemplate(context, template.content, parent);

            const photoIds = [];

            const btnAddAllPhotos = document.querySelector('.btnAddAllPhotos');
            const btnAddSelectedPhotos = document.querySelector('.btnAddSelectedPhotos');

            document.querySelectorAll('img').forEach(img => {
                img.addEventListener('click', e => {

                    const image = event.target;
                    const imageId = parseInt(event.target.id);
                    const index = photoIds.indexOf(imageId);
                    if (index > -1) {
                        image.style.filter = 'saturate(100%)';
                        image.style.opacity = 1;
                        photoIds.splice(index, 1);
                    } else {
                        image.style.filter = 'saturate(10%)';
                        image.style.opacity = .3;
                        photoIds.push(imageId);
                    }

                    photoIds.length > 0
                        ? btnAddSelectedPhotos.classList.remove('hide')
                        : btnAddSelectedPhotos.classList.add('hide')

                });
            });

            btnAddAllPhotos.addEventListener('click', e => {
                const name = input.value;
                addPhotosToSpecies(name, photos);
            });

            btnAddSelectedPhotos.addEventListener('click', e => {
                const selectedPhotos = [];
                photos.forEach((photo,index) => {
                    photoIds.forEach(id => {
                        if(index === id) {
                            selectedPhotos.push(photo);
                        }
                    });
                });
                const name = input.value;
                addPhotosToSpecies(name, selectedPhotos);
            });
        };

        speciesPicker(input, async () => {
            const name = input.value;
            const photos = await inat.getTaxonDataIncPhotos(name);
            renderPhotos(photos);
        });

        const addPhotosToSpecies = async (name, photos) => {
            const response = await firestore.addPhotos(name, photos);
            console.log(response);
        };

    };

    init();
};