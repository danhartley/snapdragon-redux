import { contains, clone } from 'ramda';

import { subscription } from 'redux/subscriptions';
import { firestore } from 'api/firebase/firestore';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { collectionHandler  } from 'ui/helpers/collection-handler';
import { lessonStateHelper } from 'ui/screens/lists/lesson-state-helper';
import { nextLesson } from 'ui/setup/next-lesson';
import { nextLayout } from 'ui/setup/next-layout';
import { nextItem } from 'ui/setup/next-item';

const changeRequest = async args => {

  const { requestType, requestArgs } = args;

  let { config, collections, collection, counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, traits = enums } = store.getState();
  let userProgressState;

  switch(requestType) {

    case enums.lessonState.PAUSE_LESSON:
      changeLessonState(requestType, collection, config);
    break;
    
    case enums.lessonState.UPDATE_COLLECTION:
      actions.boundUpdateCollection({ config: requestArgs.config, collection: requestArgs.collection });
    break;
    
    case enums.lessonState.SAVE_LESSON_PROGRESS:
      
      config.collection.id = collection.id; // hack
    
      const savedLesson = { 
          name: collection.name,
          config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score: clone(score), history, bonusLayout, enums: traits
      };
    
      actions.boundSaveLesson(savedLesson);

    break;
    
    case enums.lessonState.GET_LESSON_STATE:
      userProgressState = await getLessonState(requestArgs.collectionToLoad, requestArgs.config, requestArgs.updatedCounter);
      saveUserProgressState(userProgressState);
      return userProgressState;
    
    case enums.lessonState.ADD_SPECIES_TO_COLLECTION:
      userProgressState = await addExtraSpeciesSelection(requestArgs);
      saveUserProgressState(userProgressState);
    
    case enums.lessonState.RENDER_SPECIES_LIST:      
      userProgressState = await getLessonState(requestArgs.lesson || requestArgs.collection, config);
      saveUserProgressState(userProgressState);
      setTimeout(() => {
        renderSpeciesList(userProgressState.collection, { callingParentContainer: requestArgs.container });
      });
    break;
    
    case enums.lessonState.BEGIN_OR_RESUME_LESSON:
      const collectionToLoad = lessonStateHelper.getCollectionToLoad(collection, collections, requestArgs.id);
      userProgressState = await getLessonState(collectionToLoad, config);
      const _lessonState = userProgressState.score && userProgressState.score.collectionId === userProgressState.collection.id
              ? enums.lessonState.RESUME_LESSON
              : enums.lessonState.BEGIN_LESSON;
      saveUserProgressState(userProgressState);

      subscription.add(nextItem, 'layout', 'quiz');
      subscription.add(nextLesson, 'counter', 'quiz');
      subscription.add(nextLayout, 'counter', 'quiz');

      setTimeout(() => {
        changeLessonState(_lessonState, userProgressState.collection, userProgressState.lesson); 
      });
    break;

    case enums.lessonState.NEXT_ROUND:
      changeLessonState(enums.lessonState.NEXT_ROUND, collection, requestArgs.lesson);
    break;
  }
};

const getLessonState = async (collectionToLoad, config, newLessonCounter) => {

  const { counter: stateCounter, lessons, lesson: savedLesson } = store.getState();

  const counter = newLessonCounter || stateCounter;

  const userProgressState = lessonStateHelper.getUserLessonState(lessons, collectionToLoad, progressState, counter, savedLesson, newLessonCounter);

  userProgressState.collection = await collectionHandler.loadCollection(userProgressState.collection, config);
  
  return userProgressState;
};

const changeLessonState = async (userProgressState, collection, lesson) => {    

  switch(userProgressState) {
      case enums.lessonState.BEGIN_LESSON: {
            actions.boundStopStartLesson({ index: 0, isLessonPaused: false, log: { collection: collection.id  } });
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
          actions.boundStopStartLesson({ ...lessonStateHelper.getLatestCounter(collection), isLessonPaused: false, log: { collection: collection.id  } });
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

  const extraSpecies = config.guide.species.filter(s => !contains(s.name, collection.items.map(i => i.name)));

  const items = await collectionHandler.getSpeciesDetailsInParallel(extraSpecies);

  const collectionExtension = await collectionHandler.loadCollectionItemProperties({ items }, config);
  collection.items = [ ...collection.items, ...collectionExtension.items];
  const lesson = {
      collection,
      counter: { ...store.getState().counter, index: 0 },
      lesson: { currentRound: 1, rounds: 0, isNextRound: true },
      layout: null,
      history: null,
      score: clone(progressState.score)
  };

  return await lesson;
};

const saveUserProgressState = userProgressState => {

  const { user, userAction } = store.getState();

  userProgressState.counter = userProgressState.counter || { };

  actions.boundSaveUserProgress({ lesson: userProgressState, userAction });
  
  firestore.addCollection(clone(userProgressState.collection), user);
};

const recordUserAction = action => {

  subscription.removeAllQuizScreenSubs();
  subscription.removeAllQuizLayoutSubs();

  setTimeout(() => {
    actions.boundClickEvent(action);
  });
};

export const lessonStateHandler = {
  changeRequest,
  recordUserAction
};