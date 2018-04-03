import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { renderAnswerHeader } from 'ui/screens/helpers-for-screens';

export const renderSpeciesCards = (templateName, item) => {

    const template = document.querySelector(`.${templateName}`);

    const rptrSpecies = template.content.querySelector('.js-rptr-species');
                    
    const languages = [ 'en', 'pt' ];
    rptrSpecies.innerHTML = R.take(6, item.multipleNames.map(species => {        
        const vernacularNames = species.names
                .filter(name => R.contains(name.language, languages))
                .map(name => `<p>${name.vernacularName}</p>`)
                .slice(0,3)
                .join('');

                return `<div class="rectangle">
                            <div class="answer" id="${species.id}">
                                <button>${species.name}</button>
                                <div class="vernacular-name">${vernacularNames}</div>
                            </div>
                        </div>`;

    })).join('');

    const clone = document.importNode(template.content, true);
    const cards = clone.querySelectorAll('.js-rptr-species .rectangle .answer button');

    cards.forEach(choice => {
        choice.addEventListener('click', event => {
            const btn = event.target;
            const answer = btn.childNodes[0].data;

            const response = { taxon: 'name', name: item.name, question: item.name, answer: answer};
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

    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);
};
