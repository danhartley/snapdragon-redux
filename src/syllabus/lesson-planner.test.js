import { renderCard } from 'ui/screens/common/card';

import { activeLayouts, reviseActiveLayouts } from 'syllabus/lesson-planner';

test('lessonPlanner should return array of activeLayouts', () => {
    expect(activeLayouts).toBeDefined();
    expect(activeLayouts instanceof Array).toBeTruthy();
});

test('lessonPlanner should contain at least one lesson', () => {
    expect(activeLayouts.length).toBeGreaterThan(0);
});

test('first lesson in layout should have a layoutIndex of 0', () => {
    expect(activeLayouts[0].layoutIndex).toEqual(0);
});

test('reviseActiveLayouts returns lesson1 screens unchanged for given number of items', () => {
    const selectionSize = 2;
    const layouts = reviseActiveLayouts(selectionSize);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(8); // 2*4 = 8
    expect(revisedScreens.length).toEqual(18); // 2*7 + 4 = 18
});

test('reviseActiveLayouts returns lesson1 missing revision screens for given number of items', () => {
    const selectionSize = 2;
    const excludeRevision = true;
    const layouts = reviseActiveLayouts(selectionSize, excludeRevision);
    const revisedLayoutCount = layouts.length;
    let revisedScreens = [];
    layouts.map(layout => {
        layout.screens.map(screen => revisedScreens.push(screen));
    });
    expect(revisedLayoutCount).toEqual(6); // 2*3 = 6
    expect(revisedScreens.length).toEqual(14); // 2*5 + 4 = 14
});