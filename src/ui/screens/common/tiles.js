import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const renderTiles = (screen, item, callbackTemplate, config) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrTiles = template.content.querySelector('.js-tiles');

    rptrTiles.innerHTML = item.content.map(callbackTemplate).join('');

    const clone = document.importNode(template.content, true);
    const tiles = clone.querySelectorAll('.js-tiles .tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', event => {

            const img = event.target;
            const answer = img.name;

            const response = { taxon: 'name', binomial: item.name, question: item.name, answer: answer };

            const { text, colour, correct } = renderAnswerHeader(response, config.isSmallDevice);

            tile.children[0].style.filter = 'saturate(100%)';

            DOM.headerTxt.innerHTML = text;
            DOM.rightHeader.style.backgroundColor = colour;
            
            img.parentNode.style.filter = 'saturate(100%)';

            tiles.forEach(tile => {
                tile.style.filter = 'saturate(10%)';
                tile.style.opacity = .3;
                if(tile.children[0].name === item.name) {
                    tile.style.filter = 'saturate(100%)';
                    tile.style.opacity = 1;
                }
            });

            setTimeout(()=>{
                const response = { taxon: 'name', binomial: item.name, question: item.name, answer: answer, success: correct };
                actions.boundUpdateScore(response);
            }, 2500);
            
            event.stopPropagation();
        });
    });

    const squares = clone.querySelectorAll('.js-tiles .square');

    squares.forEach(square => {
        square.addEventListener('click', event => {
            const img = event.target;
            const src = img.dataset.src;
            if(src) {
                document.querySelector('.js-modal-title').innerHTML = item.name;
                document.querySelector('.js-image-modal').src = src;
            }
        })
    });
    
    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);
}