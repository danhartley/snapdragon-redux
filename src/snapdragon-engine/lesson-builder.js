import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';

import { getBonusTests } from 'snapdragon-engine/bonus/bonus-test-handler';

export const createLesson = (lessonPlan, layouts, progressScreens, collection, lesson) => {

    lessonPlan.layouts = [];

    const moduleSize = lesson.moduleSize;
    const lessonName = lesson.name;
    const levelName = lesson.level.name;
    const itemsCountToDate = (lesson.currentRound - 1) * moduleSize;
    const itemsLeft = collection.items.length - itemsCountToDate;

    const layoutsToAdd = moduleSize > itemsLeft ? itemsLeft : moduleSize;

    layouts.forEach( (layout, index) => {
        let i = 0;
        do {
            lessonPlan.layouts.push({...layout, lessonName, levelName });
            i++;
        } while (i < layoutsToAdd);
    });

    let lessonLayouts = lessonPlan.layouts.filter(layout => !layout.bonus).map((layout, i) => {
        layout.itemIndex = layout.itemIndex === undefined ? utils.calcItemIndex(itemsCountToDate, layoutsToAdd, i) : layout.itemIndex;
        return { ...layout };
    });

    const itemIndices = [ ...new Set(lessonPlan.layouts.map(layout => layout.itemIndex)) ];

    const bonusTests = getBonusTests(collection, itemIndices, layouts.filter(layout => layout.bonus), lessonName, levelName);
    
    lessonPlan.layouts = [ ...lessonLayouts, ...bonusTests ];

    lessonLayouts = lessonPlan.layouts.map((layout, i) => {
        layout.roundProgressIndex = i + 1;
        return { ...layout };
    });

    const summaryLayout = lessonPlan.portrait 
        ? {
            name: 'summary',
            screens: [{ 
                name: 'summary', 
                domain: 'history', 
                parent: DOM.rightBody
            }],
            lessonName,
            levelName,
            layoutIndex: lessonPlan.layouts.length,
            itemIndex: 0
        }
        : {
            name: 'summary',
            screens: [...progressScreens],
            lessonName,
            levelName,
            layoutIndex: lessonPlan.layouts.length,
            itemIndex: 0
        };

    lessonPlan.layouts.push(summaryLayout);

    const scores = lessonPlan.layouts.map(layout => layout.score || 0);
    const roundScoreCount = scores.reduce((accumulator, currentValue) => accumulator + currentValue);

    lessonPlan.layouts.map(layout => layout.roundScoreCount = roundScoreCount);

    lesson.questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
    lesson.layoutCount = lessonPlan.layouts.length;
    lesson.layoutNames = lessonPlan.layouts.map(layout => layout.name);

    return { updatedLessonPlan: lessonPlan, updatedCollection: collection, updatedLesson: lesson };
};