import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/learn';
import { utils } from 'utils/utils';
import * as R from 'ramda';

let currItem = null;

export const renderSpecies = () => {

    const { strategy, randomiser, items, item } = store.getState();

    if(item === currItem) return;

    currItem = item;

    const element = strategy.elements.filter(el => el.name === 'species')[0];

    if(!element) return;

    const template = document.querySelector(`.${element.template}`);

    const rptrSpecies = template.content.querySelector('.js-rptr-species');
                    
    const answers = randomiser.answersCollection.filter(alt => alt.id === item.id)[0].species;

    const languages = [ 'en', 'pt' ];            
        rptrSpecies.innerHTML = answers.map(species => {
        const vernacularNames = 
            species.names
                .filter(name => R.contains(name.language, languages))
                .map(name => `<p>${name.vernacularName}</p>`)
                .slice(0,5)
                .join(''); 
                return `<div class="rectangle">
                            <div class="answer" id="${species.id}">
                                <button>${species.name}</button>
                                <div class="vernacular-name">${vernacularNames}</div>
                            </div>
                        </div>`;
    }).join('');

    const clone = document.importNode(template.content, true);

    clone.querySelectorAll('.js-rptr-species .rectangle .answer button').forEach(element => {
        element.addEventListener('click', event => {                    
            const { item } = store.getState();    
            const qandA = { name: item.name, question: item.name, answer: event.target.childNodes[0].data };
            actions.boundMarkAnswer(qandA);
        });
    });

    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);
};
