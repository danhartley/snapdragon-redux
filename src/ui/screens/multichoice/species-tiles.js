import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { itemProperties } from 'ui/helpers/data-checking';
import html from 'ui/screens/multichoice/species-tiles-template.html';
import speciesCard from 'ui/screens/cards/species-card-template.html';
import questionCard from 'ui/screens/common/question-template.html';

export const renderSpeciesTiles = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config, lessonPlan } = store.getState();

    const screen = layout.screens.find(el => el.name === 'species-images');
    
    if(!screen) return;

    const template = document.createElement('template');
    
    template.innerHTML = html;
    
    let parent = DOM.rightBody;
    parent.innerHTML = '';

    let images = R.take(3, item.multipleImages.filter(image => image.name !== item.name));
    images.push(R.take(3, item.multipleImages.filter(image => image.name === item.name))[0]);    
    images = utils.shuffleArray(images.map(image => { 
        return { src: image.images[Math.floor(Math.random() * image.images.length)], answer: image.name  };
    }));

    renderTemplate({ images }, template.content, parent);

    const score = { items: document.querySelectorAll('.js-tiles .tile'), taxon: item, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount};
    
    if(config.isPortraitMode) {

        parent = document.querySelector('.snapdragon-container');

        const species = item.name;
        const name = itemProperties.vernacularName(item, config);
        template.innerHTML = speciesCard;
        renderTemplate( { species, name, filter: '' }, template.content, parent);
        template.innerHTML = questionCard;
        const question = screen.question;
        renderTemplate( { question }, template.content, parent);
        const renderAnswer = (text, colour, correct) => {
            const answer = document.querySelector('.js-answer');
            answer.innerHTML = correct ? 'Correct' : 'Incorrect';
            answer.style.display = 'block';            
            answer.classList.add(colour);
            document.querySelector('.js-question').style.display = 'none';
        }   

        const callback = renderAnswer;
        scoreHandler('image', score, callback, config.callbackTime, config.isPortraitMode);
    } else {        
        const callback = null;
        scoreHandler('image', score, callback, config.callbackTime, config.isPortraitMode);
    };

    document.querySelectorAll('.tile span').forEach(img=>{
        img.addEventListener('click', event => {        
            const name = event.target.parentElement.dataset.name || event.target.parentElement.parentElement.dataset.name;
            const src = event.target.parentElement.dataset.src || event.target.parentElement.parentElement.dataset.src;
            DOM.modalImageTitle.innerHTML = name;
            const style = `background-image: url(https://media.eol.org/content/${src}); background-size: cover;  background-position: center;`;
            DOM.modalImage.style = style;
        });
    });
};