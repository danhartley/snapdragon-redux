import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader } from 'ui/helpers/helpers-for-screens';

export const renderTiles = (screen, item, callbackTemplate) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrTiles = template.content.querySelector('.js-tiles');

    rptrTiles.innerHTML = item.content.map(callbackTemplate).join('');

    const clone = document.importNode(template.content, true);
    const tiles = clone.querySelectorAll('.js-tiles .tile');

    tiles.forEach(tile => {
        
        tile.addEventListener('click', event => {

            const img = event.target;
            const answer = img.name;

            const response = { taxon: 'name', binomial: item.name, question: item.name, answer: answer};

            const { text, colour, correct } = renderAnswerHeader(response);

            img.style.opacity = .5;

            DOM.headerTxt.innerHTML = text;
            DOM.rightHeader.style.backgroundColor = colour;
            
            img.style.color = colour;
            img.parentNode.style.background = colour;

            if(!correct) {
                tiles.forEach(tile => {
                    if(tile.children[0].name === item.name) {
                        tile.children[0].style.background = 'rgb(44, 141, 86)';
                        tile.children[0].style.opacity = .5;
                    }
                });
            }

            setTimeout(()=>{
                const response = { taxon: 'name', binomial: item.name, question: item.name, answer: answer, success: correct };
                actions.boundMarkAnswer(response);
            },2000);            
        });
    });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);
}