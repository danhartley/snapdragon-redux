import * as R from 'ramda';

import { eol } from 'admin/api/eol';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/taxa-pickers';
import { inat } from 'admin/api/inat';

import addPhotosTemplate from 'admin/screens/add-photos.html';
import addphotosGalleryTemplate from 'admin/screens/add-photos-gallery.html';

export const addPhotos = () => {

    const inatPrefix = 'https://static.inaturalist.org/photos/';
    const eolPrefix = 'https://content.eol.org/data/media/';

    const init = async () => {
        
        let item = window.snapdragon.species;

        const template = document.createElement('template');
              template.innerHTML = addPhotosTemplate;
    
        const parent = document.querySelector('#content-container');
              parent.innerHTML = '';
    
        renderTemplate({}, template.content, parent);

        const input = document.querySelector('#input-species-to-update');
              input.focus();

        const sources = document.querySelectorAll('.source');

        let source = document.querySelector('input:checked').id;

        sources.forEach(option => {
            option.addEventListener('click', e => {
                source = e.currentTarget.id;
                console.log('source: ', source);
                input.focus();
                const parent = document.getElementById('photosGallery');
                      parent.innerHTML = '';
            });
        });

        const renderPhotos = (photos, item) => {

            const currentPhotoUrls = item.images.map(image => image.url);

            const parent = document.getElementById('photosGallery');
  
            template.innerHTML = addphotosGalleryTemplate;

            const context = { photos };

            renderTemplate(context, template.content, parent);

            document.querySelectorAll('img').forEach(image => {
                const url = image.src.replace(inatPrefix, '').replace(eolPrefix, '').replace('260x190.jpg', 'jpg');
                if(R.contains(url, currentPhotoUrls)) {
                    image.style.filter = 'saturate(10%)';
                    image.style.opacity = .3;
                }
            });

            const photoIds = [];

            const btnAddAllPhotos = document.querySelector('.btnAddAllPhotos');
            const btnAddSelectedPhotos = document.querySelector('.btnAddSelectedPhotos');

            if(photos.length === 0) {
                btnAddAllPhotos.classList.add('hide');
                document.querySelector('.noPhotos').innerHTML = 'No matching photos.'
            }

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

        speciesPicker(input, async species => {
            const name = input.value;
            const photos = await loadPhotos(source, renderPhotos, species, name);
        });

        const addPhotosToSpecies = async (name, photos) => {            
            photos.forEach(photo => {                
                photo.provider === 'inat' 
                    ? photo.url = photo.url.replace(inatPrefix, '')
                    : photo.url = photo.url.replace(eolPrefix, '');
                
                photo.url = photo.url.replace('.260x190.jpg', '.jpg');

                photo.photographer = photo.photographer || '';
                
                delete photo.index;
                
            });
            console.log(photos);
            const response = await firestore.addPhotos(name, photos);
            console.log(response);
            const parent = document.getElementById('photosGallery');
                  parent.innerHTML = '';
        };
        
        if(item) {
            loadPhotos(source, renderPhotos, item, item.name);
        }

    };

    init();
};

async function loadPhotos(source, renderPhotos, species, name) {
    let photos;
    switch (source) {
        case 'inat':
            photos = await inat.getTaxonDataIncPhotos(name);
            photos = photos.map((photo, index) => {
                return { ...photo, url: photo.url.replace('medium', 'small'), index, provider: 'inat' };
            });
            console.log('inat photos: ', photos);
            renderPhotos(photos, species);
            break;
        case 'eol':
            photos = await eol.getSpeciesPhotos(species.eolId, 'pd|cc-by|cc-by-sa|cc-by-nd');
            photos = photos.map((photo, index) => {
                return { ...photo, index, provider: 'eol', url: photo.url.replace('.jpg', '.260x190.jpg') };
            });
            console.log('inat photos: ', photos);
            renderPhotos(photos, species);
            break;
    }
    return photos;
}
