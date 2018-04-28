
export const addListeners = (cards, item, callbackTime) => {
    cards.forEach(choice => {

        choice.addEventListener('click', event => {
            
            const target = event.target;
            const answer = target.innerText;
            const vernacular = target.dataset.vernacular;

            const score = { taxon: 'name', binomial: item.name, vernacular: vernacular, question: item.name, answer: answer };
            const { text, colour, correct } = renderAnswerHeader(score);
            score.success = correct;

            DOM.headerTxt.innerHTML = text;
            DOM.rightHeader.style.backgroundColor = colour;

            target.style.color = colour;

            setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, callbackTime);
            
            event.stopPropagation();
        });
    });
};