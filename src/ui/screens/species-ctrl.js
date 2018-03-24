import { store } from 'redux/store';
import { renderSpeciesCards } from 'ui/screens/species';

let currItem = null;

export const renderSpecies = () => {

    const { strategy, randomiser, item } = store.getState();

    if(item === currItem) return;

    currItem = item;

    const screen = strategy.screens.filter(el => el.name === 'species')[0];

    const { items:answers, correctAnswer : { name } } = randomiser.answersCollection.filter(collection => collection.correctAnswer.id === item.id)[0];

    if(!screen) return;
    
    renderSpeciesCards(screen, answers, name);
};
