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
        let collection = { items: [], itemIndex: 0 };
        expect(lessonLogicHandler.isSkippable(collection, counter)).toBeFalsy();
    });
    
    test('on returning to home with next item selected', () => {
        let counter = {
            isLessonRehydrated: undefined,
            isLessonPaused: true
        };
        let collection = { items: [], itemIndex: 1 };
        expect(lessonLogicHandler.isSkippable(collection, counter)).toBeFalsy();
    });

    test('refresh page after loading initial state', () => {
        let counter = {
            isLessonRehydrated: true,
            isLessonPaused: false
        };
        let collection = { };
        expect(lessonLogicHandler.isSkippable(collection, counter)).toBeFalsy();
    });

    test('refresh page with initial item selected', ()=> {
        let counter = {
            index: 1,
            isLessonRehydrated: true,
            isLessonPaused: false
          }
        let collection = { items: [], itemIndex: 0 };
        expect(lessonLogicHandler.isSkippable(collection, counter)).toBeTruthy();
    });
});