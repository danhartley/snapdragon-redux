import { contains } from "ramda";

import { firestore } from 'api/firebase/firestore';
import { decks } from 'quiz/quiz-api-decks';
import { scaleImage } from 'ui/helpers/image-handler';

const getDeckSummaries = () => {
  return new Promise(resolve => resolve(decks.map(deck => { return { name: deck.name, count: deck.species.length } })));
};

const getSpeciesDetailsInParallel = async species => {
  return await firestore.getSpeciesInParallel(species);
};

const getDecks = async name => {
  console.log(name);
  const species = decks.find(deck => deck.name === name).species;
    const items = await getSpeciesDetailsInParallel(species.map(s => { return { name: s } } ));
    const deck = {
      name,
      species: items
    };
    
    return [{
      name: deck.name,
      species: deck.species.map(sp => {
        return {
          name: sp.name,
          vernacularName: '',
          names: sp.names,
          srcs: sp.images.map(i => scaleImage(i).medium)
        }
      })
    }];
};

export const api = {
  getDeckSummaries,
  getDecks
};