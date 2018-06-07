import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { scoreHandler } from 'ui/helpers/handlers';
import { renderTemplate } from 'ui/helpers/templating';
import html from 'ui/screens/right/species-tiles-template.html';
import speciesCard from 'ui/screens/common/species-card-template.html';
import questionCard from 'ui/screens/common/species-question-template.html';

export const renderSpeciesTiles = (collection) => {

    DOM.leftBody.style.display = 'block';

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    
    document.querySelector('progress').value = layout.layoutIndex - 2;
    
    const screen = layout.screens.filter(el => el.name === 'species-images')[0];
    
    if(!screen) return;

    setTimeout(()=>{
        config.isPortraitMode 
            ? DOM.collectionTxt.innerHTML = `Question ${ layout.layoutIndex - 1 }`
            : DOM.rightHeaderText.innerHTML = screen.headers ? screen.headers.long : 'no long header given';
    });

    const template = document.createElement('template');
    
    template.innerHTML = html;
    
    screen.parent.innerHTML = '';
    
    const imagesRequired = config.isPortraitMode ? 3 : 3;

    let images = R.take(imagesRequired, item.multipleImages.filter(image => image.name !== item.name));
    images.push(R.take(imagesRequired, item.multipleImages.filter(image => image.name === item.name))[0]);    
    images = images.map(image => { 
        return { src: image.images[0], answer: image.name  };
    });

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
    }
};