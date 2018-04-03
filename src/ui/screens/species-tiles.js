import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { renderAnswerHeader } from 'ui/screens/helpers-for-screens';

export const renderTiles = (templateName, item) => {

    const template = document.querySelector(`.${templateName}`);

    const rptrTiles = template.content.querySelector('.js-species-tiles');

    rptrTiles.innerHTML = item.multipleImages.map(species => {        
        return `<div class="tile">
                    <img src="${species.images[0]}" name="${species.name}" /> 
                </div>`;
    }).join('');

    const clone = document.importNode(template.content, true);
    const tiles = clone.querySelectorAll('.js-species-tiles .tile');

    tiles.forEach(tile => {
        tile.addEventListener('click', event => {
            const img = event.target;
            const answer = img.name;

            const response = { taxon: 'name', name: item.name, question: item.name, answer: answer};

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
                actions.boundMarkAnswer({ taxon: 'name', name: item.name, question: item.name, answer: answer });
            },2000);            
        });
    });

    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);
}