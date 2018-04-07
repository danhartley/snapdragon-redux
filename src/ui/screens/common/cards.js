import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader, addListeners } from 'ui/helpers/helpers-for-screens';

export const renderCards = (screen, item, callback) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrRectangles = template.content.querySelector('.js-rptr-rectangles');
                    
    rptrRectangles.innerHTML = item.content.map(callback).join('');

    const clone = document.importNode(template.content, true);
    const cards = clone.querySelectorAll('.js-rptr-rectangles .rectangle .answer button');

    addListeners(cards, item);

    // cards.forEach(choice => {

    //     choice.addEventListener('click', event => {
            
    //         const target = event.target;
    //         const answer = target.innerText;
    //         const vernacular = target.dataset.vernacular;

    //         const score = { taxon: 'binomial', binomial: item.name, vernacular: vernacular, question: item.name, answer: answer };
    //         const { text, colour, correct } = renderAnswerHeader(score);

    //         DOM.headerTxt.innerHTML = text;
    //         DOM.rightHeader.style.backgroundColor = colour;

    //         target.style.color = colour;
    //         target.parentNode.style.background = colour;

    //         if(!correct) {
    //             cards.forEach(card => {
    //                 if(card.innerText === item.name) {
    //                     card.parentNode.style.background = 'rgb(44, 141, 86)';
    //                 }
    //             });
    //         }

    //         setTimeout(()=>{
    //             actions.boundMarkAnswer(score);
    //         },2000);            
    //     });
    // });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);
};
