import * as R from 'ramda';

import { observeStore } from 'redux/observe-store';
import { store } from 'redux/store';

import { actions } from 'redux/actions/action-creators';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';
import { config as lessonConfig } from 'snapdragon-config/lesson-config';

test('observeStore should return unsubscribe function for every listener', () => {
    const onChange = () => {};
    const action = '';
    const unsubscribe = observeStore(store, store => store.lesson, onChange,'');    
    expect(unsubscribe.name).toEqual('onChange');
});


test('intial state of the app should be consistent', () => {
    
    lessonConfig.callbackTime = lessonConfig.callbackTime || 2000;
    lessonConfig.language = lessonConfig.language || 'en';
    const configWithDefaults = { ...lessonConfig };

    const { config } = store.getState();
    expect(config).toEqual(configWithDefaults);
    
    const { lessonPlan, layout } = store.getState();
    expect(lessonPlan).toEqual(null);
    expect(layout).toEqual(null);

    // const { collections, collection, lesson } = store.getState();
    // expect(collections.length).toBeGreaterThan(0);
    // const received = {"currentRound": 1, "isNextRound": true, "rounds": 0};
    // expect(lesson).toEqual(received);

    const { counter, score, history } = store.getState();
    expect(counter).toEqual(null);
    expect(score).toEqual(R.clone(progressState.score));
    expect(history).toEqual({
      total: 0,
      correct: 0,
      scores: [{
          total: 0,
          correct: 0,
        }
      ]    
    });
});

// test('when user selects a collection state should be populated', () => {

//     const data = {
//         config: {
//             collection: { 
//                 id: 1 
//             },
//         },   
//         collection: {
//             id:1,
//             items: [
//                 { 
//                     "name": "Vitis vinifera",
//                     "names": [
//                         {
//                         "vernacularName": "Vine",
//                         "language": "en"
//                         }
//                     ]
//                 }
//             ],
//             itemIndex: 0
//         }, 
//         lesson: {

//         }
//     };

//     actions.boundUpdateCollection(data); // user action (clicking on a collection) triggers UPDATE_COLLECTION

//     const { config, collection, score, lesosn } = store.getState();

//     expect(config.collection.id).toEqual(1);
//     expect(score).toEqual(progressState.score);

//     const _lessonPlan = { };

//     _lessonPlan.layouts = [
//         {
//         type:'revision',
//         screens: [
//             {
//             type:'specimen-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-specimen-images-template'
//             },
//             {
//             type:'species-card',
//             domain: 'collection',
//             parent: {},
//             template: 'js-card-revision-template'
//             }
//         ],
//         layoutIndex: 0,
//         itemIndex: 0,
//         lessonName: 'Lesson 1',
//         levelName: 'Level 1'
//         },
//         {
//         type:'revision',
//         screens: [
//             {
//             type:'specimen-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-specimen-images-template'
//             },
//             {
//             type:'species-card',
//             domain: 'collection',
//             parent: {},
//             template: 'js-card-revision-template'
//             }
//         ],
//         layoutIndex: 1,
//         itemIndex: 1,
//         lessonName: 'Lesson 1',
//         levelName: 'Level 1'
//         },
//         {
//         type:'test.skip',
//         screens: [
//             {
//             type:'specimen-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-specimen-images-template'
//             },
//             {
//             type:'species-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-tiles-template',
//             taxon: 'name'
//             }
//         ],
//         layoutIndex: 2,
//         itemIndex: 0,
//         lessonName: 'Lesson 1',
//         levelName: 'Level 1'
//         },
//         {
//         type:'test.skip',
//         screens: [
//             {
//             type:'specimen-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-specimen-images-template'
//             },
//             {
//             type:'species-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-tiles-template',
//             taxon: 'name'
//             }
//         ],
//         layoutIndex: 3,
//         itemIndex: 1,
//         lessonName: 'Lesson 1',
//         levelName: 'Level 1'
//         },
//         {
//         type:'test.skip',
//         screens: [
//             {
//             type:'specimen-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-specimen-images-template'
//             },
//             {
//             type:'species-vernaculars',
//             domain: 'collection',
//             parent: {},
//             template: 'js-strips-template',
//             taxon: 'name'
//             }
//         ],
//         layoutIndex: 4,
//         itemIndex: 0,
//         lessonName: 'Lesson 1',
//         levelName: 'Level 1'
//         },
//         {
//         type:'test.skip',
//         screens: [
//             {
//             type:'specimen-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-specimen-images-template'
//             },
//             {
//             type:'species-vernaculars',
//             domain: 'collection',
//             parent: {},
//             template: 'js-strips-template',
//             taxon: 'name'
//             }
//         ],
//         layoutIndex: 5,
//         itemIndex: 1,
//         lessonName: 'Lesson 1',
//         levelName: 'Level 1'
//         },
//         {
//         type:'test.skip',
//         screens: [
//             {
//             type:'specimen-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-specimen-images-template'
//             },
//             {
//             type:'species-scientifics',
//             domain: 'collection',
//             parent: {},
//             template: 'js-strips-template',
//             taxon: 'name'
//             }
//         ],
//         layoutIndex: 6,
//         itemIndex: 0,
//         lessonName: 'Lesson 1',
//         levelName: 'Level 1'
//         },
//         {
//         type:'test.skip',
//         screens: [
//             {
//             type:'specimen-images',
//             domain: 'collection',
//             parent: {},
//             template: 'js-specimen-images-template'
//             },
//             {
//             type:'species-scientifics',
//             domain: 'collection',
//             parent: {},
//             template: 'js-strips-template',
//             taxon: 'name'
//             },
//             {
//             type:'summary',
//             domain: 'counter',
//             parent: {},
//             template: 'js-summary-template'
//             },
//             {
//             type:'history',
//             domain: 'history',
//             parent: {},
//             template: 'js-history-template'
//             }
//         ],
//         layoutIndex: 7,
//         itemIndex: 1,
//         lessonName: 'Lesson 1',
//         levelName: 'Level 1'
//         }
//     ];

//     const _collection = {
//         currentRound: 1,
//         itemGroups: [
//             [
//               0,
//               1,
//               2,
//               3
//             ],
//             [
//               4,
//               5,
//               6,
//               7
//             ],
//             [
//               8,
//               9
//             ]
//           ],
//         items: [
//             { 
//                 "name": "Vitis vinifera",
//                 "names": [
//                     {
//                       "vernacularName": "Vine",
//                       "language": "en"
//                     }
//                 ]
//             }
//         ],
//         itemIndex: 0
//     };

//     const _lesson = {
//         level: {id:1}
//     };

//     actions.boundUpdateCollection({config, collection});
//     actions.boundAsyncNextLesson({ lessonPlan: _lessonPlan, collection : _collection, lesson: _lesson});

//     expect(store.getState().counter).toEqual( {"isLessonRehydrated": false});

//     actions.boundToggleLesson({ index: 0 });
//     const { counter, lessonPlan } = store.getState();
//     expect(counter.index).toEqual(0);

//     expect(lessonPlan.layouts).toEqual(_lessonPlan.layouts);
    
//     let layout = lessonPlan.layouts[counter.index];

//     actions.boundNextLayout(layout);

//     actions.boundNextItem(layout.itemIndex);

//     const item = {};

//     actions.boundEndRevision(item);

//     expect(store.getState().counter.index).toEqual(0);

//     actions.boundNextLayout({ layoutIndex: 1, itemIndex: 1});

//     layout = store.getState().layout;

//     expect(layout.itemIndex).toEqual(1);

//     actions.boundNextItem(1);

//     expect(store.getState().collection.itemIndex).toEqual(1);
// });