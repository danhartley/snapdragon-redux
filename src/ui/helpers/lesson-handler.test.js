import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';

describe('should skip home pages appropriately', () => {

    test('on initial load', () => {
        let collection = { };
        let counter = { 
            isLessonPaused: false
        }    
        expect(lessonLogicHandler.isSkippable(collection, counter)).toBeFalsy();
    });
    
    test('on returning to home with initial item selected', () => {
        let counter = {
            isLessonRehydrated: undefined,
            isLessonPaused: true
        };
        let collection = { items: [], itemIndex: 0, id: 1 };
        let config = { collection: { id: 1 } }
        expect(lessonLogicHandler.isSkippable(collection, counter, config)).toBeFalsy();
    });
    
    test('on returning to home with next item selected', () => {
        let counter = {
            isLessonRehydrated: undefined,
            isLessonPaused: true
        };
        let collection = { items: [], itemIndex: 1, id: 1 };
        let config = { collection: { id: 1 } }
        expect(lessonLogicHandler.isSkippable(collection, counter, config)).toBeFalsy();
    });

    test('refresh page after loading initial state', () => {
        let counter = {
            isLessonRehydrated: true,
            isLessonPaused: false
        };
        let collection = { };
        expect(lessonLogicHandler.isSkippable(collection, counter)).toBeFalsy();
    });
``
    test('refresh page with initial item selected', ()=> {
        let counter = {
            index: 1,
            isLessonRehydrated: true,
            isLessonPaused: false
          }
        let collection = { items: [], itemIndex: 0 };
        let config = {};
        let layout = {};
        expect(lessonLogicHandler.isSkippable(collection, counter, config, layout)).toBeTruthy();
    });

    test('try to change lesson to the same lesson has no effect', () => {
        let counter = {
            isLessonRehydrated: false,
            isLessonPaused: false
        };
        let collection = { id: 1, items: [] };
        let config = { collection: { id: 1 } };
        let layout = {};
        expect(lessonLogicHandler.isSkippable(collection, counter, config, layout)).toBeTruthy();
    });

    test('change lesson to a different lesson changes species list', () => {
        let counter = {
            isLessonRehydrated: false,
            isLessonPaused: false
        };
        let collection = { id: 1, items: [] };
        let config = { collection: { id: 2 } };
        let layout = {};
        expect(lessonLogicHandler.isSkippable(collection, counter, config, layout)).toBeFalsy();
    });
});