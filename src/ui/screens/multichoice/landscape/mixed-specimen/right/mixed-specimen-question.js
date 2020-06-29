import { store } from 'redux/store';
import { renderMixedSpecimenImagesAndQuestion } from 'ui/screens/multichoice/portrait/mixed-specimen/mixed-specimen-combined';

export const renderMixedSpecimenQuestion = (collection, bonusLayout) => {

    const { config, layout } = store.getState();

    renderMixedSpecimenImagesAndQuestion(collection);
  };
