import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { utils } from 'utils/utils';

export const createLesson = (lessonPlan, layouts, progressScreens, collection, bonusTests, bonusLayouts) => {

    const { lesson } = store.getState(); // pass in

    lessonPlan.layouts = [];

    const { moduleSize, lessonName, levelName } = collection;
    const itemsCountToDate = (collection.currentRound - 1) * moduleSize; // lesson.currentRound MISSING! lesson
    const itemsLeft = collection.items.length - itemsCountToDate;

    const layoutsToAdd = moduleSize > itemsLeft ? itemsLeft : moduleSize;

    layouts.forEach( (layout, index) => {
        let i = 0;
        do {
            lessonPlan.layouts.push({...layout, lessonName, levelName });
            i++;
        } while (i < layoutsToAdd);
    });

    const lessonLayouts = lessonPlan.layouts.map((layout, i) => {
        layout.itemIndex = layout.itemIndex || utils.calcItemIndex(itemsCountToDate, layoutsToAdd, i);
        layout.roundProgressIndex = i + 1;
        return { ...layout };
    });

    // We need to look at the bonusTests and take out the ones relevant to this round based on:
    // The collection.itemIndex and the collection.currentRound, then:
    // Filter out the bonus questions we want and add a layout for each one

    // score: markBonusTest

    // remove all wildcard, definition panels and layouts, add new bonus panel and bonus-layout

    // option to 'wrap' collection screens, e.g. family name, to show family images. ('To which family/group/class do these species beling?')

    // we want to attach these to score (and then history) object, in order not to repeat questions

    lessonPlan.layouts = [ ...lessonLayouts, ...bonusLayouts ];

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;
    lessonPlan.moduleSize = moduleSize;

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

    lessonPlan.moduleSize = moduleSize;
    lessonPlan.questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
    lessonPlan.layoutCount = lessonPlan.layouts.length;
    lessonPlan.layoutNames = lessonPlan.layouts.map(layout => layout.name);

    return { updatedLessonPlan: lessonPlan, updatedCollection: collection };
};