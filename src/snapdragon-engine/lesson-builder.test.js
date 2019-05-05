import { createLesson } from 'snapdragon-engine/lesson-builder';

    const _lessonPlan = { portrait: false };
    const layout = { type: 'test', screens:[{}], "itemIndex": 0} ;
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const _collection = { currentRound: 1, items: [{},{},{},{},{},{}], moduleSize: 4 };
    const _lesson = { name: 'Lesson 1', level: { name: 'Level 1'}, moduleSize: 4 }

test('createLesson should return new lesson plan with correct number of screens', () => {
    const questionCount = (layouts.length * _lesson.moduleSize);
    const layoutCount = questionCount + 1;
    const { updatedLessonPlan, updatedCollection, updatedLesson } = createLesson(_lessonPlan, layouts, progressScreens, _collection, _lesson);
    expect(updatedLesson.questionCount).toBe(questionCount);
    expect(updatedLesson.layoutCount).toBe(layoutCount);
});

test('createLesson should return final summary layout with correct number of screens', () => {
    const firstLayout = {"itemIndex": 0, "lessonName": "Lesson 1", "levelName": "Level 1", "roundScoreCount": 0, roundProgressIndex: 1, "screens": [{}], "type": "test"};
    const finalSummaryLayout = {"itemIndex": 0, "layoutIndex": 16, "lessonName": "Lesson 1", "levelName": "Level 1", "name": "summary", "roundScoreCount": 0, "screens": [{}, {}]};
    const { updatedLessonPlan, updatedCollection, updatedLesson } = createLesson(_lessonPlan, layouts, progressScreens, _collection, _lesson);
    expect(updatedLessonPlan.layouts[0]).toEqual(firstLayout);
    // expect(updatedLessonPlan.layouts[updatedLessonPlan.layouts.length - 1]).toEqual(finalSummaryLayout);
    expect(updatedLessonPlan.layouts[updatedLessonPlan.layouts.length - 1].name).toEqual('summary');
    expect(updatedLessonPlan.layouts[updatedLessonPlan.layouts.length - 1].screens.length).toEqual(2);
});

test('createLesson should return one screen for final layout for portrait mode', () => {
    _lessonPlan.portrait = true;
    const { updatedLessonPlan, updatedCollection, updatedLesson } = createLesson(_lessonPlan, layouts, progressScreens, _collection, _lesson);
    expect(updatedLessonPlan.layouts[updatedLessonPlan.layouts.length - 1].screens.length).toEqual(1);
});


