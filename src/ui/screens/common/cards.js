import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { renderAnswerHeader } from 'ui/helpers/helpers-for-screens';

export const renderCards = (screen, item, callback) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrSpecies = template.content.querySelector('.js-rptr-species');
                    
    rptrSpecies.innerHTML = item.content.map(callback).join('');

    const clone = document.importNode(template.content, true);
    const cards = clone.querySelectorAll('.js-rptr-species .rectangle .answer button');

    cards.forEach(choice => {
        choice.addEventListener('click', event => {
            
            const btn = event.target;
            const answer = btn.name;
            const vernacularQuestion = item.names.filter(name => name.language === 'en')[0];

            const response = { taxon: 'name', name: item.name, question: item.name, answer: answer, vernacularQuestion: vernacularQuestion};
            const { text, colour, correct } = renderAnswerHeader(response);

            DOM.headerTxt.innerHTML = text;
            DOM.rightHeader.style.backgroundColor = colour;

            btn.style.color = colour;
            btn.parentNode.style.background = colour;

            if(!correct) {
                cards.forEach(card => {
                    if(card.innerText === item.name) {
                        card.parentNode.style.background = 'rgb(44, 141, 86)';
                    }
                });
            }

            setTimeout(()=>{
                actions.boundMarkAnswer({ taxon: 'name', name: item.name, question: item.name, answer: answer });
            },2000);            
        });
    });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);
};
