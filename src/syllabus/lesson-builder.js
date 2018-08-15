import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';

export const createLesson = (lessonName, levelName, moduleSize, excludeRevision, isPortraitMode, layouts, progressScreens, collection, wildcardLayouts) => {
    
    if(excludeRevision) {
        layouts = layouts.filter(layout => layout.type !== 'revision');
    }

    let lessonPlan = { layouts: [] }, layoutIndex = 0;

    layouts.forEach( (layout, index) => {

        let i = 0;
        do {
            lessonPlan.layouts.push({...layout, lessonName, levelName });
            i++;
        } while (i < moduleSize);
    });

    const revisionLayouts = excludeRevision ? [] : lessonPlan.layouts.filter(layout => layout.type === 'revision');
    const shuffledLessonLayouts = utils.shuffleArray([ ...lessonPlan.layouts.filter(layout => layout.type === 'test'), ...wildcardLayouts]);
    shuffledLessonLayouts.filter(layout => layout.name === 'screen-epithet-meaning').map(layout => layout.itemIndex = layout.epithet.index);
    const offSet = (collection.currentRound - 1) * moduleSize;

    shuffledLessonLayouts.forEach( (layout, i) => {
        layout.layoutIndex = layoutIndex;
        layout.itemIndex = layout.itemIndex || utils.calcItemIndex(offSet, moduleSize, i);
        layout.progressIndex = i + 1;
        layoutIndex = layoutIndex + 1;
    });

    revisionLayouts.forEach( (layout, i) => {
        layout.layoutIndex = layoutIndex;
        layout.itemIndex = layout.itemIndex || utils.calcItemIndex(offSet, moduleSize, i);
        layoutIndex = layoutIndex + 1;
        const arrayIndex = shuffledLessonLayouts.findIndex(plan => plan.itemIndex === layout.itemIndex);
        shuffledLessonLayouts.splice(arrayIndex, 0, layout);
    });

    lessonPlan.layouts = shuffledLessonLayouts;

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;
    lessonPlan.moduleSize = moduleSize;

    const summaryLayout = isPortraitMode 
        ? {
            name: 'history',
            screens: [{ 
                name: 'history', 
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
    lessonPlan.wildcardLayouts = wildcardLayouts;

    return lessonPlan;
};