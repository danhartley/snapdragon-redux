import { renderTemplate } from 'ui/helpers/templating';
import cardSliderTemplate from 'ui/screens/common/card-slider-template.html';
import { renderCard } from 'ui/screens/cards/card';

export const cardSlider = (collection, item) => {

    const slider = document.createElement('template');

    const parent = document.querySelector('#cardSlider .js-card');
    
    // renderTemplate({}, template.content)

    renderCard(collection, false, item, parent);
        
    parent.querySelectorAll('.carousel-item').forEach(i => {
        console.log(i);
    });

    // document.querySelector('#cardSlider .carousel-control-prev').addEventListener('click', carouselControlHandler);
    // document.querySelector('#cardSlider .carousel-control-next').addEventListener('click', carouselControlHandler);
};
