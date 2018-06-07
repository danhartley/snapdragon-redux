import { DOM } from 'ui/dom';
import { renderSummary } from 'ui/progress/summary';

export const createLesson = (lessonName, levelName, moduleSize, excludeRevision, isPortraitMode, layouts, progressScreens) => {
    
    if(excludeRevision) {
        layouts = layouts.filter(layout => layout.name !== 'revision');
    }

    const lessonPlan = [];

    lessonPlan.lessonName = lessonName;
    lessonPlan.levelName = levelName;
    lessonPlan.moduleSize = moduleSize;

    let layoutIndex = 0;    

    layouts.forEach( (layout, index) => {

        let i = 0;
        do {
            lessonPlan.push({...layout, layoutIndex: layoutIndex, itemIndex: i, exerciseIndex: index, lessonName, levelName});
            lessonPlan[lessonPlan.length - 1].layoutIndex = layoutIndex;
            layoutIndex = layoutIndex + 1;
            i++;
        } while (i < moduleSize);
    });
    
    const summaryLayout = isPortraitMode 
        ? {
            name: 'summary',
            screens: [{ 
                name: 'summary', 
                domain: 'index', 
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

    if(isPortraitMode) {
        lessonPlan.forEach(lesson => { 
            lesson.screens.forEach(screen => { 
                screen.parent = DOM.leftBody;
            } )}
        );
    }

    return lessonPlan;
};