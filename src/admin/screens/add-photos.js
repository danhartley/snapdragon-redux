import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/species-picker';
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

            const smallPhotos = photos.map(photo => {
                return { ...photo, url: photo.url.replace('medium', 'small') };                
            });

            const parent = document.getElementById('photosGallery');
  
            template.innerHTML = addphotosGalleryTemplate;

            const context = { photos: smallPhotos };

            renderTemplate(context, template.content, parent);

            document.querySelectorAll('img').forEach(img => {
                img.addEventListener('click', e => {
                    console.log(e.target);
                });
            });
        };

        speciesPicker(input, async () => {
            const name = input.value;
            const photos = await inat.getTaxonDataIncPhotos(name);
            renderPhotos(photos);
        });

    };

    init();
};