import { observeStore } from 'redux/observe-store';
import { store } from 'redux/store';

import { types } from 'redux/actions/action-types';
import { actions } from 'redux/actions/action-creators';
import { initialState } from 'redux/reducers/initial-state-for-reducers';
import { config as lessonConfig } from 'syllabus/lesson-config';

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
    
    const { layouts, layout } = store.getState();
    expect(layouts).toEqual(null);
    expect(layout).toEqual(null);

    const { collections, collection } = store.getState();
    expect(collections.length).toBeGreaterThan(0);
    expect(collection).toEqual(null);

    const { counter, score, history, revision } = store.getState();
    expect(counter).toEqual(null);
    expect(score).toEqual(null);
    expect(history).toEqual(null);
    expect(revision).toEqual(undefined);// not in use, not visible in store
});

test('when user selects a collection state should be populated', () => {

    const action = {
        type: types.CHANGE_COLLECTION,
        data: 1
    };

    actions.boundChangeCollection({ collection: {id:'1'}}); // user action (clicking on a collection) triggers CHANGE_COLLECTION

    let { config, collection, score } = store.getState();

    expect(config.collection.id).toEqual('1');
    expect(collection.name).toEqual('Herbs');
    expect(score).toEqual(initialState.score);

    const layoutData = [
        {
        name: 'revision',
        screens: [
            {
            name: 'specimen-images',
            domain: 'collection',
            parent: {},
            template: 'js-specimen-images-template'
            },
            {
            name: 'species-card',
            domain: 'collection',
            parent: {},
            template: 'js-card-revision-template'
            }
        ],
        layoutIndex: 0,
        itemIndex: 0,
        exerciseIndex: 1,
        lessonName: 'Lesson 1',
        levelName: 'Level 1'
        },
        {
        name: 'revision',
        screens: [
            {
            name: 'specimen-images',
            domain: 'collection',
            parent: {},
            template: 'js-specimen-images-template'
            },
            {
            name: 'species-card',
            domain: 'collection',
            parent: {},
            template: 'js-card-revision-template'
            }
        ],
        layoutIndex: 1,
        itemIndex: 1,
        exerciseIndex: 1,
        lessonName: 'Lesson 1',
        levelName: 'Level 1'
        },
        {
        name: 'test',
        screens: [
            {
            name: 'specimen-images',
            domain: 'collection',
            parent: {},
            template: 'js-specimen-images-template'
            },
            {
            name: 'species-images',
            domain: 'collection',
            parent: {},
            template: 'js-tiles-template',
            taxon: 'name'
            }
        ],
        layoutIndex: 2,
        itemIndex: 0,
        exerciseIndex: 2,
        lessonName: 'Lesson 1',
        levelName: 'Level 1'
        },
        {
        name: 'test',
        screens: [
            {
            name: 'specimen-images',
            domain: 'collection',
            parent: {},
            template: 'js-specimen-images-template'
            },
            {
            name: 'species-images',
            domain: 'collection',
            parent: {},
            template: 'js-tiles-template',
            taxon: 'name'
            }
        ],
        layoutIndex: 3,
        itemIndex: 1,
        exerciseIndex: 2,
        lessonName: 'Lesson 1',
        levelName: 'Level 1'
        },
        {
        name: 'test',
        screens: [
            {
            name: 'specimen-images',
            domain: 'collection',
            parent: {},
            template: 'js-specimen-images-template'
            },
            {
            name: 'species-vernaculars',
            domain: 'collection',
            parent: {},
            template: 'js-strips-template',
            taxon: 'name'
            }
        ],
        layoutIndex: 4,
        itemIndex: 0,
        exerciseIndex: 3,
        lessonName: 'Lesson 1',
        levelName: 'Level 1'
        },
        {
        name: 'test',
        screens: [
            {
            name: 'specimen-images',
            domain: 'collection',
            parent: {},
            template: 'js-specimen-images-template'
            },
            {
            name: 'species-vernaculars',
            domain: 'collection',
            parent: {},
            template: 'js-strips-template',
            taxon: 'name'
            }
        ],
        layoutIndex: 5,
        itemIndex: 1,
        exerciseIndex: 3,
        lessonName: 'Lesson 1',
        levelName: 'Level 1'
        },
        {
        name: 'test',
        screens: [
            {
            name: 'specimen-images',
            domain: 'collection',
            parent: {},
            template: 'js-specimen-images-template'
            },
            {
            name: 'species-scientifics',
            domain: 'collection',
            parent: {},
            template: 'js-strips-template',
            taxon: 'name'
            }
        ],
        layoutIndex: 6,
        itemIndex: 0,
        exerciseIndex: 4,
        lessonName: 'Lesson 1',
        levelName: 'Level 1'
        },
        {
        name: 'test',
        screens: [
            {
            name: 'specimen-images',
            domain: 'collection',
            parent: {},
            template: 'js-specimen-images-template'
            },
            {
            name: 'species-scientifics',
            domain: 'collection',
            parent: {},
            template: 'js-strips-template',
            taxon: 'name'
            },
            {
            name: 'summary',
            domain: 'counter',
            parent: {},
            template: 'js-summary-template'
            },
            {
            name: 'history',
            domain: 'history',
            parent: {},
            template: 'js-history-template'
            }
        ],
        layoutIndex: 7,
        itemIndex: 1,
        exerciseIndex: 4,
        lessonName: 'Lesson 1',
        levelName: 'Level 1'
        }
    ];

    actions.boundNextLesson(layoutData); // nextLesson(config) triggers: NEXT_LESSON

    let { counter, layouts, layout } = store.getState();

    expect(counter.index).toEqual(0);
    expect(layouts).toEqual(layoutData);
    expect(layout).toEqual(layoutData[0]);

    // boundNextLayout(layout) triggers NEXT_LAYOUT but no state change

    // boundNextItem(layout.itemIndex) triggers NEXT_ITEM but no state change

    const item = {};

    actions.boundEndRevision(item);

    counter = store.getState().counter;

    expect(counter.index).toEqual(1); // triggers nextLayout(index)

    actions.boundNextLayout({ layoutIndex: 1, itemIndex: 1});

    layout = store.getState().layout;

    console.log(layout)
    
    expect(layout.itemIndex).toEqual(1); // triggers nextItem(layout)

    actions.boundNextItem(1);

    collection = store.getState().collection;

    expect(collection.itemIndex).toEqual(1);
});