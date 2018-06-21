import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { itemVernacularName } from 'ui/helpers/data-checking';
import html from 'ui/screens/right/species-tiles-template.html';
import speciesCard from 'ui/screens/common/species-card-template.html';
import questionCard from 'ui/screens/common/species-question-template.html';

export const renderSpeciesTiles = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    const screen = layout.screens.find(el => el.name === 'species-images');
    
    if(!screen) return;

    const template = document.createElement('template');
    
    template.innerHTML = html;
    
    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;
    parent.innerHTML = '';

    let images = R.take(3, item.multipleImages.filter(image => image.name !== item.name));
    images.push(R.take(3, item.multipleImages.filter(image => image.name === item.name))[0]);    
    images = utils.shuffleArray(images.map(image => { 
        return { src: image.images[Math.floor(Math.random() * image.images.length)], answer: image.name  };
    }));

    renderTemplate({ images }, template.content, parent);
    
    if(config.isPortraitMode) {
        const species = item.name;
        const name = itemVernacularName(item, config);
        template.innerHTML = speciesCard;
        renderTemplate( { species, name, filter: '' }, template.content, parent);
        template.innerHTML = questionCard;
        const question = screen.question;
        renderTemplate( { question }, template.content, parent);
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
            DOM.modalImageTitle.innerHTML = name;
            const style = `background-image: url(${src}); background-size: cover;`;
            DOM.modalImage.style = style;
        });
    });
};