import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { renderSummary } from 'ui/screens/progress/summary';

export const createLesson = (lessonName, levelName, moduleSize, excludeRevision, isPortraitMode, layouts, progressScreens, wildcardLayouts, collection) => {
    
    if(excludeRevision) {
        layouts = layouts.filter(layout => layout.name !== 'revision');
    }

    let lessonPlan = [], layoutIndex = 0;

    // create basic lesson plan from given layout and number of items (moduleSize)
    // replicate each layout x times where x is the configured module size e.g. if 3 then 
    // iterate through 3 items from the collection on each round.
    // Add the species card before the first test card for that species

    layouts.forEach( (layout, index) => {

        let i = 0;
        do {
            lessonPlan.push({...layout, lessonName, levelName });
            i++;
        } while (i < moduleSize);
    });

    const itemGroup = collection.itemGroups[collection.currentRound - 1];
    const wildcardLayoutsForGroup = [];
    itemGroup.forEach(index => {
        wildcardLayouts.forEach(layout => {
            if(layout.itemIndex === index) {
                wildcardLayoutsForGroup.push(layout);
            }
        });
    });

    let testLayouts = [ ...lessonPlan, ...wildcardLayoutsForGroup ];
    const revisionLayouts = testLayouts.splice(0,moduleSize);
    const shuffledLessonLayouts = utils.shuffleArray(testLayouts);
    const offSet = (collection.currentRound - 1) * moduleSize;

    shuffledLessonLayouts.forEach( (layout, i) => {
        layout.layoutIndex = layoutIndex;
        layout.itemIndex = layout.itemIndex || utils.calcItemIndex(offSet, moduleSize, i);
        layout.exerciseIndex = i;
        layoutIndex = layoutIndex + 1;
    });

    revisionLayouts.forEach( (layout, i) => {
        layout.layoutIndex = layoutIndex;
        layout.itemIndex = layout.itemIndex || utils.calcItemIndex(offSet, moduleSize, i);
        layout.exerciseIndex = i;
        layoutIndex = layoutIndex + 1;        
    });

    revisionLayouts.forEach(layout => {
        const arrayIndex = shuffledLessonLayouts.findIndex(plan => plan.itemIndex === layout.itemIndex);
        shuffledLessonLayouts.splice(arrayIndex, 0, layout);
    });

    lessonPlan = shuffledLessonLayouts;

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;
    lessonPlan.moduleSize = moduleSize;

    const summaryLayout = isPortraitMode 
        ? {
            name: 'summary',
            screens: [{ 
                name: 'summary', 
                domain: 'history', 
                parent: DOM.rightBody,
                render: renderSummary,
                template: 'js-summary-template'
            }],
            lessonName,
            levelName,
            layoutIndex: lessonPlan.length,
            itemIndex: 0
        }
        : {
            name: 'summary',
            screens: [...progressScreens],
            lessonName,
            levelName,
            layoutIndex: lessonPlan.length,
            itemIndex: 0
        };

    lessonPlan.push(summaryLayout);

    const scores = lessonPlan.map(layout => layout.score || 0);
    const roundScoreCount = scores.reduce((accumulator, currentValue) => accumulator + currentValue);

    lessonPlan.map(layout => layout.roundScoreCount = roundScoreCount);

    lessonPlan.moduleSize = moduleSize;

    return lessonPlan;
};