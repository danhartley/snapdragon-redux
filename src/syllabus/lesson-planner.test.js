import { renderCard } from 'ui/screens/common/card';

import { createLessonPlan } from 'syllabus/lesson-planner';

test('createLessonPlan returns lesson1 screens unchanged for given number of items', () => {
    const moduleSize = 2;
    const layouts = createLessonPlan('lesson1', 'level1', moduleSize);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(8); // 2*4 = 8
    expect(revisedScreens.length).toEqual(18); // 2*7 + 4 = 18
});

test('createLessonPlan returns lesson1 missing revision screens for given number of items', () => {
    const moduleSize = 2;
    const excludeRevision = true;
    const layouts = createLessonPlan('lesson1', 'level1', moduleSize, excludeRevision);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(6); // 2*3 = 6
    expect(revisedScreens.length).toEqual(14); // 2*5 + 4 = 14
});