  import * as R from 'ramda';

import { firestore } from 'api/firebase/firestore';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { collectionHandler  } from 'ui/helpers/collection-handler';
import { lessonStateHelper } from 'ui/screens/lists/lesson-state-helper';

const changeRequest = async args => {

  const { requestType, requestArgs } = args;

  const { config, collection, collections, counter } = store.getState();

  console.log('requestType: ', requestType);
  console.log('requestArgs: ', requestArgs);

  switch(requestType) {

    case enums.lessonState.PAUSE_LESSON:
      if(config.isLandcapeMode) return;      
      changeLessonState(requestType, collection, config);
    break;
    
    case enums.lessonState.UPDATE_COLLECTION:
      updateCollection(requestArgs);
    break;
    
    case enums.lessonState.SAVE_LESSON_PROGRESS:
      saveCurrentLesson(collection);
    break;
    
    case enums.lessonState.GET_LESSON_PROGRESS:
      const { collectionToLoad, updatedCounter} = requestArgs;
      return await getUserLessonProgressState(collectionToLoad, config, collections, updatedCounter);
    
      case enums.lessonState.ADD_SPECIES_TO_COLLECTION:
      return await addExtraSpeciesSelection(requestArgs);
    
      case enums.lessonState.RENDER_SPECIES_LIST:
      renderLessonSpeciesList(requestArgs);
    break;
    
    case enums.lessonState.BEGIN_OR_RESUME_LESSON:
      const { id } = requestArgs;
      beginOrResumeLesson(id);
    break;

    case enums.lessonState.NEXT_ROUND:
      const { lesson } = requestArgs; 
      changeLessonState(enums.lessonState.NEXT_ROUND, collection, lesson);
    break;
  }
};

const beginOrResumeLesson = async (selectedLessonCollectionId, requestedlessonState)  => {

  const { collections, collection: currentCollection, config } = store.getState();

  const collectionToLoad = lessonStateHelper.getCollectionToLoad(currentCollection, collections, selectedLessonCollectionId);

  const { collection, score, lesson } = await getUserLessonProgressState(collectionToLoad, config, collections);

  const lessonState = !!requestedlessonState ? requestedlessonState : (score && score.collectionId === collection.id) 
          ? enums.lessonState.RESUME_LESSON
          : enums.lessonState.BEGIN_LESSON;

  changeLessonState(lessonState, collection, lesson); 
};

const renderLessonSpeciesList = async requestArgs => {

  const { lesson: collectionToLoad, container } = requestArgs;

  const { config, collections } = store.getState();

  const { collection } = await getUserLessonProgressState(collectionToLoad, config, collections);

  setTimeout(() => {
    renderSpeciesList(collection, { callingParentContainer: container });
  });
};

const getUserLessonProgressState = async (collectionToLoad, config, collections, newLessonCounter) => {

  const { counter: stateCounter, lessons, lesson: savedLesson } = store.getState();

  const counter = newLessonCounter || stateCounter;

  const userLessonState = lessonStateHelper.getUserLessonState(lessons, collectionToLoad, progressState, counter, savedLesson, newLessonCounter);

  await collectionHandler.loadCollection(userLessonState.collection, config, userLessonState.counter, collections);

  setActiveCollection(userLessonState);

  return userLessonState;
};

const changeLessonState = async (lessonState, collection, lesson) => {    

  switch(lessonState) {
      case enums.lessonState.BEGIN_LESSON: {
            actions.boundStopStartLesson({ index: 0, isLessonPaused: false });
          break;
      }
      case enums.lessonState.PAUSE_LESSON: {

        if(collection.items) {
          const { index } = lessonStateHelper.getLatestCounter(collection);
          actions.boundStopStartLesson({ index, isLessonPaused: true, log: { index: index, collection: collection.id  } });
        }

        break;
      }
      case enums.lessonState.RESUME_LESSON: {
          actions.boundStopStartLesson({ ...lessonStateHelper.getLatestCounter(collection), isLessonPaused: false });
          break;
      }
      case enums.lessonState.NEXT_ROUND: {
          if(lesson.isLevelComplete) {
            actions.boundNextLevel({ index: 0, lesson });
          } else if(lesson.isNextRound) {
              actions.boundNextRound({ index: 0, lesson: { ...lesson, currentRound: lesson.currentRound + 1 } });
          };
          break;      
      }
  }
  return lesson;
};

const addExtraSpeciesSelection = async requestArgs => {

  const { config, collection } = requestArgs;

  if(!collection) return;

  if(!collection.items) return;

  const extraSpecies = config.guide.species.filter(s => !R.contains(s.name, collection.items.map(i => i.name)));

  const items = await collectionHandler.getSnapdragonSpeciesData(extraSpecies);

  const collectionExtension = await collectionHandler.loadCollectionItemProperties({ items }, config);
  collection.items = [ ...collection.items, ...collectionExtension.items];
  const lesson = {
      collection,
      counter: { ...store.getState().counter, index: 0 },
      lesson: { currentRound: 1, rounds: 0, isNextRound: true },
      layout: null,
      history: null,
      score: R.clone(progressState.score)
  };

  setActiveCollection(lesson);
};

const updateCollection = requestArgs => {
  const { config, collection } = requestArgs;
  actions.boundUpdateCollection({ config, collection }); // or use setActive-Collection?
};

const setActiveCollection = lesson => {
  lesson.counter = lesson.counter || { };
  actions.boundSetActiveCollection({ lesson });
  const { user } = store.getState();
  firestore.addCollection(lesson.collection, user);
};

const recordUserAction = action => {
  actions.boundClickEvent(action);
};

const saveCurrentLesson = async collection => {

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums, config } = store.getState();
  
  config.collection.id = collection.id;

  const savedLesson = { 
      name: collection.name,
      config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score: R.clone(score), history, bonusLayout, enums
  };

  actions.boundSaveLesson(savedLesson);

  return savedLesson;
};

export const lessonStateHandler = {
  changeRequest,
  recordUserAction
};