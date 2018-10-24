import { createLesson } from 'syllabus/lesson-builder';

    const layout = { type: 'test', screens:[{}]} ;
    const layouts = [layout, layout, layout, layout];
    const progressScreens = [{},{}];
    const collection = { currentRound: 1, items: [{},{},{},{},{},{}] };
    const moduleSize = 4;

test('createLesson should return new lesson plan with correct number of screens', () => {
    const isPortraitMode = false;
    const summaryLayoutSie = 1;
    const questionCount = (layouts.length * moduleSize);
    const layoutCount = questionCount + summaryLayoutSie;
    const lessonPlan = createLesson('Lesson 1', 'Level 1', moduleSize, isPortraitMode, layouts, progressScreens, collection, []);
    expect(lessonPlan.questionCount).toBe(questionCount);
    expect(lessonPlan.layoutCount).toBe(layoutCount);
});

test('createLesson should return final summary layout with correct number of screens', () => {
    const isPortraitMode = false;
    const firstLayout = {"itemIndex": 0, "lessonName": "Lesson 1", "levelName": "Level 1", "progressIndex": 1, "roundScoreCount": 0, "screens": [{}], "type": "test"};
    const finalSummaryLayout = {"itemIndex": 0, "layoutIndex": 16, "lessonName": "Lesson 1", "levelName": "Level 1", "name": "summary", "roundScoreCount": 0, "screens": [{}, {}]};
    const lessonPlan = createLesson('Lesson 1', 'Level 1', moduleSize, isPortraitMode, layouts, progressScreens, collection, []);
    expect(lessonPlan.layouts[0]).toEqual(firstLayout);
    expect(lessonPlan.layouts[lessonPlan.layouts.length - 1]).toEqual(finalSummaryLayout);
    expect(lessonPlan.layouts[lessonPlan.layouts.length - 1].name).toEqual('summary');
    expect(lessonPlan.layouts[lessonPlan.layouts.length - 1].screens.length).toEqual(2);
});

test('createLesson should return one screen for final layout for portrait mode', () => {
    const isPortraitMode = true;
    const lessonPlan = createLesson('Lesson 1', 'Level 1', moduleSize, isPortraitMode, layouts, progressScreens, collection, []);
    expect(lessonPlan.layouts[lessonPlan.layouts.length - 1].screens.length).toEqual(1);
});
