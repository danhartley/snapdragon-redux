import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { renderAnswerHeader } from 'ui/helpers/helpers-for-screens';

export const renderSpeciesNamesScreen = (screen, item) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrSpecies = template.content.querySelector('.js-rptr-species');
        
    rptrSpecies.innerHTML = R.take(6, item.multipleNames.map(species => {

        const vernacularName = species.names
            .filter(name => name.language === 'en')
            .map(name => name.vernacularName)[0];

        return `<div class="rectangle names">
                    <div class="answer" id="${species.name}">${vernacularName}</div>
                </div>`;

    })).join('');

    const clone = document.importNode(template.content, true);
    const cards = clone.querySelectorAll('.js-rptr-species .rectangle .answer');

    cards.forEach(choice => {
        choice.addEventListener('click', event => {
            const name = event.target;
            const answer = name.id;
            const vernacularAnswer = name.childNodes[0].data;
            const vernacularQuestion = item.names.filter(name => name.language === 'en')[0].vernacularName;

            const response = { taxon: 'name', name: item.name, question: item.name, answer: answer, vernacularQuestion: vernacularQuestion, vernacularAnswer: vernacularAnswer};
            const { text, colour, correct } = renderAnswerHeader(response);

            DOM.headerTxt.innerHTML = text;
            DOM.rightHeader.style.backgroundColor = colour;

            name.style.background = colour;

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

    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);
};
