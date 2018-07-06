import { DOM } from 'ui/dom';
import { utils } from 'utils/utils';
import { renderSummary } from 'ui/progress/summary';

export const createLesson = (lessonName, levelName, moduleSize, excludeRevision, isPortraitMode, layouts, progressScreens, wildcardLayouts, collection) => {
    
    if(excludeRevision) {
        layouts = layouts.filter(layout => layout.name !== 'revision');
    }

    let lessonPlan = [], layoutIndex = 0;

    // create basic lesson plan from given layout and number of items (moduleSize)
    // replicate each layout x times where x is the configured module size e.g. if 3 then 
    // iterate through 3 items from the collection on each round

    layouts.forEach( (layout, index) => {

        let i = 0;
        do {
            lessonPlan.push({...layout, lessonName, levelName });
            i++;
        } while (i < moduleSize);
    });

    // create a new lesson plan, keeping the revision modules at the start followed by the shuffled test modules

    //...wildcardLayouts

    const itemGroup = collection.itemGroups[collection.currentRound - 1];
    const wildcardLayoutsForGroup = [];
    itemGroup.forEach(index => {
        wildcardLayouts.forEach(layout => {
            if(layout.itemIndex === index) {
                wildcardLayoutsForGroup.push(layout);
            }
        });
    });


    let testPlans = [ ...lessonPlan, ...wildcardLayoutsForGroup ];
    const revisionPlans = testPlans.splice(0,moduleSize);
    testPlans = utils.shuffleArray(testPlans);
    const shuffledLessonPlan = [ ...revisionPlans, ...testPlans ];

    console.log(shuffledLessonPlan);

    const offSet = (collection.currentRound - 1) * moduleSize;

    shuffledLessonPlan.forEach( (plan, i) => {
        plan.layoutIndex = layoutIndex;
        plan.itemIndex = plan.itemIndex || utils.calcItemIndex(offSet, moduleSize, i);
        console.log('plan.itemIndex ', plan.itemIndex);
        plan.exerciseIndex = i;
        layoutIndex = layoutIndex + 1;        
    });

    // update the original lesson plan with the shuffled version

    lessonPlan = shuffledLessonPlan;

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;
    lessonPlan.moduleSize = moduleSize;

    const summaryLayout = isPortraitMode 
        ? {
            name: 'summary',
            screens: [{ 
                name: 'summary', 
                domain: 'history', 
                parent: DOM.leftBody,
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