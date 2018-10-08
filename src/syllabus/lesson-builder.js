import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';

export const createLesson = (lessonName, levelName, moduleSize, isPortraitMode, layouts, progressScreens, collection, wildcardLayouts) => {

    let lessonPlan = { layouts: [] };


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

    const revisionLayouts = lessonPlan.layouts.filter(layout => layout.type === 'revision' && layout.name !== 'screen-definition-card');
    const lessonLayouts = [ ...lessonPlan.layouts.filter(layout => layout.type === 'test'), ...wildcardLayouts];
    const offSet = (collection.currentRound - 1) * moduleSize;

    const newLessonLayouts = lessonLayouts.map( (layout, i) => {
        layout.itemIndex = layout.itemIndex || utils.calcItemIndex(offSet, layoutsToAdd, i);
        layout.progressIndex = i + 1;
        return { ...layout };
    });

    const families = [];

    revisionLayouts.forEach( (layout, i) => {
        const layoutItemIndex = layout.itemIndex || utils.calcItemIndex(offSet, layoutsToAdd, i);
        const family = collection.items.find((item, index) => index === layoutItemIndex).family;
        if(!R.contains(family, families)) {
            layout.itemIndex = layoutItemIndex;
            const arrayIndex = newLessonLayouts.findIndex(plan => plan.itemIndex === layout.itemIndex);
            newLessonLayouts.splice(arrayIndex, 0, layout);
        }
        families.push(family);
    });

    let hasGlossary = false;
    const glossary = lessonPlan.layouts.find(layout => layout.name === 'screen-definition-card');

    if(glossary) {
        newLessonLayouts.forEach((layout, index) => {
            if(layout.name === 'screen-common-to-latin' && !hasGlossary) {
                glossary.itemIndex = 0;
                newLessonLayouts.splice(index, 0, glossary);
                hasGlossary = true;
            }
        });
    }

    lessonPlan.layouts = [ ...newLessonLayouts ];

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