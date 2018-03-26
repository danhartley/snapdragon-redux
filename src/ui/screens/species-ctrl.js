import { store } from 'redux/store';
import { renderSpeciesCards } from 'ui/screens/species';

export const renderSpecies = (item) => {

    const { layout, randomiser } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species')[0];

    const { items:answers, correctAnswer : { name } } = randomiser.answersCollection.filter(collection => collection.correctAnswer.id === item.id)[0];

    if(!screen) return;
    
    renderSpeciesCards(screen, answers, name);
};