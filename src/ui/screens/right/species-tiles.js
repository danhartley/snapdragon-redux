import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import html from 'ui/screens/right/species-tiles-template.html';
import speciesCard from 'ui/screens/common/species-card-template.html';
import questionCard from 'ui/screens/common/species-question-template.html';

export const renderSpeciesTiles = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-images')[0];
    
    if(!screen) return;

    const template = document.createElement('template');
    
    template.innerHTML = html;
    
    screen.parent.innerHTML = '';

    let images = R.take(3, item.multipleImages.filter(image => image.name !== item.name));
    images.push(R.take(3, item.multipleImages.filter(image => image.name === item.name))[0]);    
    images = utils.shuffleArray(images.map(image => { 
        return { src: image.images[Math.floor(Math.random() * image.images.length)], answer: image.name  };
    }));

    renderTemplate({ images }, template.content, screen.parent);
    
    if(config.isPortraitMode) {
        const species = item.name;
        const name = item.names.filter(name => name.language === config.language)[0].vernacularName;
        template.innerHTML = speciesCard;
        renderTemplate( { species, name, filter: '' }, template.content, screen.parent);
        template.innerHTML = questionCard;
        const question = screen.question;
        renderTemplate( { question }, template.content, screen.parent);
        const renderAnswer = (text, colour, correct) => {
            const answer = document.querySelector('.js-species-answer div');
            answer.innerHTML = correct ? 'Correct' : 'Incorrect';
            answer.parentElement.style.display = 'block';
            answer.style.backgroundColor = colour;
        }   
        scoreHandler(document.querySelectorAll('.js-tiles .tile'), item, config, 'image', renderAnswer);
    } else {
        scoreHandler(document.querySelectorAll('.js-tiles .tile'), item, config, 'image');
    };

    document.querySelectorAll('.tile span').forEach(img=>{
        img.addEventListener('click', event => {        
            const name = event.target.parentElement.dataset.name || event.target.parentElement.parentElement.dataset.name;
            const src = event.target.parentElement.dataset.src || event.target.parentElement.parentElement.dataset.src;
            DOM.modalText.innerHTML = '';
            DOM.modalTitle.innerHTML = name;
            DOM.modalImageContainer.style.display = 'block';
            DOM.modalImage.src = src;
        });
    });
};