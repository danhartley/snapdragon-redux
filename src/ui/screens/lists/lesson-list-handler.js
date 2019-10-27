import { elem } from 'ui/helpers/class-behaviour';

const parseLessonElement = (e, lessons) => {

    const title = e.currentTarget;
    const lessonId = parseInt(title.dataset.lessonId);
    const lesson = lessons.find(l => l.id === lessonId);
    const container = document.querySelector(`.js-species-container[data-container-id="${lessonId}"]`);
    const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
    const reviewLink = document.querySelector(`.js-lesson-review[data-review-link="${lessonId}"]`);
  
    let otherSpecies = Array.from(document.querySelectorAll('.js-species-container'));
        otherSpecies = otherSpecies.filter(container => container.id !== `container_${lessonId}`);
        otherSpecies.forEach(container => container.innerHTML = '');
  
    const isSpeciesListAvailable = !!title.dataset.selected && !!speciesList; 
    const isSpeciesListHidden = elem.hasClass(speciesList, 'hide');
  
    const lessonVideoState = document.querySelector(`.js-lesson-video-state[data-lesson-id="${lessonId}"]`);
  
    const state = {
      requiresSpeciesList: !isSpeciesListAvailable,
      revealSpeciesList: isSpeciesListAvailable && isSpeciesListHidden,
      hideSpeciesList: isSpeciesListAvailable && !isSpeciesListHidden
    };
  
    return { title, lesson, state, speciesList, container, lessonVideoState, reviewLink };
};

export const lessonListHandler = {
  parseLessonElement
}