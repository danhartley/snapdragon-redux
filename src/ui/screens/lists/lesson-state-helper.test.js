import { lessonStateHelper } from 'ui/screens/lists/lesson-state-helper';

test('return current collection if ids match', () => {

    let currentCollection, collections, selectedLessonCollectionId;

    currentCollection = { id: 1 };
    collections = [ { id: 1 } ];
    selectedLessonCollectionId = '1';

    expect(lessonStateHelper.getCollectionToLoad(currentCollection, collections, selectedLessonCollectionId)).toEqual(currentCollection);
    
});

test('return collection from collections by id if not current collection', () => {

    let currentCollection, collections, selectedLessonCollectionId;

    currentCollection = { id: 1 };
    collections = [ { id: 1 }, { id: 2 } ];
    selectedLessonCollectionId = '2';

    expect(lessonStateHelper.getCollectionToLoad(currentCollection, collections, selectedLessonCollectionId)).toEqual({ id: 2 });
    
});