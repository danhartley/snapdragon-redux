import { actions } from 'redux/actions/learn';
import { store } from 'redux/store';
import { renderFails } from 'ui/screens/fails';
import { DOM } from 'ui/dom';

export const renderPasses = () => {

    const { score, items } = store.getState();

    if(score.total === items.length) {
        
        const template = document.querySelector('.js-passes-template');
        const rptrPasses = template.content.querySelector('.js-rptr-passes');
        const ul = document.createElement('ul');

        DOM.headerTxt.innerHTML = 
            score.correct === 1 
                ? `You got ${score.correct} question right:`
                : `You got ${score.correct} questions right:`;
        DOM.rightHeader.style.backgroundColor = 'rgb(44, 141, 86)';

        score.passes.forEach(pass => {
            const li = document.createElement('li');
            li.textContent = pass;
            ul.appendChild(li);            
        });
        
        rptrPasses.appendChild(ul);

        const clone = document.importNode(template.content, true);
        DOM.rightBody.innerHTML = '';
        DOM.rightBody.appendChild(clone);

        setTimeout(()=>{
            renderFails();
        },5000);
    }
};