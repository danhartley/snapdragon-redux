// import { DOM } from 'ui/dom';
// import { actions } from 'redux/actions/action-creators';
// import { renderAnswerHeader, addListeners } from 'ui/helpers/helpers-for-screens';

// export const renderCards = (screen, item, callback) => {

//     const template = document.querySelector(`.${screen.template}`);

//     const rptrRectangles = template.content.querySelector('.js-rptr-rectangles');
                    
//     rptrRectangles.innerHTML = item.content.map(callback).join('');

//     const clone = document.importNode(template.content, true);
//     const cards = clone.querySelectorAll('.js-rptr-rectangles .rectangle .answer button');

//     addListeners(cards, item);

//     screen.parent.innerHTML = '';
//     screen.parent.appendChild(clone);
// };
