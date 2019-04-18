import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';

export const createLesson = (lessonPlan, layouts, progressScreens, collection, wildcardLayouts) => {

    lessonPlan.layouts = [];

    const { moduleSize, lessonName, levelName } = collection;
    const itemsCountToDate = (collection.currentRound - 1) * moduleSize;
    const itemsLeft = collection.items.length - itemsCountToDate;

    const layoutsToAdd = moduleSize > itemsLeft ? itemsLeft : moduleSize;

    layouts.forEach( (layout, index) => {
        let i = 0;
        do {
            lessonPlan.layouts.push({...layout, lessonName, levelName });
            i++;
        } while (i < layoutsToAdd);
    });

    wildcardLayouts.forEach(layout => {
        layout.lessonName = lessonName;
        layout.levelName = levelName;
    });

    const lessonLayouts = [ ...lessonPlan.layouts.filter(layout => layout.type === 'test'), ...wildcardLayouts].map( (layout, i) => {
        layout.itemIndex = layout.itemIndex || utils.calcItemIndex(itemsCountToDate, layoutsToAdd, i);
        layout.progressIndex = i + 1;
        return { ...layout };
    });

    let hasGlossary = false;
    const glossary = lessonPlan.layouts.find(layout => layout.name === 'screen-definition-card');

    if(glossary) {
        lessonLayouts.forEach((layout, index) => {
            if(!hasGlossary) {
                glossary.itemIndex = 0;
                lessonLayouts.splice(index, 0, glossary);
                hasGlossary = true;
            }
        });
    }

    lessonPlan.layouts = [ ...lessonLayouts ];

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;
    lessonPlan.moduleSize = moduleSize;

    const summaryLayout = lessonPlan.portrait 
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

    return { updatedLessonPlan: lessonPlan, updatedCollection: collection };
};