import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';

export const renderTiles = (templateName, item) => {

    const template = document.querySelector(`.${templateName}`);

    const rptrTiles = template.content.querySelector('.js-species-tiles');

    rptrTiles.innerHTML = item.multipleTiles.map(species => {        
        return `<div class="tile">
                    <img src="${species.images[0]}" name="${species.name}" /> 
                </div>`;
    }).join('');

    const clone = document.importNode(template.content, true);

    clone.querySelectorAll('.js-species-tiles .tile').forEach(choice => {
        choice.addEventListener('click', event => {
            const img = event.target;
            const answer = img.name;
            const right = 'rgb(44, 141, 86)'
            const wrong = 'rgb(141, 0, 5)';
            img.style.opacity = .5;
            if(item.name === answer) {
                img.style.color = right;                
                img.parentNode.style.background = right;
                DOM.headerTxt.innerHTML = `${answer} was the correct answer! Well done.`;
                DOM.rightHeader.style.backgroundColor = 'rgb(44, 141, 86)';
            }
            else {
                img.style.color = wrong;
                img.parentNode.style.background = wrong;
                DOM.headerTxt.innerHTML = `Oh no! The correct answer was ${item.name}.`;
                DOM.rightHeader.style.backgroundColor = 'rgb(141, 0, 5)';
            }
            setTimeout(()=>{
                actions.boundMarkAnswer({ name: item.name, question: item.name, answer: answer });
            },2000);            
        });
    });

    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);
}