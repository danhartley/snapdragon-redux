// import { store } from 'redux/store';
// import { persistor } from 'redux/store';
// import { actions } from 'redux/actions/action-creators';
// import { stats } from 'ui/helpers/stats';
// import { enums } from 'ui/helpers/enum-helper';

// const getMode = (mode, isLevelComplete, itemsToReview) => {    
//     const _mode = (mode === 'learn' && isLevelComplete && itemsToReview.length > 0)
//             ? 'review'
//             : mode === 'review' ? 'learn-again' : 'learn';
//     return _mode;
// }

// const getLatestCounter = collection => { 
//     const { counter, lessons } = store.getState();
//     const log = counter.log;
//     const index = log ? log.index : 
//                 lessons.find(l => l.collection.id === collection.id)
//                     ? lessons.find(l => l.collection.id === collection.id).counter.index
//                     : counter.index;

//     console.log('counter.index after change state: ', counter.index);
//     console.log('counter.isLessonPaused change state: ', counter.isLessonPaused);

//     return { index };
// };

// const changeState = (lessonState, collection, config, history) => {    

//     const { lesson } = store.getState();

//     switch(lessonState) {
//         case enums.lessonState.BEGIN_LESSON: {
//             actions.boundStopStartLesson({ index: 0, isLessonPaused: false });
//             break;
//         }
//         case enums.lessonState.PAUSE_LESSON: {
//             if(collection.items) {
//                 const { index } = getLatestCounter(collection);
//                 actions.boundStopStartLesson({ index: 0, isLessonPaused: true, log: { index: index, collection: collection.id  } });
//             }
//             break;
//         }
//         case enums.lessonState.RESUME_LESSON: {
//             actions.boundStopStartLesson({ ...getLatestCounter(collection), isLessonPaused: false });
//             break;
//         }
//         case enums.lessonState.NEXT_ROUND: {
//             const itemsToReview = stats.getItemsForRevision(collection, history, 1);
//             const mode = getMode(config.mode, lesson.isLevelComplete, itemsToReview);
//             config.mode = mode;

//             switch(mode) {  
//                 case 'learn': {
//                     if(lesson.isLevelComplete) {
//                         actions.boundNextLevel({ index: 0, lesson });
//                     } else if(lesson.isNextRound) {
//                         actions.boundNextRound({ index: 0, lesson });
//                     };
//                     break;
//                 }
//                 case 'review' : {
                    
//                     lesson.isLevelComplete = false;
//                     lesson.moduleSize = (lesson.moduleSize > itemsToReview.length) ? itemsToReview.length : lesson.moduleSize;
//                     lesson.rounds = Math.ceil(itemsToReview.length / lesson.moduleSize);
                    
//                     actions.boundUpdateLesson(lesson);

//                     collection.itemIndex = 0;
//                     collection.allItems = collection.items;
//                     collection.items = itemsToReview;
                    
//                     actions.boundUpdateCollection({ config, collection });

//                     actions.boundNextRound({ index: 0, lesson });
//                     break;
//                 }
//                 case 'learn-again': {
//                     collection.items = collection.allItems;
//                     lesson.moduleSize = collection.moduleSize || config.moduleSize;
//                     actions.boundUpdateLesson(lesson);
//                     actions.boundUpdateCollection({ config, collection });
//                 }
//             }            
//             break;      
//         }
//     }
// };

// const purgeLesson = () => {

//     persistor.purge();
//     window.location.reload(true);
// };

// export const lessonHandler = {
//     getMode,
//     changeState,    
//     purgeLesson
// }