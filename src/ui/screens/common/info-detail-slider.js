import { renderTemplate } from 'ui/helpers/templating';

import detailsTemplate from 'ui/screens/common/info-detail-slider-template.html';

export const renderInfoDetails = detail => {

    const parent = document.querySelector('.js-info-details');
          parent.innerHTML = '';

    const details = document.createElement('template');

    const cardList = document.querySelector('.js-relationship-card-list');
    
    if(detail) {
        cardList.parentElement.classList.add('hide-important');
        parent.classList.remove('hide-important');

        details.innerHTML = detailsTemplate;
        detail.imgClassName = detail.img ? detail.img.url === '' ? 'hide-important' : '' : 'hide-important';
        detail.img = detail.img || { url: '' }; 
    } else {        
        cardList.parentElement.classList.remove('hide-important');
        parent.classList.add('hide-important');
        
        details.innerHTML = '';
    }

    renderTemplate({ detail }, details.content, parent);
};