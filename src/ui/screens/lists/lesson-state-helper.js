import * as R from 'ramda';

import { enums } from 'ui/helpers/enum-helper';
import { persistor } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';

const getIsReviewingLesson = (userAction, config) => {

    let isNotReviewingLesson = true;
  
    if (userAction) {
        if (config.isLandscapeMode) {
            isNotReviewingLesson = isNotReviewingLesson && (userAction.name === enums.userEvent.START_LESSON.name || userAction.name === enums.userEvent.TOGGLE_SPECIES_LIST.name);
        }
        else {
            isNotReviewingLesson = isNotReviewingLesson && (userAction.name === enums.userEvent.START_LESSON.name);
        }
    }
  
    return !isNotReviewingLesson;
};

const overrideLesson = (userAction, config) => {
    return !getIsReviewingLesson(userAction, config);
};

const purgeLesson = () => {
    persistor.purge();
    window.location.reload(true);
};

const clearGuide = () => {
    const config = store.getState().config;
    config.guide = {
        iconicTaxa: null,
        locationLongLat: '',
        locationPlace: '',
        locationType: null,
        place: {
            id: 1,
            name: ''
        },
        speciesRange: 10,
        inatId: { key: '', type: '', param: 'user_id' },
        season: {}
    };
    actions.boundUpdateConfig(config);
};

const getCollectionToLoad = (currentCollection, collections, selectedLessonCollectionId)  => {

    const id = parseInt(selectedLessonCollectionId);
  
    let resume = true;
        resume = resume && currentCollection.id > 0;
        resume = resume && currentCollection.id === id;
  
    const collection = resume ? currentCollection : collections.find(c => c.id === id);
  
    return collection;
};

const getLatestCounter = collection => { 
    const { counter, lessons } = store.getState();
    const log = counter.log;
    const index = log ? log.index : 
                lessons.find(l => l.collection.id === collection.id)
                    ? lessons.find(l => l.collection.id === collection.id).counter.index
                    : counter.index;
  
    return { index };
};

const getUserLessonState = (lessons, collectionToLoad, progressState, counter, savedLesson, newLessonCounter) => {

    let restoredLesson = lessons.find(l => l.name === collectionToLoad.name);

    let lesson;
  
    if(restoredLesson) {
      lesson = restoredLesson;
      if(lesson.lesson.isNextRound) {
        lesson.score = R.clone(progressState.score);
      }
    } else {
      lesson = { 
        collection: collectionToLoad, 
        counter: { ...counter, index: 0 },
        lesson: savedLesson || { currentRound: 1, rounds: 0, isNextRound: true },
        layout: null,
        history: null,
        score: R.clone(progressState.score)
      };
    }

    if(newLessonCounter) {
        lesson.counter.isCustomLessonPausedOverride = true;
    }

    return lesson;
};
  
export const lessonStateHelper = {
    getIsReviewingLesson,
    overrideLesson,
    purgeLesson,
    clearGuide,
    getCollectionToLoad,
    getLatestCounter,
    getUserLessonState
};